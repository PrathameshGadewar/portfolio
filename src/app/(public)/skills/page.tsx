"use client";

import { motion } from "framer-motion";
import { Code, Layers } from "lucide-react";
import { useEffect, useState } from "react";

interface Skill {
  _id: string;
  name: string;
  category: string;
  icon?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  programming: "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800/30",
  deployment: "bg-green-50 text-green-700 border-green-100 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800/30",
  design: "bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800/30",
  database: "bg-orange-50 text-orange-700 border-orange-100 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800/30",
  ai: "bg-pink-50 text-pink-700 border-pink-100 dark:bg-pink-900/20 dark:text-pink-300 dark:border-pink-800/30",
  default: "bg-gray-50 text-gray-700 border-gray-100 dark:bg-white/5 dark:text-white/50 dark:border-white/10",
};

function getCategoryColor(category: string) {
  const key = category.toLowerCase();
  for (const [k, v] of Object.entries(CATEGORY_COLORS)) {
    if (key.includes(k)) return v;
  }
  return CATEGORY_COLORS.default;
}

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

  // Group skills by category
  const grouped: Record<string, Skill[]> = {};
  skills.forEach((skill) => {
    const cat = skill.category || "Other";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(skill);
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-white/60 dark:bg-white/10 rounded-xl border border-white/40 shadow-sm">
          <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Skills</h1>
          <p className="text-gray-500 dark:text-white/40">Technologies and superpowers I use</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="glass-card p-8 animate-pulse space-y-4">
              <div className="h-5 bg-gray-200 dark:bg-white/10 rounded w-1/4" />
              <div className="flex flex-wrap gap-3">
                {[1, 2, 3, 4, 5].map((j) => (
                  <div key={j} className="h-8 w-24 bg-gray-200 dark:bg-white/10 rounded-full" />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : skills.length === 0 ? (
        <div className="glass-card p-16 text-center">
          <Code className="w-12 h-12 text-gray-300 dark:text-white/20 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-500 dark:text-white/40">
            No skills yet. Add them from the admin panel.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([category, items], idx) => (
            <motion.div
              key={category}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Layers className="w-5 h-5 text-gray-400 dark:text-white/30" />
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">{category}</h2>
                <span className="text-xs text-gray-400 dark:text-white/30 font-medium">
                  {items.length} skill{items.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {items.map((skill, sIdx) => (
                  <motion.div
                    key={skill._id}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: idx * 0.1 + sIdx * 0.04 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${getCategoryColor(category)}`}
                  >
                    {skill.icon && (
                      <span className="text-base flex items-center justify-center shrink-0">
                        {skill.icon.startsWith("/") || skill.icon.startsWith("http") ? (
                          <img 
                            src={skill.icon} 
                            alt="" 
                            className="w-5 h-5 object-contain"
                            onError={(e) => {
                              (e.target as any).parentNode.innerHTML = "✨";
                            }}
                          />
                        ) : (
                          skill.icon
                        )}
                      </span>
                    )}
                    {skill.name}
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
