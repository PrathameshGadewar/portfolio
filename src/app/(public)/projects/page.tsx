"use client";

import { motion } from "framer-motion";
import { Briefcase, ExternalLink, Code2, Filter } from "lucide-react";
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
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-white/60 dark:bg-white/10 rounded-xl border border-white/40 shadow-sm">
          <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Showcase</h1>
          <p className="text-gray-500 dark:text-white/40">A collection of my featured work</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            id={`filter-${cat.toLowerCase().replace("/", "-")}`}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeFilter === cat
                ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm"
                : "bg-white/50 dark:bg-white/5 border border-white/40 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 text-gray-600 dark:text-white/50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="glass-card overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200 dark:bg-white/10" />
              <div className="p-6 space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-3/4" />
                <div className="h-3 bg-gray-100 dark:bg-white/5 rounded w-full" />
                <div className="h-3 bg-gray-100 dark:bg-white/5 rounded w-5/6" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-card p-16 text-center">
          <Filter className="w-12 h-12 text-gray-300 dark:text-white/20 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-500 dark:text-white/40">
            {projects.length === 0 ? "No projects yet. Add them from the admin panel." : `No projects in "${activeFilter}" category.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((project, idx) => (
            <motion.div
              key={project._id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.08 }}
              className="glass-card group overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="h-48 flex-shrink-0 relative overflow-hidden bg-gradient-to-br from-blue-100/50 to-purple-100/50 dark:from-blue-900/20 dark:to-purple-900/20">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <Briefcase className="w-12 h-12 text-blue-200 dark:text-blue-900" />
                  </div>
                )}
                {project.category && (
                  <div className="absolute top-3 right-3 text-xs font-bold text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    {project.category}
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex gap-2 mb-3 flex-wrap">
                  {project.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-wider font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-900/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h2>
                <p className="text-gray-500 dark:text-white/40 text-sm flex-1 leading-relaxed">{project.description}</p>

                <div className="flex gap-3 mt-5 pt-5 border-t border-gray-100 dark:border-white/5">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
                    >
                      <Code2 className="w-4 h-4" /> Source
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
