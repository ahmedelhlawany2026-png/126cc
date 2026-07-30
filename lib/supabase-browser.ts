'use client';

import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

/**
 * Auth-aware browser client. Use this (instead of lib/supabase.ts) inside any
 * 'use client' component that needs to sign in/out or perform authenticated
 * writes from the admin panel — it keeps the session cookie in sync with
 * middleware.ts and lib/supabase-server.ts.
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
