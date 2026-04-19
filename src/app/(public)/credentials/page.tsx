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
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
      {/* About Me Section - Editorial Style */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="art-card mb-12 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-art-yellow/10 rounded-bl-full -z-10" />
        <div className="flex items-center gap-4 mb-8">
          <SectionLabel>Curriculum Vitae</SectionLabel>
          <div className="h-0.5 flex-1 bg-art-dark/5" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h1 className="text-6xl font-black leading-[0.85] tracking-tighter uppercase">
              The<br />
              <span className="text-art-blue italic">Story</span><br />
              So Far
            </h1>
          </div>
          <div className="lg:col-span-8">
            <p className="text-xl text-gray-500 font-medium leading-relaxed italic border-l-4 border-art-yellow pl-6">
              {overview || "Crafting the future through code, design, and relentless innovation."}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Education Column */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-4xl font-black mb-10 flex items-center gap-4">
            <div className="w-12 h-12 art-accent-blue rounded-xl flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            EDUCATION
          </h2>

          {loading ? (
             <div className="space-y-8">
                {[1, 2].map(i => <div key={i} className="h-32 art-card animate-pulse bg-gray-50" />)}
             </div>
          ) : education.length === 0 ? (
            <div className="art-card italic text-gray-400">No records found.</div>
          ) : (
            <div className="space-y-0">
              {education.map((edu) => (
                <TimelineItem key={edu._id} color="yellow">
                  <div className="art-card group hover:scale-[1.02] transition-transform">
                    <div className="flex gap-4">
                      {edu.logo && (
                        <div className="w-16 h-16 rounded-xl bg-gray-50 p-2 border-2 border-art-dark overflow-hidden shrink-0 shadow-[4px_4px_0px_#1e293b]">
                          <img src={edu.logo} alt={edu.institution} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between items-start gap-4 mb-2">
                          <h3 className="text-lg font-black leading-tight uppercase group-hover:text-art-blue transition-colors">{edu.degree}</h3>
                          {edu.score && (
                            <span className="art-accent-yellow px-2 py-0.5 text-[10px] font-black rounded border-2 border-art-dark">
                              {edu.score}
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-bold text-gray-400 mb-4">{edu.institution}</p>
                        <div className="flex flex-wrap items-center gap-4">
                           <div className="bg-art-dark text-white text-[10px] font-black px-2 py-1 rounded">
                              {edu.startYear} - {edu.endYear}
                           </div>
                           {edu.link && (
                             <a href={edu.link} target="_blank" className="text-[10px] font-black text-art-blue hover:underline flex items-center gap-1">
                               OFFICIAL LINK <ExternalLink className="w-3 h-3" />
                             </a>
                           )}
                        </div>
                      </div>
                    </div>
                  </div>
                </TimelineItem>
              ))}
            </div>
          )}
        </motion.div>

        {/* Experience Column */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-4xl font-black mb-10 flex items-center gap-4">
            <div className="w-12 h-12 art-accent-yellow rounded-xl flex items-center justify-center shrink-0">
              <Briefcase className="w-6 h-6 text-art-dark" />
            </div>
            EXPERIENCE
          </h2>

          {loading ? (
             <div className="space-y-8">
                {[1, 2].map(i => <div key={i} className="h-32 art-card animate-pulse bg-gray-50" />)}
             </div>
          ) : experience.length === 0 ? (
            <div className="art-card italic text-gray-400">No records found.</div>
          ) : (
            <div className="space-y-0">
              {experience.map((exp) => (
                <TimelineItem key={exp._id} color="purple">
                  <div className="art-card group hover:scale-[1.02] transition-transform">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-black leading-tight uppercase group-hover:text-art-blue transition-colors">{exp.role}</h3>
                        <p className="text-sm font-bold text-gray-400">{exp.company}</p>
                      </div>
                      <div className="text-[10px] font-black bg-art-blue text-white px-2 py-1 rounded shadow-[2px_2px_0px_#1e293b]">
                        {exp.duration}
                      </div>
                    </div>
                    {exp.description && (
                      <p className="text-xs font-medium text-gray-500 leading-relaxed uppercase border-t-2 border-dashed border-gray-100 pt-4 mt-4">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </TimelineItem>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
