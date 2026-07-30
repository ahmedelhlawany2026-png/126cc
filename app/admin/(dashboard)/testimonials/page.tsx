import AdminPageHeader from '@/components/admin/PageHeader';
import CrudTable from '@/components/admin/CrudTable';
import { supabase } from '@/lib/supabase';

export default async function TestimonialsAdminPage() {
  const { data: companies } = await supabase.from('companies').select('id, slug, name_ar');
  const companyOptions = (companies ?? []).map((c) => ({ value: c.id as string, label: c.name_ar as string }));

  return (
    <div>
      <AdminPageHeader title="آراء العملاء" description="التوصيات المعروضة في الصفحة الرئيسية وصفحات الشركات." />
      <CrudTable
        table="testimonials"
        orderBy="sort_order"
        fields={[
          { key: 'client_name', label: 'اسم العميل' },
          { key: 'company_id', label: 'الشركة', type: 'select', options: companyOptions },
          { key: 'role_ar', label: 'الصفة (عربي)' },
          { key: 'role_en', label: 'Role (EN)' },
          { key: 'quote_ar', label: 'الرأي (عربي)', type: 'textarea' },
          { key: 'quote_en', label: 'Quote (EN)', type: 'textarea' },
          {
            key: 'color_tag',
            label: 'اللون',
            type: 'select',
            options: [
              { value: 'secondary', label: 'رمادي — Bio Vision' },
              { value: 'primary', label: 'أحمر — Home Vision' },
              { value: 'ink', label: 'كحلي — VEC' }
            ]
          },
          { key: 'rating', label: 'التقييم', type: 'number', width: '90px' },
          { key: 'sort_order', label: 'الترتيب', type: 'number', width: '90px' }
        ]}
      />
    </div>
  );
}
