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

function TimelineItem({ children, color = "blue" }: { children: React.ReactNode; color?: string }) {
  const dotColor = color === "purple" ? "bg-purple-500" : "bg-blue-500";
  return (
    <div className="relative pl-8 pb-8 last:pb-0">
      <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full ${dotColor} border-4 border-white dark:border-[#0d0b1a] shadow-sm z-10`} />
      <div className="absolute left-[7px] top-5 bottom-0 w-0.5 bg-gradient-to-b from-gray-200 dark:from-white/10 to-transparent last:hidden" />
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

  const Skeleton = () => (
    <div className="space-y-3 animate-pulse">
      <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-3/4" />
      <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-full" />
      <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-5/6" />
    </div>
  );

  return (
    <div className="space-y-8">
      {/* About Me */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-white/60 dark:bg-white/10 rounded-xl border border-white/40 shadow-sm">
            <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold dark:text-white">About Me</h1>
        </div>
        {loading ? (
          <Skeleton />
        ) : overview ? (
          <p className="text-gray-500 dark:text-white/50 leading-relaxed text-lg">{overview}</p>
        ) : (
          <p className="text-gray-500 dark:text-white/50 leading-relaxed text-lg">
            I am Prathamesh Gadewar, a passionate Full Stack Developer specializing in building modern web
            applications, integrating AI, and creating impactful user experiences. Currently pursuing my MCA, I
            focus on coding, AI models, and optimizing complex systems.
          </p>
        )}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Education */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-white/60 dark:bg-white/10 rounded-xl border border-white/40 shadow-sm">
              <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold dark:text-white">Education</h2>
          </div>

          {loading ? (
            <div className="space-y-6 animate-pulse">
              {[1, 2].map((i) => (
                <div key={i} className="h-20 bg-gray-100 dark:bg-white/5 rounded-xl" />
              ))}
            </div>
          ) : education.length === 0 ? (
            <p className="text-gray-400 dark:text-white/30 text-sm">No education entries yet. Add them from the admin panel.</p>
          ) : (
            <div>
              {education.map((edu) => (
                <TimelineItem key={edu._id} color="blue">
                  <div className="bg-white/50 dark:bg-white/5 p-4 rounded-xl border border-white/40 dark:border-white/10">
                    <div className="flex gap-4">
                      {edu.logo && (
                        <div className="w-12 h-12 rounded-lg bg-white dark:bg-white/10 p-1.5 border border-gray-100 dark:border-white/10 shrink-0 overflow-hidden shadow-sm">
                          <img 
                            src={edu.logo} 
                            alt={edu.institution} 
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="font-bold text-gray-900 dark:text-white text-sm truncate">{edu.degree}</div>
                          {(edu.startYear || edu.endYear) && (
                            <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded shrink-0">
                              {edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ""}
                            </div>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-white/50 mb-1">{edu.institution}</div>
                        {edu.specialization && (
                          <div className="text-xs font-medium text-blue-500 dark:text-blue-400">{edu.specialization}</div>
                        )}
                        {edu.link && (
                          <a href={edu.link} target="_blank" className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-blue-500 mt-2 transition-colors">
                            <ExternalLink className="w-3 h-3" /> View
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </TimelineItem>
              ))}
            </div>
          )}
        </motion.div>

        {/* Experience */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-white/60 dark:bg-white/10 rounded-xl border border-white/40 shadow-sm">
              <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold dark:text-white">Experience</h2>
          </div>

          {loading ? (
            <div className="space-y-6 animate-pulse">
              {[1, 2].map((i) => (
                <div key={i} className="h-20 bg-gray-100 dark:bg-white/5 rounded-xl" />
              ))}
            </div>
          ) : experience.length === 0 ? (
            <p className="text-gray-400 dark:text-white/30 text-sm">No experience entries yet. Add them from the admin panel.</p>
          ) : (
            <div>
              {experience.map((exp) => (
                <TimelineItem key={exp._id} color="purple">
                  <div className="bg-white/50 dark:bg-white/5 p-4 rounded-xl border border-white/40 dark:border-white/10">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="font-bold text-gray-900 dark:text-white text-sm">{exp.role}</div>
                      {exp.status && (
                        <div className={`text-xs font-semibold px-2 py-0.5 rounded shrink-0 ${
                          exp.status.toLowerCase().includes("current")
                            ? "text-green-600 bg-green-50 dark:bg-green-900/30 dark:text-green-400"
                            : "text-purple-600 bg-purple-50 dark:bg-purple-900/30 dark:text-purple-400"
                        }`}>
                          {exp.status}
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-white/50 mb-1">{exp.company}</div>
                    {exp.duration && (
                      <div className="text-xs text-gray-400 dark:text-white/30">{exp.duration}</div>
                    )}
                    {exp.description && (
                      <p className="text-xs text-gray-500 dark:text-white/40 mt-2 leading-relaxed">{exp.description}</p>
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
