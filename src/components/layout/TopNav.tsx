"use client";

import { usePathname } from "next/navigation";
import { Sun, Moon, Home } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function TopNav() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Format the title from pathname
  let title = "Home";
  if (pathname !== "/") {
    const segment = pathname.split("/").pop() || "";
    title = segment.charAt(0).toUpperCase() + segment.slice(1);
  }

  const isDark = theme === "dark";

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-11/12 max-w-6xl z-50">
      <div className="glass-nav px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-2xl tracking-tighter text-gray-900 dark:text-white">
          P<span className="text-gray-400">G</span>
        </Link>

        {/* Centered Title */}
        <div className="absolute left-1/2 -translate-x-1/2 font-semibold text-gray-800 dark:text-white/80 text-sm">
          {title}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {mounted && (
            <button
              id="theme-toggle"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          )}
          <Link
            href="/"
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10"
          >
            <Home className="w-5 h-5 text-gray-700 dark:text-white/70" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
