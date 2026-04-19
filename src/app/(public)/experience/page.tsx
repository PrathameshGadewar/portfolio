"use client";

import { motion } from "framer-motion";
import { Briefcase, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

interface Experience {
  _id: string;
  role: string;
  company: string;
  duration: string;
  description?: string;
  location?: string;
  status?: string;
}

export default function ExperiencePage() {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portfolio/experience")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setExperience(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-16">
        <div className="art-badge-yellow text-[9px] px-3 py-1 mb-6 rounded-sm inline-block">JOURNEY</div>
        <h1 className="editorial-title mb-8">
          <span className="block text-foreground">PROFESSIONAL</span>
          <span className="block text-art-blue dark:text-blue-500">EXPERIENCE</span>
        </h1>
        <p className="text-zinc-400 font-bold text-[10px] uppercase tracking-[0.2em] italic">"Chronicles of impact, leadership, and technical excellence."</p>
      </div>

      <div className="space-y-10 pb-32">
        {loading ? (
          [1, 2, 3].map(i => <div key={i} className="h-48 art-card animate-pulse bg-zinc-50 dark:bg-zinc-900" />)
        ) : experience.length > 0 ? (
          experience.map((exp) => (
            <div key={exp._id} className="art-card group bg-white dark:bg-zinc-900/40 border-border dark:border-zinc-800 p-10 rounded-[3rem] hover:border-art-blue transition-all relative overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">{exp.duration}</span>
                            {exp.status && <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />}
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-black text-foreground mb-2 tracking-tighter">{exp.role}</h2>
                        <h3 className="text-xl font-bold text-art-blue uppercase tracking-[0.1em] mb-6">{exp.company}</h3>
                        
                        {exp.description && (
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed max-w-3xl uppercase tracking-tight">
                                {exp.description}
                            </p>
                        )}
                    </div>
                    <div className="text-right lg:block hidden">
                        <div className="w-20 h-20 rounded-3xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center border border-border dark:border-zinc-700 group-hover:scale-110 transition-transform">
                            <Briefcase className="w-8 h-8 text-art-blue" />
                        </div>
                    </div>
                </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center border-2 border-dashed border-border rounded-[3rem]">
            <p className="text-zinc-400 font-black uppercase tracking-widest text-xs">No experience entries found in the system.</p>
          </div>
        )}
      </div>
    </div>
  );
}
