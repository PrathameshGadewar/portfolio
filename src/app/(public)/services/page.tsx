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
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
      <div className="mb-16">
        <SectionLabel>Capabilites</SectionLabel>
        <h1 className="editorial-title text-art-dark dark:text-white">WHAT<br/><span className="text-art-blue">I DO</span></h1>
        <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest italic">"Tailored solutions for a digital-first world."</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[1, 2].map(i => <div key={i} className="art-card h-64 animate-pulse bg-gray-50" />)}
        </div>
      ) : services.length === 0 ? (
        <div className="art-card p-20 text-center">
             <h2 className="text-4xl font-black text-gray-200 uppercase tracking-tighter italic">"No services currently listed"</h2>
             <p className="mt-4 text-xs font-bold text-gray-400">CONTACT DIRECTLY FOR CUSTOM PROJECT INQUIRIES</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, idx) => {
            const IconEl = ICON_MAP[service.icon?.toLowerCase() || ""] || DEFAULT_ICONS[idx % DEFAULT_ICONS.length];
            return (
              <motion.div
                key={service._id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="art-card group hover:border-art-blue relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-art-yellow/5 rounded-bl-full -z-10 group-hover:bg-art-blue/5 transition-colors" />
                
                <div className="w-14 h-14 art-accent-blue rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                   <IconEl className="w-7 h-7" />
                </div>

                <div className="flex items-center gap-3 mb-4">
                   <div className="w-8 h-0.5 bg-art-dark" />
                   <h2 className="text-xs font-black uppercase tracking-widest text-art-blue">{service.title}</h2>
                </div>

                <h3 className="text-2xl font-black mb-6 leading-tight uppercase group-hover:text-art-dark transition-colors">
                  {service.title.split(' ').join('\n')}
                </h3>

                <p className="text-xs font-medium text-gray-500 leading-relaxed uppercase border-t-2 border-dashed border-gray-100 pt-6">
                  {service.description}
                </p>

                <div className="mt-8 flex justify-end">
                   <div className="w-10 h-10 rounded-full border-2 border-art-dark flex items-center justify-center group-hover:bg-art-dark group-hover:text-white transition-all">
                      <ArrowRight className="w-4 h-4" />
                   </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
