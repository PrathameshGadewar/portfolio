import CrudTable from "@/components/admin/CrudTable";

export default function AdminMessagePage() {
  return <CrudTable modelName="Message" fields={['name', 'email', 'message']} requiredFields={['name', 'email', 'message']} />;
}
