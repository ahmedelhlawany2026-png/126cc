import AdminPageHeader from '@/components/admin/PageHeader';
import CrudTable from '@/components/admin/CrudTable';

export default function TimelineAdminPage() {
  return (
    <div>
      <AdminPageHeader title="الجدول الزمني" description="مسيرة الشركة المعروضة في قسم Our Journey بالصفحة الرئيسية." />
      <CrudTable
        table="timeline"
        orderBy="sort_order"
        fields={[
          { key: 'year', label: 'السنة', width: '110px' },
          { key: 'tag_ar', label: 'الوسم (عربي)' },
          { key: 'tag_en', label: 'Tag (EN)' },
          { key: 'title_ar', label: 'العنوان (عربي)' },
          { key: 'title_en', label: 'Title (EN)' },
          { key: 'description_ar', label: 'الوصف (عربي)', type: 'textarea' },
          { key: 'description_en', label: 'Description (EN)', type: 'textarea' },
          { key: 'sort_order', label: 'الترتيب', type: 'number', width: '90px' }
        ]}
      />
    </div>
  );
}
