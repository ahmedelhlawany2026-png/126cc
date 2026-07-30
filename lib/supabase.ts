import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// If the env vars are missing, we do NOT call createClient() with empty
// strings (that throws "supabaseUrl is required" immediately at import time,
// which crashes `next build`). Instead we hand back a Proxy that only throws
// when something actually tries to use it — callers in lib/queries.ts already
// wrap their calls in try/catch and fall back to default data, so the app
// keeps working (with fallback content) until real credentials are set.
function createUnconfiguredClient(): SupabaseClient {
  return new Proxy(
    {},
    {
      get() {
        throw new Error(
          'Supabase is not configured: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.'
        );
      }
    }
  ) as SupabaseClient;
}

// Plain, stateless client — safe to use anywhere (server components, route
// handlers, client components) for public reads and the Contact form insert.
// It does not manage auth session cookies; the admin panel uses the
// cookie-aware clients in lib/supabase-browser.ts and lib/supabase-server.ts
// instead, so login state persists correctly across requests.
export const supabase: SupabaseClient =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : createUnconfiguredClient();
