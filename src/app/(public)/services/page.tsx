"use client";

import { motion } from "framer-motion";
import { Zap, Layout, Database, Palette, Monitor } from "lucide-react";
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

  const COLORS = [
    "from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-600 dark:text-blue-400",
    "from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 text-purple-600 dark:text-purple-400",
    "from-orange-100 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 text-orange-600 dark:text-orange-400",
    "from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 text-green-600 dark:text-green-400",
    "from-cyan-100 to-teal-100 dark:from-cyan-900/20 dark:to-teal-900/20 text-cyan-600 dark:text-cyan-400",
    "from-rose-100 to-red-100 dark:from-rose-900/20 dark:to-red-900/20 text-rose-600 dark:text-rose-400",
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-white/60 dark:bg-white/10 rounded-xl border border-white/40 shadow-sm">
          <Zap className="w-6 h-6 text-orange-500 dark:text-orange-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Services</h1>
          <p className="text-gray-500 dark:text-white/40">Solutions I help build and scale</p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="glass-card p-8 animate-pulse space-y-4">
              <div className="w-14 h-14 bg-gray-200 dark:bg-white/10 rounded-2xl" />
              <div className="h-5 bg-gray-200 dark:bg-white/10 rounded w-1/2" />
              <div className="h-4 bg-gray-100 dark:bg-white/5 rounded w-full" />
              <div className="h-4 bg-gray-100 dark:bg-white/5 rounded w-4/5" />
            </div>
          ))}
        </div>
      ) : services.length === 0 ? (
        <div className="glass-card p-16 text-center">
          <Zap className="w-12 h-12 text-gray-300 dark:text-white/20 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-500 dark:text-white/40">
            No services yet. Add them from the admin panel.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, idx) => {
            const IconEl = ICON_MAP[service.icon?.toLowerCase() || ""] || DEFAULT_ICONS[idx % DEFAULT_ICONS.length];
            const colorClass = COLORS[idx % COLORS.length];
            return (
              <motion.div
                key={service._id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-8 group hover:scale-[1.02] transition-transform duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colorClass} flex items-center justify-center mb-6`}>
                  <IconEl className="w-7 h-7" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h2>
                <p className="text-gray-500 dark:text-white/40 leading-relaxed text-sm">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
