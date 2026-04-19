"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";

interface Education {
  _id: string;
  degree: string;
  institution: string;
  specialization?: string;
  startYear?: string;
  endYear?: string;
  score?: string;
  location?: string;
}

export default function EducationPage() {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portfolio/education")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setEducation(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-16">
        <div className="art-badge-yellow text-[9px] px-3 py-1 mb-6 rounded-sm inline-block">ACADEMIC</div>
        <h1 className="editorial-title mb-8">
          <span className="block text-foreground">EDUCATIONAL</span>
          <span className="block text-art-yellow">PATHWAY</span>
        </h1>
        <p className="text-zinc-400 font-bold text-[10px] uppercase tracking-[0.2em] italic">"Theoretical foundations and specialized engineering expertise."</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-32">
        {loading ? (
          [1, 2].map(i => <div key={i} className="h-64 art-card animate-pulse bg-zinc-50 dark:bg-zinc-900" />)
        ) : education.length > 0 ? (
          education.map((edu) => (
            <div key={edu._id} className="art-card group bg-white dark:bg-zinc-900/40 border-border dark:border-zinc-800 p-10 rounded-[3rem] hover:border-art-yellow transition-all flex flex-col justify-between">
                <div>
                   <div className="flex justify-between items-start mb-10">
                       <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">{edu.startYear} — {edu.endYear}</span>
                       <div className="w-14 h-14 rounded-2xl bg-art-yellow/10 flex items-center justify-center border border-art-yellow/20 group-hover:rotate-12 transition-transform">
                           <GraduationCap className="w-6 h-6 text-art-yellow" />
                       </div>
                   </div>
                   <h2 className="text-3xl font-black text-foreground mb-3 tracking-tighter leading-tight">{edu.degree}</h2>
                   <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-6">{edu.institution}</h3>
                   <p className="text-zinc-400 dark:text-zinc-500 text-[10px] font-black uppercase tracking-widest border-l-4 border-art-yellow pl-4">{edu.specialization || "ENGINEERING"}</p>
                </div>
                {edu.score && (
                   <div className="mt-12 pt-8 border-t border-border dark:border-zinc-800">
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">Performance_Metric</span>
                          <span className="text-xl font-black text-art-yellow">{edu.score}</span>
                       </div>
                   </div>
                )}
            </div>
          ))
        ) : (
          <div className="lg:col-span-2 py-20 text-center border-2 border-dashed border-border rounded-[3rem]">
            <p className="text-zinc-400 font-black uppercase tracking-widest text-xs">No education entries found in the system.</p>
          </div>
        )}
      </div>
    </div>
  );
}
