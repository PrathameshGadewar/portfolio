import CrudTable from "@/components/admin/CrudTable";

export default function AdminPatentPage() {
  return (
    <CrudTable 
      modelName="Patent" 
      fields={['title', 'techArea', 'appNumber', 'description', 'status']} 
      requiredFields={['title']} 
    />
  );
}
