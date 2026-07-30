import AdminPageHeader from '@/components/admin/PageHeader';
import CrudTable from '@/components/admin/CrudTable';

export default function ClientsAdminPage() {
  return (
    <div>
      <AdminPageHeader title="العملاء" description="أسماء العملاء المعروضة في الشريط المتحرك بالصفحة الرئيسية." />
      <CrudTable
        table="clients"
        orderBy="sort_order"
        fields={[
          { key: 'name', label: 'اسم العميل' },
          { key: 'logo_url', label: 'رابط الشعار (اختياري)' },
          { key: 'sort_order', label: 'الترتيب', type: 'number', width: '90px' }
        ]}
      />
    </div>
  );
}
