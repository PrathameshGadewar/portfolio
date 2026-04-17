"use client";

import { User, Briefcase, Code, Sparkles, GraduationCap, Mail, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Profile {
  name: string;
  roles: string[];
  bio: string;
  profileImage?: string;
  resumeLink?: string;
  github?: string;
  linkedin?: string;
  email?: string;
  quote?: string;
}

const cards = [
  { title: "Credentials", desc: "My journey, professional background.", href: "/credentials", icon: User, label: "MORE ABOUT ME" },
  { title: "Projects", desc: "A collection of my featured work and studies.", href: "/projects", icon: Briefcase, label: "SHOWCASE" },
  { title: "Services", desc: "Solutions I help build and scale.", href: "/services", icon: Sparkles, label: "WHAT I DO" },
  { title: "Experience", desc: "Places I've worked, impact I made.", href: "/experience", icon: GraduationCap, label: "MY JOURNEY" },
  { title: "Skills", desc: "Technologies and superpowers I use.", href: "/skills", icon: Code, label: "EXPERTISE" },
  { title: "Contact", desc: "Let's build something great together.", href: "/contact", icon: Mail, label: "GET IN TOUCH" },
];

export default function HomePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portfolio/profile")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setProfile(data[0]);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const name = profile?.name || "Prathamesh Gadewar";
  const roles = profile?.roles?.join(" • ") || "Entrepreneur • Developer • Innovator";
  const bio =
    profile?.bio ||
    "Crafting high-performance digital experiences with a blend of AI, design, and development. Let's build the future together.";
  const resumeLink = profile?.resumeLink || "#";
  const profileImage = profile?.profileImage;

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center md:items-stretch"
      >
        {/* Profile Image */}
        <div className="w-48 h-56 shrink-0 rounded-2xl overflow-hidden relative bg-gradient-to-tr from-blue-100 to-purple-100 dark:from-purple-900/30 dark:to-blue-900/30">
          {loading ? (
            <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-white/10" />
          ) : profileImage ? (
            <Image
              src={profileImage}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 192px, 192px"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <User className="text-blue-300 dark:text-purple-400 w-20 h-20" />
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="inline-flex py-1 px-3 rounded-full bg-gray-100/50 dark:bg-white/5 text-xs font-semibold text-gray-500 dark:text-white/50 tracking-wider mb-4 border border-white/40">
              {loading ? <span className="w-48 h-3 bg-gray-200 dark:bg-white/10 rounded animate-pulse" /> : roles.toUpperCase()}
            </div>
            {loading ? (
              <div className="h-12 w-72 bg-gray-200 dark:bg-white/10 rounded-xl animate-pulse mb-4" />
            ) : (
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                {name}
              </h1>
            )}
            {loading ? (
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-100 dark:bg-white/5 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-100 dark:bg-white/5 rounded animate-pulse" />
              </div>
            ) : (
              <p className="text-gray-500 dark:text-white/50 text-lg leading-relaxed max-w-xl">{bio}</p>
            )}
          </div>

          <div className="flex items-center justify-between mt-8 flex-wrap gap-4">
            {profile?.email && (
              <div className="flex items-center gap-2 bg-gray-100/50 dark:bg-white/5 py-2 px-4 rounded-full border border-white/40 text-sm">
                <span className="text-gray-500 dark:text-white/50 font-medium">{profile.email}</span>
              </div>
            )}

            <a
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              id="resume-btn"
              className="flex items-center bg-gray-100 dark:bg-white/10 rounded-full pr-1 pl-6 py-1 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors shadow-sm group ml-auto"
            >
              <span className="font-medium mr-4 text-sm text-gray-800 dark:text-white">Resume</span>
              <div className="bg-black dark:bg-white text-white dark:text-black p-2.5 rounded-full group-hover:-rotate-45 transition-transform duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Grid Menu System */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 * (idx + 1) }}
          >
            <Link href={card.href} className="block group">
              <div className="glass-card p-6 h-full flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
                <div>
                  <card.icon className="w-8 h-8 text-gray-500 dark:text-white/40 mb-8" />
                  <div className="text-xs font-bold text-gray-400 dark:text-white/30 tracking-widest uppercase mb-1">
                    {card.label}
                  </div>
                  <h2 className="text-2xl font-bold mb-2 dark:text-white">{card.title}</h2>
                  <p className="text-gray-500 dark:text-white/40 text-sm leading-relaxed">{card.desc}</p>
                </div>
                <div className="mt-8 flex justify-end">
                  <div className="bg-white dark:bg-white/10 p-2 rounded-full shadow-sm text-gray-400 dark:text-white/40 group-hover:text-black dark:group-hover:text-white group-hover:bg-gray-50 dark:group-hover:bg-white/20 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="glass-card py-6 px-8 mt-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 dark:text-white/40"
      >
        <p>© 2026 {name}. All rights reserved.</p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          {profile?.github && (
            <a href={profile.github} target="_blank" className="hover:text-gray-800 dark:hover:text-white transition-colors">
              GitHub
            </a>
          )}
          {profile?.linkedin && (
            <a href={profile.linkedin} target="_blank" className="hover:text-gray-800 dark:hover:text-white transition-colors">
              LinkedIn
            </a>
          )}
          {!profile && (
            <>
              <Link href="#" className="hover:text-gray-800 dark:hover:text-white transition-colors">GitHub</Link>
              <Link href="#" className="hover:text-gray-800 dark:hover:text-white transition-colors">LinkedIn</Link>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
