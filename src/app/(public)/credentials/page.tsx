"use client";

import { motion } from "framer-motion";
import { User, Briefcase, GraduationCap, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

interface Education {
  _id: string;
  degree: string;
  institution: string;
  specialization?: string;
  startYear?: string;
  endYear?: string;
  link?: string;
  logo?: string;
  score?: string;
}

interface Experience {
  _id: string;
  role: string;
  company: string;
  duration: string;
  location?: string;
  status?: string;
  description?: string;
}

interface Profile {
  overview?: string;
}

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-block px-3 py-1 bg-art-yellow border-2 border-art-dark text-[10px] font-black tracking-widest uppercase mb-4 shadow-[2px_2px_0px_#1e293b]">
    {children}
  </div>
);

function TimelineItem({ children, color = "blue" }: { children: React.ReactNode; color?: string }) {
  const dotColor = color === "purple" ? "bg-art-blue" : "bg-art-yellow";
  return (
    <div className="relative pl-10 pb-10 last:pb-0">
      <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-lg ${dotColor} border-2 border-art-dark shadow-[3px_3px_0px_#1e293b] z-10 flex items-center justify-center`}>
        <div className="w-1.5 h-1.5 bg-art-dark rounded-full" />
      </div>
      <div className="absolute left-[11px] top-7 bottom-0 w-1 bg-art-dark/10 rounded-full last:hidden" />
      {children}
    </div>
  );
}

export default function CredentialsPage() {
  const [overview, setOverview] = useState<string | null>(null);
  const [education, setEducation] = useState<Education[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/portfolio/profile").then((r) => r.json()),
      fetch("/api/portfolio/education").then((r) => r.json()),
      fetch("/api/portfolio/experience").then((r) => r.json()),
    ])
      .then(([profiles, edu, exp]) => {
        if (Array.isArray(profiles) && profiles.length > 0) {
          setOverview(profiles[0].overview || null);
        }
        if (Array.isArray(edu)) setEducation(edu);
        if (Array.isArray(exp)) setExperience(exp);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-12">
        <div className="art-badge-yellow text-[9px] px-3 py-1 mb-6 rounded-sm inline-block">BACKGROUND</div>
        <h1 className="editorial-title mb-8">
          <span className="block text-foreground">EDUCATION &</span>
          <span className="block text-art-blue dark:text-blue-500">EXPERIENCE</span>
        </h1>
        
        {overview && (
          <div className="art-card bg-white dark:bg-zinc-900/40 border-l-4 border-l-art-yellow py-8 px-10 mb-16 max-w-4xl rounded-r-3xl">
            <p className="text-xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
              <span className="text-foreground font-black uppercase mr-2 tracking-tighter">Prathamesh Gadewar —</span>
              {overview}
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16 pb-32">
        {/* Education Section */}
        <div>
          <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-10 flex items-center gap-4">
             <div className="w-8 h-[1px] bg-border" />
             Academic Path
          </h2>

          <div className="space-y-6">
            {loading ? (
              [1, 2].map(i => <div key={i} className="h-40 art-card animate-pulse bg-zinc-50" />)
            ) : (
              education.map((edu) => (
                <div key={edu._id} className="art-card group bg-white/50 dark:bg-zinc-900/30 border-border dark:border-zinc-800 hover:border-art-yellow transition-all rounded-[2rem] p-8">
                  <div className="flex justify-between items-start mb-6">
                    <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter">
                       {edu.startYear} — {edu.endYear}
                    </span>
                    {edu.score && (
                      <span className="text-[9px] font-black text-art-yellow uppercase tracking-widest">{edu.score}</span>
                    )}
                  </div>
                  <h3 className="text-2xl font-black text-foreground mb-4 group-hover:text-blue-600 transition-colors tracking-tight">{edu.degree}</h3>
                  <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">{edu.institution}</p>
                  <p className="text-xs font-medium text-zinc-500 line-clamp-2 uppercase tracking-tight">{edu.specialization || "Engineering"}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Experience Section */}
        <div>
          <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-10 flex items-center gap-4">
             <div className="w-8 h-[1px] bg-border" />
             Professional Journey
          </h2>

          <div className="space-y-6">
            {loading ? (
              [1, 2].map(i => <div key={i} className="h-40 art-card animate-pulse bg-zinc-50" />)
            ) : (
              experience.map((exp) => (
                <div key={exp._id} className="art-card group bg-white/50 dark:bg-zinc-900/30 border-border dark:border-zinc-800 hover:border-art-blue transition-all rounded-[2rem] p-8">
                  <div className="flex justify-between items-start mb-6">
                    <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter">
                       {exp.duration}
                    </span>
                    {exp.status && (
                       <span className="w-2 h-2 bg-art-yellow rounded-full animate-pulse shadow-[0_0_10px_rgba(253,224,71,0.5)]" />
                    )}
                  </div>
                  <h3 className="text-2xl font-black text-foreground mb-4 group-hover:text-blue-600 transition-colors tracking-tight">{exp.role}</h3>
                  <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-6">{exp.company}</p>
                  
                  {exp.description && (
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed uppercase tracking-tight line-clamp-3 group-hover:line-clamp-none transition-all">
                       {exp.description}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
