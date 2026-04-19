import TopNav from "@/components/layout/TopNav";
import BottomDock from "@/components/layout/BottomDock";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden transition-colors">
      <TopNav />
      <main className="pt-32 pb-40 px-6">
        {children}
      </main>
      <BottomDock />
    </div>
  );
}
