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
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
      <div className="mb-16">
        <SectionLabel>Competencies</SectionLabel>
        <h1 className="editorial-title text-art-dark dark:text-white">CREATIVE<br/><span className="text-art-blue">TOOLKIT</span></h1>
        <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest italic">"The tools of the craft, mastered for perfection."</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[1, 2].map(i => <div key={i} className="art-card h-64 animate-pulse bg-gray-50" />)}
        </div>
      ) : skills.length === 0 ? (
        <div className="art-card p-20 text-center">
             <h2 className="text-4xl font-black text-gray-200 uppercase tracking-tighter italic">"The toolkit is currently empty"</h2>
             <p className="mt-4 text-xs font-bold text-gray-400">CHECK BACK LATER FOR UPDATED SPECIALIZATIONS</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {Object.entries(grouped).map(([category, items], idx) => (
            <motion.div
              key={category}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="flex flex-col h-full"
            >
              <div className="flex items-center gap-4 mb-4">
                 <div className="h-0.5 flex-1 bg-art-dark" />
                 <h2 className="text-xs font-black uppercase tracking-[0.2em] text-art-blue">{category}</h2>
                 <div className="h-0.5 w-4 bg-art-dark" />
              </div>
              
              <div className="art-card h-full grid grid-cols-2 sm:grid-cols-3 gap-4">
                {items.map((skill, sIdx) => (
                  <motion.div
                    key={skill._id}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: idx * 0.05 + sIdx * 0.02 }}
                    className="flex flex-col items-center justify-center p-3 border-2 border-dashed border-gray-200 rounded-lg group hover:border-art-blue transition-colors"
                  >
                    <div className="w-10 h-10 mb-2 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all group-hover:scale-110">
                      {skill.icon ? (
                         skill.icon.startsWith("http") || skill.icon.startsWith("/") ? (
                           <img src={skill.icon} alt="" className="w-full h-full object-contain" />
                         ) : <span className="text-xl">{skill.icon}</span>
                      ) : <Sparkles className="w-6 h-6 text-gray-200" />}
                    </div>
                    <span className="text-[10px] font-black uppercase text-center tracking-tighter group-hover:text-art-blue">
                        {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
