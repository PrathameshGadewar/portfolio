"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LogOut,
  LayoutDashboard,
  Briefcase,
  GraduationCap,
  Code,
  Server,
  User,
  Mail,
  Award,
  Loader2,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Profile", href: "/admin/profile", icon: User },
  { name: "Projects", href: "/admin/project", icon: Briefcase },
  { name: "Services", href: "/admin/service", icon: Server },
  { name: "Experience", href: "/admin/experience", icon: Code },
  { name: "Education", href: "/admin/education", icon: GraduationCap },
  { name: "Skills", href: "/admin/skill", icon: Code },
  { name: "Certifications", href: "/admin/certification", icon: Award },
  { name: "Messages", href: "/admin/message", icon: Mail },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Skip auth check for login page
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setAuthChecked(true);
      return;
    }
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) {
          router.replace("/admin/login");
        } else {
          setAuthChecked(true);
        }
      })
      .catch(() => router.replace("/admin/login"));
  }, [isLoginPage, router]);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
  };

  // Login page uses its own layout (dark, full-page)
  if (isLoginPage) return <>{children}</>;

  // Show spinner while checking auth
  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shadow-sm shrink-0">
        <div className="p-6 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-xl tracking-tight">
              P<span className="text-gray-400">G</span>
            </span>
            <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              Admin
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (pathname.startsWith(item.href) && item.href !== "/admin");
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-gray-900 text-white shadow-sm"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.name}
                {isActive && <ChevronRight className="w-4 h-4 ml-auto opacity-60" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            id="admin-logout-btn"
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-medium"
          >
            {loggingOut ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <LogOut className="w-4 h-4" />
            )}
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
