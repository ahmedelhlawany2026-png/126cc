import AdminPageHeader from '@/components/admin/PageHeader';
import CrudTable from '@/components/admin/CrudTable';

export default function StatisticsAdminPage() {
  return (
    <div>
      <AdminPageHeader title="الأرقام" description="العدادات المتحركة في قسم Numbers Speak بالصفحة الرئيسية." />
      <CrudTable
        table="statistics"
        orderBy="sort_order"
        fields={[
          { key: 'label_ar', label: 'التسمية (عربي)' },
          { key: 'label_en', label: 'Label (EN)' },
          { key: 'value', label: 'القيمة', type: 'number', width: '110px' },
          { key: 'prefix', label: 'Prefix', width: '90px' },
          { key: 'suffix', label: 'Suffix', width: '90px' },
          { key: 'sort_order', label: 'الترتيب', type: 'number', width: '90px' }
        ]}
      />
    </div>
  );
}
