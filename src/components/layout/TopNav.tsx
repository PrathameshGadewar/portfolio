"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function TopNav() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Force dark mode for this specific UI request
    setTheme("dark");
  }, [setTheme]);

  // Format the title from pathname
  let title = "Home";
  if (pathname !== "/") {
    const segment = pathname.split("/").pop() || "";
    title = segment.charAt(0).toUpperCase() + segment.slice(1);
    if (title === "Certifications") title = "Credentials";
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-extrabold text-2xl tracking-tighter text-white">
          PG.
        </Link>

        {/* Centered Title */}
        <div className="absolute left-1/2 -translate-x-1/2 font-medium text-zinc-400 text-sm tracking-wide">
          {title}
        </div>

        {/* Decorative Circle Indicators */}
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full border border-zinc-700" />
          <div className="w-2.5 h-2.5 rounded-full border border-zinc-700" />
        </div>
      </div>
      
      {/* Marquee/Ticker like line if on home */}
      {pathname === "/" && (
        <div className="bg-white py-1.5 overflow-hidden whitespace-nowrap">
          <div className="flex gap-12 animate-marquee text-[10px] font-black uppercase text-black">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="flex gap-12">
                <span>OPEN TO WORK</span>
                <span className="text-zinc-300">•</span>
                <span>FULL STACK</span>
                <span className="text-zinc-300">•</span>
                <span>AI/ML</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
