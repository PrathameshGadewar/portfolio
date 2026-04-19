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
        <div className="section-label">COMPETENCIES</div>
        <h1 className="editorial-title text-white mb-8">
          CREATIVE<br />
          <span className="text-zinc-500">TOOLKIT</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
        {loading ? (
          [1, 2, 3].map(i => <div key={i} className="art-card h-64 animate-pulse bg-zinc-900" />)
        ) : (
          Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="art-card bg-[#0a0a0a] border-zinc-800/50">
               <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-6 border-b border-zinc-800 pb-2">
                  {category}
               </h2>
               <div className="grid grid-cols-3 gap-3">
                  {items.map((skill) => (
                    <div key={skill._id} className="flex flex-col items-center justify-center p-3 bg-zinc-900/50 rounded-xl border border-zinc-800/50 group hover:border-art-yellow transition-all">
                       <span className="text-2xl mb-2 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all">{skill.icon || "⚒️"}</span>
                       <span className="text-[9px] font-black uppercase text-zinc-400 group-hover:text-white text-center line-clamp-1">{skill.name}</span>
                    </div>
                  ))}
               </div>
            </div>
          ))
        )}
      </div>

      {/* Proficiency Levels */}
      <div className="art-card bg-[#0a0a0a] border-zinc-800/50 p-10">
         <h2 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 mb-10">Proficiency Levels</h2>
         <div className="space-y-10">
            {PROFICIENCY.map((skill) => (
               <div key={skill.name} className="flex items-center gap-8">
                  <span className="w-24 text-xs font-black text-white uppercase tracking-tighter">{skill.name}</span>
                  <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className={`h-full ${skill.color}`} 
                     />
                  </div>
                  <span className="w-10 text-[10px] font-black text-zinc-500 text-right uppercase tracking-tighter">{skill.level}%</span>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}
