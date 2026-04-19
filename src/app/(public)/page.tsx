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

  const name = profile?.name || "PRATHAMESH GADEWAR";
  const bio =
    profile?.bio ||
    "Full Stack Developer & AI/ML Enthusiast building impactful digital experiences.";
  const profileImage = profile?.profileImage;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[60vh]">
        <div className="lg:col-span-12">
           <div className="mb-8">
              <div className="art-badge">
                 <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                 Hi everyone, I'm {profile?.name || "Prathamesh Gadewar"}
              </div>
           </div>
           
           <h1 className="editorial-title mb-10">
              <span className="block text-foreground mb-2">Graphic Designer</span>
              <span className="block text-art-blue dark:text-blue-500 drop-shadow-sm">Based in India</span>
           </h1>
           
           <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mb-12 leading-relaxed font-medium">
              {bio}
           </p>
           
           <div className="flex flex-wrap gap-4 mb-20">
              <Link href="/contact" className="btn-primary">Get In Touch <ArrowUpRight className="ml-2 w-4 h-4 inline" /></Link>
              <button onClick={() => setIsResumeOpen(true)} className="btn-outline flex items-center gap-2">
                 Download CV <span className="text-lg">↓</span>
              </button>
           </div>
           
           <div className="flex items-center gap-6">
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Find me on:</span>
              <div className="flex gap-3">
                 {profile?.linkedin && (
                   <a href={profile.linkedin} target="_blank" className="w-9 h-9 rounded-full border border-border dark:border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-foreground hover:bg-black/5 transition-all">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                   </a>
                 )}
                 {profile?.github && (
                   <a href={profile.github} target="_blank" className="w-9 h-9 rounded-full border border-border dark:border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-foreground hover:bg-black/5 transition-all">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                   </a>
                 )}
              </div>
           </div>
        </div>
      </div>

      {/* Floating Image with light mode accents */}
      <div className="fixed top-1/2 right-[10%] -translate-y-1/2 w-[380px] aspect-[4/5] -z-10 pointer-events-none hidden lg:block">
         <div className="relative w-full h-full bg-[#111c18] overflow-hidden rounded-[2rem] shadow-2xl transition-transform hover:scale-[1.02]">
            {profileImage ? (
              <Image src={profileImage} alt={name} fill className="object-cover opacity-80" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl font-black text-white/10 uppercase tracking-tighter">PG</div>
            )}
            
            {/* Overlay indicators */}
            <div className="absolute top-8 right-8 art-badge bg-white/10 backdrop-blur-md border-white/20 text-white border-none py-2 px-6">
                Available<br/>for work & collabs
            </div>
         </div>
         
         {/* Decorative blobbies like in screenshot */}
         <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-art-blue/30 blur-3xl -z-20 rounded-full" />
      </div>
    </div>
  );
}
