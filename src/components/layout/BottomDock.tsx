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
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="glass-nav px-3 py-2.5 flex items-center gap-1 bg-[#e4e4e9]/80 dark:bg-[#1a1828]/80 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-lg">
        {dockItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (pathname.startsWith(item.href) && item.href !== "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center gap-0.5 p-2.5 rounded-2xl transition-all duration-300 group ${
                isActive
                  ? "text-blue-600 dark:text-blue-400 bg-white/70 dark:bg-white/10 shadow-sm"
                  : "text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10"
              }`}
              title={item.name}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[9px] font-semibold leading-none opacity-70">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}
