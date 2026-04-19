"use client";

import { User, Briefcase, Code, Sparkles, GraduationCap, Mail, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ResumeModal from "@/components/ResumeModal";

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

const SectionLabel = ({ children, color = "blue" }: { children: React.ReactNode; color?: "blue" | "yellow" }) => (
  <div className={`inline-block px-4 py-1.5 text-xs font-black tracking-widest uppercase mb-4 border-2 border-art-dark ${color === "yellow" ? "art-accent-yellow" : "art-accent-blue"}`}>
    {children}
  </div>
);

const cards = [
  { title: "Credentials", desc: "My journey, professional background.", href: "/credentials", icon: User, label: "MORE ABOUT ME", color: "yellow" },
  { title: "Projects", desc: "A collection of my featured work and studies.", href: "/projects", icon: Briefcase, label: "SHOWCASE", color: "blue" },
  { title: "Services", desc: "Solutions I help build and scale.", href: "/services", icon: Sparkles, label: "WHAT I DO", color: "yellow" },
  { title: "Experience", desc: "Places I've worked, impact I made.", href: "/experience", icon: GraduationCap, label: "MY JOURNEY", color: "blue" },
  { title: "Skills", desc: "Technologies and superpowers I use.", href: "/skills", icon: Code, label: "EXPERTISE", color: "yellow" },
  { title: "Contact", desc: "Let's build something great together.", href: "/contact", icon: Mail, label: "GET IN TOUCH", color: "blue" },
];

export default function HomePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

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
  const bio =
    profile?.bio ||
    "Crafting high-performance digital experiences with a blend of AI, design, and development. Let's build the future together.";
  const resumeLink = profile?.resumeLink || "#";
  const profileImage = profile?.profileImage;

  return (
    <div className="relative min-h-screen pb-20 overflow-hidden">
      {/* Background Artistic Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] opacity-15 pointer-events-none">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#FDE047" d="M44.7,-76.4C58,-69.2,69.2,-58,76.4,-44.7C83.6,-31.4,86.7,-15.7,85.2,-0.9C83.7,13.9,77.5,27.8,69.2,39.7C60.9,51.6,50.3,61.5,38,69.2C25.7,76.9,11.7,82.4,-1.8,85.5C-15.3,88.7,-30.5,89.5,-44,84.7C-57.5,79.9,-69.3,69.5,-77.4,56.8C-85.5,44.1,-89.9,29.1,-91.3,13.9C-92.7,-1.3,-91.1,-16.7,-85.4,-30.5C-79.7,-44.3,-69.9,-56.4,-57.7,-64.3C-45.5,-72.1,-30.9,-75.7,-16.3,-74.6C-1.7,-73.5,13.4,-67.7,28,-67.7C42.6,-67.7,56.7,-73.5,69.9,-71.4" transform="translate(100 100)" />
        </svg>
      </div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#2563EB" d="M37.5,-64.2C48.3,-57.1,56.4,-45.5,62.1,-33.1C67.8,-20.7,71.1,-7.5,70.1,5.5C69.1,18.5,63.8,31.4,55.1,41.9C46.4,52.4,34.3,60.5,21.1,64.8C7.9,69.1,-6.4,69.6,-19.8,65.8C-33.2,62,-45.7,53.8,-55.1,43C-64.5,32.2,-70.8,18.8,-72.5,4.8C-74.2,-9.2,-71.3,-23.8,-63.4,-35.8C-55.5,-47.8,-42.6,-57.2,-29.4,-62.8C-16.2,-68.4,-2.7,-70.2,10.7,-68.6C24.1,-67,37.5,-64.2,37.5,-64.2Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-32">
        {/* Newspaper Heading */}
        <div className="border-y-4 border-art-dark py-4 px-2 mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm font-black uppercase tracking-[0.3em] flex items-center gap-4">
             <span>Issue No. 001</span>
             <span className="w-1.5 h-1.5 bg-art-yellow rounded-full" />
             <span>{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
          </div>
          <div className="text-xs font-medium text-gray-400 italic">"Design is intelligence made visible."</div>
        </div>

        {/* Hero Section - Magazine Style */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-end">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <SectionLabel color="yellow">Front Page</SectionLabel>
              <h1 className="editorial-title text-art-dark dark:text-white mb-6">
                Graphic Design<br />
                <span className="text-art-blue">PORTFOLIO</span>
              </h1>
              <div className="flex items-center gap-6 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                {profile?.roles?.map((role, i) => (
                  <div key={role} className="flex items-center gap-3 shrink-0">
                    <span className="text-2xl font-black italic text-art-dark/20 dark:text-white/20">0{i+1}</span>
                    <span className="text-lg font-bold uppercase tracking-tight">{role}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-4 relative group">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="art-card p-0 overflow-hidden relative aspect-[4/5] bg-art-yellow"
            >
              {profileImage ? (
                <Image src={profileImage} alt={name} fill className="object-cover group-hover:scale-110 transition-transform duration-700 grayscale hover:grayscale-0" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-32 h-32 text-art-dark" />
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-art-dark p-6 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-xs font-bold uppercase tracking-widest text-art-yellow mb-2">Editor-in-Chief</p>
                <p className="text-lg font-black tracking-tighter">{name}</p>
              </div>
            </motion.div>
            {/* Artistic scribble under photo */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 text-art-blue -z-10 animate-pulse pointer-events-none">
              <svg viewBox="0 0 100 100"><path d="M10,90 Q50,10 90,90" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" /></svg>
            </div>
          </div>
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* About Column */}
          <motion.div className="md:col-span-2 lg:col-span-1" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
            <div className="art-card h-full flex flex-col justify-between group">
              <div>
                <SectionLabel>Biography</SectionLabel>
                <h2 className="text-4xl font-black mb-6 leading-none group-hover:text-art-blue transition-colors uppercase">Where Clarity Meets Design</h2>
                <div className="flex gap-4 mb-8">
                    <div className="w-1 bg-art-dark h-auto rounded-full" />
                    <p className="text-lg text-gray-500 font-medium leading-relaxed italic">"{bio}"</p>
                </div>
              </div>
              <div className="mt-8 flex items-center justify-between">
                <div className="text-xs font-black uppercase tracking-widest">{profile?.email}</div>
                <button onClick={() => setIsResumeOpen(true)} className="art-accent-yellow px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:scale-105 transition-all">
                  RESUME <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Quick Menu Column */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {cards.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * (idx + 4) }}
              >
                <Link href={card.href} className="group h-full block">
                  <div className={`art-card h-full flex flex-col justify-between group-hover:-translate-y-2 transition-transform ${card.color === 'yellow' ? 'hover:border-art-yellow' : 'hover:border-art-blue'}`}>
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <card.icon className="w-8 h-8 text-art-dark dark:text-gray-400 group-hover:scale-125 transition-transform" />
                        <div className="bg-art-dark text-white rounded-full p-1 group-hover:rotate-45 transition-transform">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                      <p className="text-[10px] font-black tracking-[0.2em] mb-2 uppercase text-gray-400">{card.label}</p>
                      <h3 className="text-2xl font-black leading-none uppercase">{card.title}</h3>
                    </div>
                    <p className="mt-4 text-xs font-medium text-gray-500 leading-relaxed uppercase">{card.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer Editorial Section */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-20 border-t-8 border-double border-art-dark pt-12 flex flex-col md:flex-row gap-12 items-start"
        >
            <div className="flex-1">
                <h4 className="text-6xl font-black italic mb-4 tracking-tighter uppercase">{name}</h4>
                <p className="text-sm font-bold max-w-sm uppercase leading-loose text-gray-500">Entrepreneurship, Design, and High Performance Development. Crafting the digital standards of tomorrow, today.</p>
            </div>
            
            <div className="flex-1 grid grid-cols-2 gap-8 w-full">
                <div>
                    <p className="text-xs font-black uppercase mb-4 text-art-blue">Networks</p>
                    <div className="flex flex-col gap-2">
                        {profile?.github && <a href={profile.github} target="_blank" className="text-sm font-bold hover:underline">GITHUB</a>}
                        {profile?.linkedin && <a href={profile.linkedin} target="_blank" className="text-sm font-bold hover:underline">LINKEDIN</a>}
                        {profile?.twitter && <a href={profile.twitter} target="_blank" className="text-sm font-bold hover:underline">TWITTER</a>}
                    </div>
                </div>
                <div>
                    <p className="text-xs font-black uppercase mb-4 text-art-yellow">Legal</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">©{new Date().getFullYear()} All Rights Reserved. Registered in India.</p>
                </div>
            </div>
        </motion.div>
      </div>

      {/* Resume Modal */}
      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
        resumeUrl={resumeLink} 
        name={name} 
      />
    </div>
  );
}
