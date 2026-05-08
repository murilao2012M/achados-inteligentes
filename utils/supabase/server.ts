import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import {
  hasSupabaseConfig,
  hasSupabaseServiceRole,
  supabaseEnv
} from "@/utils/supabase/env";

export async function createSupabaseServerClient() {
  if (!hasSupabaseConfig()) {
    return null;
  }

  const cookieStore = await cookies();
  const isProduction = process.env.NODE_ENV === "production";

  return createServerClient(supabaseEnv.url, supabaseEnv.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(
        cookiesToSet: Array<{
          name: string;
          value: string;
          options: Record<string, unknown>;
        }>
      ) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, {
            ...options,
            httpOnly: true,
            sameSite: "lax",
            secure: isProduction
          });
        });
      }
    }
  });
}

export function createSupabasePublicClient() {
  if (!hasSupabaseConfig()) {
    return null;
  }

  return createClient(supabaseEnv.url, supabaseEnv.anonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

export function createSupabaseAdminClient() {
  if (!hasSupabaseServiceRole()) {
    return null;
  }

  return createClient(supabaseEnv.url, supabaseEnv.serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}
