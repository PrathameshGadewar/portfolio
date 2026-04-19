"use client";

import { motion } from "framer-motion";
import { Zap, Layout, Database, Palette, Monitor, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

interface Service {
  _id: string;
  title: string;
  description: string;
  icon?: string;
}

const ICON_MAP: Record<string, React.ElementType> = {
  layout: Layout,
  database: Database,
  palette: Palette,
  monitor: Monitor,
  zap: Zap,
};

const DEFAULT_ICONS = [Layout, Database, Palette, Monitor, Zap, Monitor];

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-block px-3 py-1 bg-art-yellow border-2 border-art-dark text-[10px] font-black tracking-widest uppercase mb-4 shadow-[2px_2px_0px_#1e293b]">
    {children}
  </div>
);

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portfolio/service")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setServices(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-12">
        <div className="art-badge-yellow text-[9px] px-3 py-1 mb-6 rounded-sm inline-block">CAPABILITIES</div>
        <h1 className="editorial-title mb-8">
          <span className="block text-foreground">WHAT</span>
          <span className="block text-art-blue dark:text-blue-500">I DO</span>
        </h1>
        <p className="text-zinc-400 font-bold text-[10px] uppercase tracking-[0.2em] italic">"Tailored solutions for a digital-first world."</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-32">
        {loading ? (
          [1, 2].map((i) => (
            <div key={i} className="art-card h-80 animate-pulse bg-zinc-50" />
          ))
        ) : (
          services.map((service, idx) => {
            const IconEl = ICON_MAP[service.icon?.toLowerCase() || ""] || DEFAULT_ICONS[idx % DEFAULT_ICONS.length];
            return (
              <div key={service._id} className="art-card group bg-white/50 dark:bg-zinc-900/50 border-border dark:border-zinc-800 hover:border-zinc-400 transition-all rounded-[2rem] p-10">
                 <div className="flex justify-between items-start mb-10">
                    <span className="text-xs font-bold text-zinc-300 dark:text-zinc-700">0{idx + 1} /</span>
                 </div>
                 
                 <div className="mb-10">
                    <div className="w-14 h-14 bg-zinc-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center border border-border dark:border-zinc-700 group-hover:bg-art-blue/10 transition-all">
                       <IconEl className="w-6 h-6 text-blue-500" />
                    </div>
                 </div>

                 <h3 className="text-3xl font-black text-foreground mb-6 group-hover:text-blue-600 transition-colors tracking-tight">{service.title}</h3>
                 <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium mb-12 max-w-sm">
                    {service.description}
                 </p>

                 <div className="flex flex-wrap gap-2 mt-auto">
                    {["Python", "React", "AI", "Cloud"].map((tag) => (
                       <span key={tag} className="px-4 py-1.5 rounded-full border border-border dark:border-zinc-800 text-[10px] font-bold text-zinc-400 uppercase tracking-tight">
                         {tag}
                       </span>
                    ))}
                 </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
