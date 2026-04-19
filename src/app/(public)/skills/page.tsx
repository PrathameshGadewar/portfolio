"use client";

import { motion } from "framer-motion";
import { Code, Layers, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface Skill {
  _id: string;
  name: string;
  category: string;
  icon?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  programming: "art-accent-blue text-white",
  design: "art-accent-yellow text-art-dark",
  deployment: "bg-art-dark text-white",
  default: "bg-white text-art-dark border-2 border-art-dark",
};

function getCategoryClass(category: string) {
  const key = category.toLowerCase();
  for (const [k, v] of Object.entries(CATEGORY_COLORS)) {
    if (key.includes(k)) return v;
  }
  return CATEGORY_COLORS.default;
}

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-block px-3 py-1 bg-art-yellow border-2 border-art-dark text-[10px] font-black tracking-widest uppercase mb-4 shadow-[2px_2px_0px_#1e293b]">
    {children}
  </div>
);

const PROFICIENCY = [
  { name: "Python", level: 90, color: "bg-white" },
  { name: "React / JS", level: 82, color: "bg-white" },
  { name: "ML / AI", level: 78, color: "bg-white" },
  { name: "Figma / UI", level: 88, color: "bg-white" },
  { name: "Java / C++", level: 72, color: "bg-art-yellow" },
];

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portfolio/skill")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setSkills(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const grouped: Record<string, Skill[]> = {};
  skills.forEach((skill) => {
    const cat = skill.category || "General";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(skill);
  });

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-12">
        <div className="art-badge-yellow text-[9px] px-3 py-1 mb-6 rounded-sm inline-block">COMPETENCIES</div>
        <h1 className="editorial-title mb-8">
          <span className="block text-foreground">CREATIVE</span>
          <span className="block text-art-blue dark:text-blue-500">TOOLKIT</span>
        </h1>
        <p className="text-zinc-400 font-bold text-[10px] uppercase tracking-[0.2em] italic">"The tools of the craft, mastered for perfection."</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
        {loading ? (
          [1, 2].map(i => <div key={i} className="art-card h-64 animate-pulse bg-zinc-50" />)
        ) : (
          Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="art-card bg-white/30 dark:bg-zinc-900/30 border-border dark:border-zinc-800 p-8 rounded-[2rem]">
               <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-8 flex items-center gap-4">
                  <span className="w-8 h-px bg-border" />
                  {category}
                  <span className="flex-1 h-px bg-border" />
               </h2>
               <div className="grid grid-cols-3 gap-4">
                  {items.map((skill) => (
                    <div key={skill._id} className="flex flex-col items-center justify-center p-4 bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800 rounded-2xl group hover:border-art-yellow hover:scale-[1.05] transition-all shadow-sm">
                       <span className="text-2xl mb-3 grayscale group-hover:grayscale-0 transition-all">{skill.icon || "⚒️"}</span>
                       <span className="text-[9px] font-black uppercase text-zinc-500 group-hover:text-foreground text-center line-clamp-1 tracking-tighter">{skill.name}</span>
                    </div>
                  ))}
               </div>
            </div>
          ))
        )}
      </div>

      {/* Proficiency Levels */}
      <div className="art-card bg-white/50 dark:bg-zinc-900/50 border-border dark:border-zinc-800 p-12 rounded-[2.5rem] mb-32 shadow-sm">
         <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-12">Proficiency Levels</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {PROFICIENCY.map((skill) => (
               <div key={skill.name} className="flex flex-col gap-4">
                  <div className="flex justify-between items-end">
                    <span className="text-[11px] font-black text-foreground uppercase tracking-widest">{skill.name}</span>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className={`h-full ${skill.color === 'bg-art-yellow' ? 'bg-art-yellow' : 'bg-foreground dark:bg-white'}`} 
                     />
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}
