import CrudTable from "@/components/admin/CrudTable";

export default function AdminServicePage() {
  return <CrudTable modelName="Service" fields={['title', 'description', 'icon']} requiredFields={['title', 'description']} />;
}
