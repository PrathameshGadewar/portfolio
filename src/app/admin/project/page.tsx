import CrudTable from "@/components/admin/CrudTable";

export default function AdminProjectPage() {
  return (
    <CrudTable
      modelName="Project"
      fields={["title", "description", "category", "tags", "liveLink", "githubLink", "image"]}
      requiredFields={["title", "description"]}
    />
  );
}
