import AdminPageHeader from '@/components/admin/PageHeader';
import CrudTable from '@/components/admin/CrudTable';

export default function ContactRequestsAdminPage() {
  return (
    <div>
      <AdminPageHeader title="رسائل التواصل" description="الرسائل الواردة من فورم Contact في الموقع." />
      <CrudTable
        table="contact_requests"
        orderBy="created_at"
        fields={[
          { key: 'full_name', label: 'الاسم' },
          { key: 'phone', label: 'الهاتف' },
          { key: 'email', label: 'البريد الإلكتروني' },
          { key: 'interest', label: 'الشركة المطلوبة' },
          { key: 'message', label: 'الرسالة', type: 'textarea' },
          {
            key: 'status',
            label: 'الحالة',
            type: 'select',
            options: [
              { value: 'new', label: 'جديدة' },
              { value: 'contacted', label: 'تم التواصل' },
              { value: 'closed', label: 'مغلقة' }
            ]
          }
        ]}
      />
    </div>
  );
}
