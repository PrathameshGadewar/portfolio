import TopNav from "@/components/layout/TopNav";
import BottomDock from "@/components/layout/BottomDock";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <TopNav />
      <main className="pt-28 pb-32 px-6 max-w-6xl mx-auto">
        {children}
      </main>
      <BottomDock />
    </div>
  );
}
