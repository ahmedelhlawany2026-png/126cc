import AdminPageHeader from '@/components/admin/PageHeader';
import CrudTable from '@/components/admin/CrudTable';
import ProjectImagesManager from '@/components/admin/ProjectImagesManager';
import { supabase } from '@/lib/supabase';

export default async function ProjectsAdminPage() {
  const { data: companies } = await supabase.from('companies').select('id, name_ar');
  const companyOptions = (companies ?? []).map((c) => ({ value: c.id as string, label: c.name_ar as string }));

  return (
    <div className="space-y-12">
      <div>
        <AdminPageHeader title="المشاريع" description="مشاريع كل شركة — تظهر في صفحات Bio Vision / Home Vision / VEC." />
        <CrudTable
          table="projects"
          orderBy="sort_order"
          fields={[
            { key: 'company_id', label: 'الشركة', type: 'select', options: companyOptions },
            { key: 'title_ar', label: 'العنوان (عربي)' },
            { key: 'title_en', label: 'Title (EN)' },
            { key: 'location', label: 'الموقع' },
            { key: 'area_sqm', label: 'المساحة (م²)', type: 'number', width: '110px' },
            { key: 'year', label: 'السنة', type: 'number', width: '90px' },
            { key: 'description_ar', label: 'الوصف (عربي)', type: 'textarea' },
            { key: 'description_en', label: 'Description (EN)', type: 'textarea' },
            { key: 'sort_order', label: 'الترتيب', type: 'number', width: '90px' }
          ]}
        />
      </div>

      <div>
        <AdminPageHeader title="صور المشاريع" description="ارفع صور كل مشروع، واسحبها لإعادة الترتيب." />
        <ProjectImagesManager />
      </div>
    </div>
  );
}
