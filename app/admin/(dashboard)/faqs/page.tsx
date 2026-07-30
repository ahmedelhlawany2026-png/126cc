import AdminPageHeader from '@/components/admin/PageHeader';
import CrudTable from '@/components/admin/CrudTable';
import { supabase } from '@/lib/supabase';

export default async function FaqsAdminPage() {
  const { data: companies } = await supabase.from('companies').select('id, name_ar');
  const companyOptions = (companies ?? []).map((c) => ({ value: c.id as string, label: c.name_ar as string }));

  return (
    <div>
      <AdminPageHeader title="الأسئلة الشائعة" description="أسئلة FAQ الخاصة بكل شركة — اختر الشركة لكل سؤال." />
      <CrudTable
        table="faqs"
        orderBy="sort_order"
        fields={[
          { key: 'company_id', label: 'الشركة', type: 'select', options: companyOptions },
          { key: 'question_ar', label: 'السؤال (عربي)' },
          { key: 'question_en', label: 'Question (EN)' },
          { key: 'answer_ar', label: 'الإجابة (عربي)', type: 'textarea' },
          { key: 'answer_en', label: 'Answer (EN)', type: 'textarea' },
          { key: 'sort_order', label: 'الترتيب', type: 'number', width: '90px' }
        ]}
      />
    </div>
  );
}
