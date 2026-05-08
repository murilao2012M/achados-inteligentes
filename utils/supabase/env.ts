export const supabaseEnv = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""
};

export function hasSupabaseConfig() {
  return Boolean(supabaseEnv.url && supabaseEnv.anonKey);
}

export function hasSupabaseServiceRole() {
  return Boolean(
    supabaseEnv.url && supabaseEnv.anonKey && supabaseEnv.serviceRoleKey
  );
}
