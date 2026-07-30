import AdminPageHeader from '@/components/admin/PageHeader';
import CrudTable from '@/components/admin/CrudTable';
import { supabase } from '@/lib/supabase';

export default async function TeamAdminPage() {
  const { data: departments } = await supabase.from('departments').select('id, name_ar');
  const departmentOptions = (departments ?? []).map((d) => ({ value: d.id as string, label: d.name_ar as string }));

  return (
    <div className="space-y-12">
      <div>
        <AdminPageHeader title="الأقسام" description="أقسام الشركة المعروضة في صفحة فريقنا." />
        <CrudTable
          table="departments"
          orderBy="sort_order"
          fields={[
            { key: 'name_ar', label: 'اسم القسم (عربي)' },
            { key: 'name_en', label: 'Name (EN)' },
            { key: 'description_ar', label: 'الوصف (عربي)', type: 'textarea' },
            { key: 'description_en', label: 'Description (EN)', type: 'textarea' },
            { key: 'icon', label: 'أيقونة (إيموجي)', width: '90px' },
            { key: 'sort_order', label: 'الترتيب', type: 'number', width: '90px' }
          ]}
        />
      </div>

      <div>
        <AdminPageHeader title="أعضاء الفريق" description="الموظفون داخل كل قسم." />
        <CrudTable
          table="employees"
          orderBy="sort_order"
          fields={[
            { key: 'department_id', label: 'القسم', type: 'select', options: departmentOptions },
            { key: 'name_ar', label: 'الاسم (عربي)' },
            { key: 'name_en', label: 'Name (EN)' },
            { key: 'role_ar', label: 'الوظيفة (عربي)' },
            { key: 'role_en', label: 'Role (EN)' },
            { key: 'sort_order', label: 'الترتيب', type: 'number', width: '90px' }
          ]}
        />
      </div>
    </div>
  );
}
