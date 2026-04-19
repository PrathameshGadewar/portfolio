"use client";

import { motion } from "framer-motion";
import { Briefcase, ExternalLink, Code2, Filter, Grid } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Project {
  _id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  liveLink?: string;
  githubLink?: string;
  category?: string;
}

const CATEGORIES = ["All", "Web", "AI/ML", "Backend"];

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-block px-3 py-1 bg-art-yellow border-2 border-art-dark text-[10px] font-black tracking-widest uppercase mb-4 shadow-[2px_2px_0px_#1e293b]">
    {children}
  </div>
);

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    fetch("/api/portfolio/project")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setProjects(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category?.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <SectionLabel>Collections</SectionLabel>
          <h1 className="editorial-title text-art-dark dark:text-white">PROJECT<br/><span className="text-art-blue">SHOWCASE</span></h1>
        </div>
        
        {/* Filters - Magazine Style */}
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2 border-2 border-art-dark text-xs font-black tracking-widest uppercase transition-all ${
                activeFilter === cat
                  ? "bg-art-blue text-white shadow-[4px_4px_0px_#1e293b] translate-x-[-2px] translate-y-[-2px]"
                  : "bg-white hover:bg-gray-50 dark:bg-black/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="art-card h-[400px] animate-pulse bg-gray-50 p-0 overflow-hidden" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="art-card p-20 text-center">
            <h2 className="text-4xl font-black text-gray-200 uppercase tracking-tighter italic">"No artifacts found in this sector"</h2>
            <p className="mt-4 text-xs font-bold text-gray-400">SELECT ANOTHER CATEGORY OR CHECK BACK LATER</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map((project, idx) => (
            <motion.div
              key={project._id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="art-card group p-0 overflow-hidden flex flex-col h-full bg-white hover:border-art-blue"
            >
              {/* Image Header */}
              <div className="relative aspect-video overflow-hidden border-b-2 border-art-dark bg-art-yellow">
                {project.image ? (
                  <Image src={project.image} alt={project.title} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                     <Grid className="w-16 h-16 text-art-dark/10" />
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="bg-art-dark text-white text-[8px] font-black px-2 py-1 uppercase tracking-widest shadow-[2px_2px_0px_#fde047]">
                    REF: 00{idx+1}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex gap-2 mb-4">
                   {project.category && (
                     <div className="text-[10px] font-black text-art-blue uppercase">{project.category}</div>
                   )}
                   <div className="w-px h-3 bg-gray-200" />
                   <div className="flex-1 flex gap-2 overflow-hidden">
                      {project.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] font-bold text-gray-400 uppercase truncate">{tag}</span>
                      ))}
                   </div>
                </div>

                <h2 className="text-2xl font-black mb-4 leading-none uppercase group-hover:text-art-blue transition-colors">
                  {project.title}
                </h2>
                <p className="text-xs font-medium text-gray-500 flex-1 leading-relaxed uppercase border-l-2 border-art-yellow pl-4">
                  {project.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mt-8 pt-6 border-t-2 border-dashed border-gray-100">
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" className="art-accent-blue py-2 text-[10px] font-black uppercase flex items-center justify-center gap-2 hover:translate-y-[-2px] transition-transform">
                      VIEW LIVE <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" className="art-accent-yellow py-2 text-[10px] text-art-dark font-black uppercase flex items-center justify-center gap-2 hover:translate-y-[-2px] transition-transform">
                      GET SOURCE <Code2 className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
