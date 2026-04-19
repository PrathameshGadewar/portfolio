"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar, Building } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Certification {
  _id: string;
  title: string;
  organization: string;
  year?: string;
  link?: string;
  image?: string;
}

export default function CertificationsPage() {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portfolio/certification")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setCerts(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-16">
        <div className="art-badge-yellow text-[9px] px-3 py-1 mb-6 rounded-sm inline-block">ATTAINMENTS</div>
        <h1 className="editorial-title mb-8">
          <span className="block text-foreground">HONORS &</span>
          <span className="block text-art-yellow">CERTIFICATES</span>
        </h1>
        <p className="text-zinc-400 font-bold text-[10px] uppercase tracking-[0.2em] italic">"Validation of expertise through industry-standard examination."</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 art-card animate-pulse bg-zinc-50 dark:bg-zinc-900" />
          ))}
        </div>
      ) : certs.length === 0 ? (
        <div className="py-20 text-center border-2 border-dashed border-border rounded-[3rem] mb-32">
          <Award className="w-12 h-12 text-gray-300 dark:text-zinc-800 mx-auto mb-4" />
          <p className="text-zinc-400 font-black uppercase tracking-widest text-xs">No certifications found in this portfolio.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
          {certs.map((cert, idx) => (
            <motion.div
              key={cert._id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.08 }}
              className="art-card group bg-white dark:bg-zinc-900/40 border-border dark:border-zinc-800 p-0 rounded-[3rem] hover:border-art-yellow transition-all overflow-hidden flex flex-col"
            >
              {/* Image / Header area */}
               <div className="relative w-full aspect-[4/3] bg-zinc-50 dark:bg-zinc-950/60 border-b border-border dark:border-zinc-800 flex items-center justify-center overflow-hidden">
                  {cert.image ? (
                    <Image 
                      src={cert.image} 
                      alt={cert.title} 
                      fill 
                      className="object-contain p-8 group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-3xl bg-art-yellow/10 flex items-center justify-center border border-art-yellow/20 group-hover:rotate-12 transition-transform">
                        <Award className="w-10 h-10 text-art-yellow" />
                    </div>
                  )}
                  {cert.year && (
                    <div className="absolute top-6 right-6 art-badge bg-white/80 dark:bg-black/40 backdrop-blur-md border-border dark:border-zinc-800 py-1.5 px-4 text-[9px]">
                        ISSUED: {cert.year}
                    </div>
                  )}
               </div>

               {/* Content area */}
               <div className="p-8 flex-1 flex flex-col">
                  <div className="text-[9px] font-black text-art-yellow uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                     <Building className="w-3 h-3" /> {cert.organization}
                  </div>
                  <h2 className="text-xl font-black text-foreground mb-6 leading-tight tracking-tight group-hover:text-art-yellow transition-colors uppercase">
                    {cert.title}
                  </h2>
                  
                  <div className="mt-auto">
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary w-full text-center py-3 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2"
                      >
                         View Document <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
               </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}
