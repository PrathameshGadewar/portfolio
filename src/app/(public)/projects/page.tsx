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
        <div className="section-label">WORK</div>
        <h1 className="editorial-title text-white mb-8">
          SELECTED<br />
          <span className="text-zinc-500">PROJECTS</span>
        </h1>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${
                activeFilter === cat
                  ? "bg-zinc-800 border-zinc-700 text-white"
                  : "bg-transparent border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          [1, 2, 3].map((i) => (
            <div key={i} className="art-card h-80 animate-pulse bg-zinc-900" />
          ))
        ) : filtered.length === 0 ? (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-zinc-800 rounded-3xl">
             <p className="text-zinc-500 font-bold uppercase">No projects found in this category.</p>
          </div>
        ) : (
          filtered.map((project, idx) => (
            <div key={project._id} className="art-card group flex flex-col h-full bg-[#0a0a0a] border-zinc-800/50 hover:border-zinc-700">
               {/* Icon Placeholder or actual icon */}
               <div className="flex justify-center py-10">
                  <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center text-4xl grayscale group-hover:grayscale-0 transition-all">
                     {project.category?.toLowerCase().includes("web") ? "🌐" : 
                      project.category?.toLowerCase().includes("ai") ? "🤖" : 
                      project.category?.toLowerCase().includes("android") ? "📱" : "📁"}
                  </div>
               </div>

               <div className="flex-1 px-2 pt-4">
                  <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                     {project.tags.slice(0, 2).join(" / ") || "GENERAL"}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-art-yellow transition-colors">{project.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed uppercase mb-12">
                    {project.description}
                  </p>
               </div>

               <div className="flex justify-end mt-auto">
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" className="bg-art-yellow text-black px-6 py-2 rounded-lg font-black text-[10px] uppercase flex items-center gap-2 hover:scale-105 transition-all">
                       View <span className="text-lg leading-none">→</span>
                    </a>
                  )}
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
