import CrudTable from "@/components/admin/CrudTable";

export default function AdminPublicationPage() {
  return (
    <CrudTable 
      modelName="Publication" 
      fields={['title', 'journal', 'publishedDate', 'doi', 'description', 'paperLink']} 
      requiredFields={['title']} 
    />
  );
}
