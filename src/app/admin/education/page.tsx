import CrudTable from "@/components/admin/CrudTable";

export default function AdminEducationPage() {
  return <CrudTable modelName="Education" fields={['degree', 'institution', 'specialization', 'score', 'startYear', 'endYear', 'link', 'logo']} requiredFields={['degree', 'institution']} />;
}
