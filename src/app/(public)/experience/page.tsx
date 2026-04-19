"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";
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

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-block px-3 py-1 bg-art-yellow border-2 border-art-dark text-[10px] font-black tracking-widest uppercase mb-4 shadow-[2px_2px_0px_#1e293b]">
    {children}
  </div>
);

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
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
      <div className="mb-16">
        <SectionLabel>Logbook</SectionLabel>
        <h1 className="editorial-title text-art-dark dark:text-white">WORK<br/><span className="text-art-blue">HISTORY</span></h1>
        <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest italic">"A professional journey defined by impact and innovation."</p>
      </div>

      {loading ? (
        <div className="space-y-10">
          {[1, 2].map(i => <div key={i} className="art-card h-48 animate-pulse bg-gray-50" />)}
        </div>
      ) : experience.length === 0 ? (
        <div className="art-card p-20 text-center">
             <h2 className="text-4xl font-black text-gray-200 uppercase tracking-tighter italic">"No professional records found"</h2>
             <p className="mt-4 text-xs font-bold text-gray-400">ENTRIES WILL BE UPDATED ONCE VERIFIED</p>
        </div>
      ) : (
        <div className="space-y-12">
          {experience.map((exp, idx) => (
            <motion.div
              key={exp._id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-3">
                      <div className="flex flex-col gap-2">
                          <span className="text-3xl font-black italic text-art-dark/10 dark:text-white/10">ENTRY_0{idx+1}</span>
                          <span className="text-sm font-black text-art-blue uppercase tracking-tighter">{exp.duration}</span>
                          {exp.location && <span className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1"><MapPin className="w-3 h-3" /> {exp.location}</span>}
                      </div>
                  </div>
                  
                  <div className="lg:col-span-9">
                      <div className="art-card group-hover:border-art-blue group-hover:shadow-[12px_12px_0px_#2563eb] transition-all relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                              <Briefcase className="w-24 h-24" />
                          </div>
                          
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                              <div>
                                  <h2 className="text-3xl font-black uppercase leading-none mb-2">{exp.role}</h2>
                                  <h3 className="text-lg font-bold text-art-blue uppercase">{exp.company}</h3>
                              </div>
                              {exp.status && (
                                  <div className="art-accent-yellow px-4 py-1 border-2 border-art-dark text-[10px] font-black uppercase shadow-[3px_3px_0px_#1e293b]">
                                      {exp.status}
                                  </div>
                              )}
                          </div>
                          
                          <p className="text-sm font-medium text-gray-500 leading-relaxed uppercase border-t-2 border-dashed border-gray-100 pt-6">
                              {exp.description || "NO DESCRIPTION PROVIDED IN SYSTEM RECORDS."}
                          </p>

                          <div className="mt-8 flex justify-end">
                              <div className="flex items-center gap-2 text-[10px] font-black uppercase group-hover:text-art-blue transition-colors">
                                  VERIFIED LOG <ArrowRight className="w-4 h-4" />
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
