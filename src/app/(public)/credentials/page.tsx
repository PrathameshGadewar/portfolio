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
        <div className="section-label">BACKGROUND</div>
        <h1 className="editorial-title text-white mb-8">
          EDUCATION &<br />
          <span className="text-zinc-500">EXPERIENCE</span>
        </h1>
        
        {overview && (
          <div className="art-card border-l-4 border-l-art-yellow py-8 px-10 mb-16 max-w-4xl">
            <p className="text-lg text-zinc-300 font-medium leading-relaxed">
              <span className="text-white font-black uppercase mr-2">Prathamesh Gadewar —</span>
              {overview}
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
        {/* Education Section */}
        <div>
          <h2 className="text-2xl font-black mb-8 flex items-center gap-4 text-white uppercase">
            <div className="w-10 h-10 bg-yellow-400/20 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-art-yellow" />
            </div>
            Education
          </h2>

          <div className="space-y-6">
            {loading ? (
              [1, 2].map(i => <div key={i} className="h-40 art-card animate-pulse" />)
            ) : (
              education.map((edu) => (
                <div key={edu._id} className="art-card group relative overflow-hidden">
                  <div className="border-l-2 border-zinc-700 pl-6 group-hover:border-art-yellow transition-colors">
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">{edu.institution}</p>
                    <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
                    <p className="text-sm text-zinc-400 font-medium mb-4 uppercase tracking-tighter">{edu.specialization || "Engineering"}</p>
                    
                    <div className="flex items-center gap-3">
                       <span className="bg-zinc-800 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                          {edu.startYear} — {edu.endYear}
                       </span>
                       {edu.score && (
                         <span className="text-[10px] font-bold text-zinc-500 uppercase">{edu.score}</span>
                       )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Experience Section */}
        <div>
          <h2 className="text-2xl font-black mb-8 flex items-center gap-4 text-white uppercase">
            <div className="w-10 h-10 bg-blue-400/10 rounded-xl flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-art-blue" />
            </div>
            Experience
          </h2>

          <div className="space-y-6">
            {loading ? (
              [1, 2].map(i => <div key={i} className="h-40 art-card animate-pulse" />)
            ) : (
              experience.map((exp) => (
                <div key={exp._id} className="art-card group relative overflow-hidden">
                  <div className="border-l-2 border-zinc-700 pl-6 group-hover:border-art-blue transition-colors">
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">{exp.company}</p>
                    <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                    <p className="text-sm text-zinc-400 font-medium mb-4 uppercase tracking-tighter">{exp.duration}</p>
                    
                    {exp.description && (
                      <p className="text-xs text-zinc-500 leading-relaxed max-w-md line-clamp-3 group-hover:text-zinc-300 transition-colors uppercase">
                         {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
