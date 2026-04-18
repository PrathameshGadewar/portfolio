import CrudTable from "@/components/admin/CrudTable";

export default function AdminProfilePage() {
  return (
    <CrudTable
      modelName="Profile"
      fields={["name", "bio", "overview", "roles", "profileImage", "resumeLink", "github", "linkedin", "twitter", "instagram", "discord", "email", "quote"]}
      requiredFields={["name", "bio", "roles"]}
    />
  );
}
