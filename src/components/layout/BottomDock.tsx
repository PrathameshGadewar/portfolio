"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { User, Briefcase, Zap, Code, Mail, Award } from "lucide-react";
import { motion } from "framer-motion";

const dockItems = [
  { name: "About", href: "/", icon: User },
  { name: "Projects", href: "/projects", icon: Briefcase },
  { name: "Services", href: "/services", icon: Zap },
  { name: "Skills", href: "/skills", icon: Code },
  { name: "Certs", href: "/certifications", icon: Award },
  { name: "Contact", href: "/contact", icon: Mail },
];

export default function BottomDock() {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-t border-border transition-colors"
    >
      <div className="max-w-4xl mx-auto px-4 py-2 flex items-center justify-between gap-1">
        {dockItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (pathname.startsWith(item.href) && item.href !== "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full py-2 rounded-xl transition-all group ${
                isActive
                  ? "text-foreground"
                  : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              }`}
            >
              <div className={`p-2 rounded-lg mb-1 transition-all ${
                isActive ? "bg-black/5 dark:bg-white/10" : "bg-transparent"
              }`}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-tight ${
                isActive ? "opacity-100" : "opacity-40"
              }`}>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}
