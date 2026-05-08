export function hasImageUrl(value?: string | null) {
  return Boolean(value && value.trim().length > 0);
}

function getSupabaseHostname() {
  const value = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!value) {
    return "";
  }

  try {
    return new URL(value).hostname;
  } catch {
    return "";
  }
}

const OPTIMIZED_HOSTS = new Set(
  ["images.unsplash.com", getSupabaseHostname()].filter(Boolean)
);

export function canOptimizeImage(value?: string | null) {
  if (!hasImageUrl(value)) {
    return false;
  }

  try {
    const url = new URL(String(value));
    return OPTIMIZED_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}
