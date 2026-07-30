import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

// Plain, stateless client — safe to use anywhere (server components, route
// handlers, client components) for public reads and the Contact form insert.
// It does not manage auth session cookies; the admin panel uses the
// cookie-aware clients in lib/supabase-browser.ts and lib/supabase-server.ts
// instead, so login state persists correctly across requests.
//
// If env vars are not set yet, this client will simply fail requests
// gracefully until you connect a real Supabase project (see supabase/schema.sql).
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
