import { supabase } from './supabase';

/**
 * Every function here tries to read from Supabase first. If Supabase isn't
 * configured yet (no env vars), the table is empty, or the request fails for
 * any reason, it silently falls back to the `fallback` value passed in.
 *
 * This lets every page work out of the box with the same placeholder content
 * used during design, and switch to real data the moment the database is
 * seeded — no code changes required on the page side.
 */
async function safeQuery<T>(run: () => Promise<{ data: T | null; error: unknown }>, fallback: T): Promise<T> {
  try {
    const { data, error } = await run();
    if (error || !data || (Array.isArray(data) && data.length === 0)) return fallback;
    return data;
  } catch {
    return fallback;
  }
}

export interface DbFaq {
  question_ar: string;
  question_en: string;
  answer_ar: string;
  answer_en: string;
}

export async function getFaqs(companySlug: string, fallback: DbFaq[]): Promise<DbFaq[]> {
  return safeQuery(
    async () =>
      supabase
        .from('faqs')
        .select('question_ar, question_en, answer_ar, answer_en, companies!inner(slug)')
        .eq('companies.slug', companySlug)
        .order('sort_order') as unknown as Promise<{ data: DbFaq[] | null; error: unknown }>,
    fallback
  );
}

export interface DbTestimonial {
  client_name: string;
  role_ar: string;
  role_en: string;
  quote_ar: string;
  quote_en: string;
  rating: number;
  color_tag: 'secondary' | 'primary' | 'ink';
}

export async function getTestimonials(companySlug: string | null, fallback: DbTestimonial[]): Promise<DbTestimonial[]> {
  return safeQuery(async () => {
    let query = supabase
      .from('testimonials')
      .select('client_name, role_ar, role_en, quote_ar, quote_en, rating, color_tag, companies!inner(slug)')
      .order('sort_order');
    if (companySlug) query = query.eq('companies.slug', companySlug);
    return query as unknown as Promise<{ data: DbTestimonial[] | null; error: unknown }>;
  }, fallback);
}

export interface DbStatistic {
  label_ar: string;
  label_en: string;
  value: number;
  prefix: string;
  suffix: string;
}

export async function getStatistics(fallback: DbStatistic[]): Promise<DbStatistic[]> {
  return safeQuery(
    async () => supabase.from('statistics').select('label_ar, label_en, value, prefix, suffix').order('sort_order'),
    fallback
  );
}

export interface DbClient {
  name: string;
}

export async function getClients(fallback: DbClient[]): Promise<DbClient[]> {
  return safeQuery(async () => supabase.from('clients').select('name').order('sort_order'), fallback);
}

export interface DbTimelineItem {
  year: string;
  tag_ar: string;
  tag_en: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
}

export async function getTimeline(fallback: DbTimelineItem[]): Promise<DbTimelineItem[]> {
  return safeQuery(
    async () =>
      supabase
        .from('timeline')
        .select('year, tag_ar, tag_en, title_ar, title_en, description_ar, description_en')
        .order('sort_order'),
    fallback
  );
}

export interface DbDepartment {
  name_ar: string;
  name_en: string;
  description_ar: string;
  description_en: string;
  icon: string;
}

export async function getDepartments(fallback: DbDepartment[]): Promise<DbDepartment[]> {
  return safeQuery(
    async () => supabase.from('departments').select('name_ar, name_en, description_ar, description_en, icon').order('sort_order'),
    fallback
  );
}

export interface DbEmployee {
  name_ar: string;
  name_en: string;
  role_ar: string;
  role_en: string;
  department_id: string | null;
}

export async function getEmployees(fallback: DbEmployee[]): Promise<DbEmployee[]> {
  return safeQuery(
    async () => supabase.from('employees').select('name_ar, name_en, role_ar, role_en, department_id').order('sort_order'),
    fallback
  );
}
