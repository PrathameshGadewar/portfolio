import CrudTable from "@/components/admin/CrudTable";

export default function AdminSkillPage() {
  return <CrudTable modelName="Skill" fields={['name', 'category', 'icon']} requiredFields={['name', 'category']} />;
}
