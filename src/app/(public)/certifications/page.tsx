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
              className="art-card group bg-white dark:bg-zinc-900 border-border dark:border-zinc-800 p-0 rounded-[2.5rem] hover:border-art-yellow transition-all overflow-hidden flex flex-col shadow-sm"
            >
              {/* Image / Header area - Tailored to fit certificates perfectly */}
               <div className="relative w-full aspect-[1.414/1] bg-white dark:bg-zinc-950 flex items-center justify-center overflow-hidden border-b border-border dark:border-zinc-800">
                  {cert.image ? (
                    <Image 
                      src={cert.image} 
                      alt={cert.title} 
                      fill 
                      className="object-contain p-4 group-hover:scale-[1.03] transition-all duration-500" 
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-3xl bg-art-yellow/5 flex items-center justify-center border border-art-yellow/10">
                        <Award className="w-10 h-10 text-art-yellow/40" />
                    </div>
                  )}
                  
                  {cert.year && (
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[8px] font-black py-1 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        CLASS OF {cert.year}
                    </div>
                  )}
               </div>

               {/* Content area */}
               <div className="p-8 pb-6 flex-1 flex flex-col text-center items-center">
                  <div className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-3">
                    {cert.organization}
                  </div>
                  <h2 className="text-lg font-black text-foreground mb-6 leading-tight uppercase max-w-[90%]">
                    {cert.title}
                  </h2>
                  
                  <div className="mt-auto w-full">
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 w-full py-3.5 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-art-yellow hover:text-zinc-900 transition-all dark:hover:bg-art-yellow"
                      >
                         Access Credentials <ExternalLink className="w-3.5 h-3.5" />
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
