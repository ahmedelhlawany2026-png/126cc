import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

/**
 * Auth-aware server client for use inside Server Components and Route
 * Handlers (e.g. the admin layout, checking whether a user is logged in).
 * Reads the session cookie that middleware.ts and the browser client keep in
 * sync — do not use this for public pages, use lib/supabase.ts instead.
 */
export function createSupabaseServerClient() {
  const cookieStore = cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: Record<string, unknown>) {
        try {
          cookieStore.set(name, value, options);
        } catch {
          // Called from a Server Component with no request context — safe to ignore,
          // middleware.ts already refreshes the session cookie on every request.
        }
      },
      remove(name: string, options: Record<string, unknown>) {
        try {
          cookieStore.set(name, '', options);
        } catch {
          // See note above.
        }
      }
    }
  });
}
