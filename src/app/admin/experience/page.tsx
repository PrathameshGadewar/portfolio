import CrudTable from "@/components/admin/CrudTable";

export default function AdminExperiencePage() {
  return (
    <CrudTable
      modelName="Experience"
      fields={["role", "company", "duration", "location", "status", "description"]}
      requiredFields={["role", "company", "duration"]}
    />
  );
}
