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
        <div className="section-label">OFFERINGS</div>
        <h1 className="editorial-title text-white mb-8">
          WHAT I<br />
          <span className="text-zinc-500">OFFER</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {loading ? (
          [1, 2, 3, 4].map((i) => (
            <div key={i} className="art-card h-80 animate-pulse bg-zinc-900" />
          ))
        ) : (
          services.map((service, idx) => {
            const IconEl = ICON_MAP[service.icon?.toLowerCase() || ""] || DEFAULT_ICONS[idx % DEFAULT_ICONS.length];
            return (
              <div key={service._id} className="art-card group bg-[#0a0a0a] border-zinc-800/50 hover:border-zinc-700">
                 <div className="flex justify-between items-start mb-8">
                    <span className="text-sm font-black text-zinc-800 group-hover:text-zinc-600 transition-colors">0{idx + 1}</span>
                 </div>
                 
                 <div className="mb-8">
                    <div className="w-14 h-14 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800 group-hover:border-zinc-600 group-hover:bg-zinc-800 transition-all shadow-sm">
                       <IconEl className="w-6 h-6 text-art-blue" />
                    </div>
                 </div>

                 <h3 className="text-2xl font-black text-white mb-4 group-hover:text-art-yellow transition-colors">{service.title}</h3>
                 <p className="text-sm text-zinc-500 leading-relaxed uppercase mb-10 max-w-sm">
                    {service.description}
                 </p>

                 <div className="flex flex-wrap gap-2 mt-auto">
                    {["React", "AI", "Modern Tooling"].map((tag) => (
                       <span key={tag} className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-zinc-400 uppercase tracking-tight">
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
