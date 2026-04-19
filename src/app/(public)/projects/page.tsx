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
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-12">
        <div className="section-label">Collections</div>
        <h1 className="editorial-title mb-8">
          <span className="block text-foreground">PROJECT</span>
          <span className="block text-art-blue dark:text-blue-500">SHOWCASE</span>
        </h1>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border ${
                activeFilter === cat
                  ? "bg-art-blue/40 border-art-blue text-foreground"
                  : "bg-transparent border-border text-zinc-400 hover:text-foreground hover:border-zinc-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
        {loading ? (
          [1, 2, 3].map((i) => (
            <div key={i} className="art-card h-80 animate-pulse bg-zinc-100" />
          ))
        ) : filtered.length === 0 ? (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-3xl">
             <p className="text-zinc-500 font-bold uppercase">No artifacts found in this sector.</p>
          </div>
        ) : (
          filtered.map((project, idx) => (
            <div key={project._id} className="art-card group flex flex-col h-full bg-white dark:bg-zinc-900/50 border-border dark:border-zinc-800 hover:border-art-yellow">
               {/* Icon Placeholder or actual icon */}
               <div className="flex justify-center py-10 border-b border-border dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 rounded-t-2xl">
                  <div className="w-16 h-16 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-4xl shadow-sm group-hover:scale-110 transition-transform">
                     {project.category?.toLowerCase().includes("web") ? "🌐" : 
                      project.category?.toLowerCase().includes("ai") ? "🤖" : 
                      project.category?.toLowerCase().includes("android") ? "📱" : "📁"}
                  </div>
               </div>

               <div className="flex-1 px-4 pt-6">
                  <div className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                     {project.category || "GENERAL"} {project.tags[0] && ` / ${project.tags[0]}`}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 leading-tight group-hover:text-blue-500 transition-colors uppercase tracking-tight">{project.title}</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium uppercase mb-16">
                    {project.description}
                  </p>
               </div>

               <div className="flex justify-start px-2 py-2">
                  {project.liveLink ? (
                    <a href={project.liveLink} target="_blank" className="bg-art-yellow text-foreground px-6 py-2 rounded-lg font-black text-[9px] uppercase flex items-center gap-2 hover:scale-[1.03] transition-all shadow-sm">
                       Visit Project <span className="text-lg leading-none">→</span>
                    </a>
                  ) : (
                    <div className="bg-zinc-100 dark:bg-zinc-800 text-zinc-400 px-6 py-2 rounded-lg font-black text-[9px] uppercase">Prototype Stage</div>
                  )}
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
