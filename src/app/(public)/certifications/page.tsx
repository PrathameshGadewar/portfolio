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
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-white/60 dark:bg-white/10 rounded-xl border border-white/40 shadow-sm">
          <Award className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Certifications</h1>
          <p className="text-gray-500 dark:text-white/40">Verified skills and achievements</p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card p-6 animate-pulse space-y-3">
              <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-3/4" />
              <div className="h-4 bg-gray-100 dark:bg-white/5 rounded w-1/2" />
              <div className="h-4 bg-gray-100 dark:bg-white/5 rounded w-1/3" />
            </div>
          ))}
        </div>
      ) : certs.length === 0 ? (
        <div className="glass-card p-16 text-center">
          <Award className="w-12 h-12 text-gray-300 dark:text-white/20 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-500 dark:text-white/40">
            No certifications yet. Add them from the admin panel.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert, idx) => (
            <motion.div
              key={cert._id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.08 }}
              className="glass-card p-6 group hover:scale-[1.02] transition-transform duration-300 flex flex-col"
            >
              {/* Badge / Image */}
              {cert.image ? (
                <div className="w-full h-40 rounded-xl overflow-hidden relative mb-4 bg-gray-50/50 dark:bg-white/5 border border-white/40 shadow-inner group-hover:border-blue-500/30 transition-colors">
                  <Image 
                    src={cert.image} 
                    alt={cert.title} 
                    fill 
                    className="object-contain p-2" 
                    unoptimized={cert.image.startsWith("/")}
                  />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 flex items-center justify-center mb-4">
                  <Award className="w-7 h-7 text-yellow-500 dark:text-yellow-400" />
                </div>
              )}

              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1 flex-1 leading-snug">
                {cert.title}
              </h2>

              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-white/40 mt-2">
                <Building className="w-4 h-4 shrink-0" />
                <span>{cert.organization}</span>
              </div>

              {cert.year && (
                <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-white/30 mt-1">
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span>{cert.year}</span>
                </div>
              )}

              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> View Certificate
                </a>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
