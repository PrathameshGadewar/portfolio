import CrudTable from "@/components/admin/CrudTable";

export default function AdminCertificationPage() {
  return (
    <CrudTable
      modelName="Certification"
      fields={["title", "organization", "year", "link", "image"]}
      requiredFields={["title", "organization"]}
    />
  );
}
