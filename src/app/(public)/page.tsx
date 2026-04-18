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
  twitter?: string;
  instagram?: string;
  discord?: string;
  email?: string;
  quote?: string;
}

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2V22"/><path d="M9 18c-4.5 1.5-5-2.5-7-3"/></svg>
);
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M7 6.8c-.8.5-1.5 1.1-2.1 1.8-.4 3.7.2 7.3 1.6 10.7a12 12 0 0 0 6.6 2.1c1.5 0 3-.4 4.3-1.2 1.4-3.4 2-7 1.6-10.7-.6-.7-1.3-1.3-2.1-1.8-1.5-1-3.2-1.5-5-1.5s-3.5.5-5 1.5z"/><path d="M9 22c-1.5-.5-3.5-2.5-4-4"/></svg>
);

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
        className="glass-card py-6 px-8 mt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 dark:text-white/40 gap-4"
      >
        <p className="flex-1 text-center md:text-left">© {new Date().getFullYear()} {name}. All rights reserved.</p>
        
        <div className="flex gap-6 flex-1 justify-center">
          {profile?.github && (
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors" title="GitHub">
              <GithubIcon className="w-5 h-5" />
            </a>
          )}
          {profile?.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors" title="LinkedIn">
              <LinkedinIcon className="w-5 h-5" />
            </a>
          )}
          {profile?.twitter && (
            <a href={profile.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors" title="Twitter">
              <TwitterIcon className="w-5 h-5" />
            </a>
          )}
          {profile?.instagram && (
            <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors" title="Instagram">
              <InstagramIcon className="w-5 h-5" />
            </a>
          )}
          {profile?.discord && (
            <a href={profile.discord} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors" title="Discord">
              <DiscordIcon className="w-5 h-5" />
            </a>
          )}
          {!profile && (
            <>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors" title="GitHub"><GithubIcon className="w-5 h-5" /></a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors" title="LinkedIn"><LinkedinIcon className="w-5 h-5" /></a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors" title="Twitter"><TwitterIcon className="w-5 h-5" /></a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors" title="Instagram"><InstagramIcon className="w-5 h-5" /></a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors" title="Discord"><DiscordIcon className="w-5 h-5" /></a>
            </>
          )}
        </div>

        <p className="flex-1 text-center md:text-right">
          Built with <span className="text-red-500">❤️</span> and lots of Chai.
        </p>
      </motion.div>
    </div>
  );
}
