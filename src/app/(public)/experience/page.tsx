"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface Experience {
  _id: string;
  role: string;
  company: string;
  duration: string;
  location?: string;
  status?: string;
  description?: string;
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
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-white/60 dark:bg-white/10 rounded-xl border border-white/40 shadow-sm">
          <Briefcase className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Experience</h1>
          <p className="text-gray-500 dark:text-white/40">Places I've worked and impact I've made</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card p-6 animate-pulse">
              <div className="h-5 bg-gray-200 dark:bg-white/10 rounded w-1/3 mb-3" />
              <div className="h-4 bg-gray-100 dark:bg-white/5 rounded w-1/4 mb-2" />
              <div className="h-3 bg-gray-100 dark:bg-white/5 rounded w-full" />
            </div>
          ))}
        </div>
      ) : experience.length === 0 ? (
        <div className="glass-card p-16 text-center">
          <Briefcase className="w-12 h-12 text-gray-300 dark:text-white/20 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-500 dark:text-white/40">
            No experience entries yet. Add them from the admin panel.
          </p>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-purple-200 dark:via-purple-900/40 to-transparent" />

          <div className="space-y-6">
            {experience.map((exp, idx) => (
              <motion.div
                key={exp._id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="relative pl-16"
              >
                {/* Dot */}
                <div className="absolute left-4 top-6 w-5 h-5 rounded-full bg-purple-500 dark:bg-purple-600 border-4 border-white dark:border-[#0d0b1a] shadow-lg z-10 -translate-x-1/2" />

                <div className="glass-card p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">{exp.role}</h2>
                      <p className="text-purple-600 dark:text-purple-400 font-semibold">{exp.company}</p>
                    </div>
                    {exp.status && (
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-bold self-start shrink-0 ${
                          exp.status.toLowerCase().includes("current") || exp.status.toLowerCase().includes("full")
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                            : "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                        }`}
                      >
                        {exp.status}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-white/40 mb-3">
                    {exp.duration && (
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {exp.duration}
                      </div>
                    )}
                    {exp.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </div>
                    )}
                  </div>

                  {exp.description && (
                    <p className="text-gray-500 dark:text-white/40 text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
