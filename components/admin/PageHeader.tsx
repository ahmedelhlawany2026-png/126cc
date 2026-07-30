export default function AdminPageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-extrabold text-ink">{title}</h1>
      {description && <p className="text-secondary text-sm mt-1">{description}</p>}
    </div>
  );
}
