export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="port-body min-h-screen relative">
      {children}
    </div>
  );
}
