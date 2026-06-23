import CrudTable from "@/components/admin/CrudTable";

export default function AdminAchievementPage() {
  return (
    <CrudTable
      modelName="Achievement"
      fields={["title", "description", "images", "year"]}
      requiredFields={["title"]}
    />
  );
}
