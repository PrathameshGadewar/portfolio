"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { User, Briefcase, Zap, Code, Mail, GraduationCap, Award } from "lucide-react";
import { motion } from "framer-motion";

const dockItems = [
  { name: "Home", href: "/", icon: User },
  { name: "Projects", href: "/projects", icon: Briefcase },
  { name: "Exp", href: "/experience", icon: Briefcase },
  { name: "Edu", href: "/education", icon: GraduationCap },
  { name: "Certs", href: "/certifications", icon: Award },
  { name: "Skills", href: "/skills", icon: Code },
  { name: "Services", href: "/services", icon: Zap },
  { name: "Contact", href: "/contact", icon: Mail },
];

export default function BottomDock() {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border transition-colors md:pb-4"
    >
      <div className="max-w-4xl mx-auto px-1 md:px-4 py-2 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar scroll-smooth">
        {dockItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (pathname.startsWith(item.href) && item.href !== "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center min-w-[60px] md:w-full py-1.5 md:py-2 rounded-xl transition-all shrink-0 group ${
                isActive
                  ? "text-foreground"
                  : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              }`}
            >
              <div className={`p-1.5 md:p-2 rounded-lg mb-1 transition-all ${
                isActive ? "bg-black/5 dark:bg-white/10" : "bg-transparent group-hover:bg-black/5 dark:group-hover:bg-white/5"
              }`}>
                <item.icon className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-tight ${
                isActive ? "opacity-100" : "opacity-40"
              }`}>{item.name}</span>
              
              {isActive && (
                <motion.div 
                  layoutId="activeDock"
                  className="w-1 h-1 bg-art-yellow rounded-full mt-1"
                />
              )}
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}
