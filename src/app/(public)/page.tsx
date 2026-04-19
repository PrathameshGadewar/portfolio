"use client";

import { User, Briefcase, Code, Sparkles, GraduationCap, Mail, ArrowUpRight, ArrowRight } from "lucide-react";
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

interface Education {
  _id: string;
  degree: string;
  institution: string;
  startYear?: string;
  endYear?: string;
}

interface Experience {
  _id: string;
  role: string;
  company: string;
  duration: string;
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
  const [education, setEducation] = useState<Education[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/portfolio/profile").then((r) => r.json()),
      fetch("/api/portfolio/education").then((r) => r.json()),
      fetch("/api/portfolio/experience").then((r) => r.json()),
    ])
      .then(([profiles, edu, exp]) => {
        if (Array.isArray(profiles) && profiles.length > 0) setProfile(profiles[0]);
        if (Array.isArray(edu)) setEducation(edu.slice(0, 2));
        if (Array.isArray(exp)) setExperience(exp.slice(0, 2));
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center min-h-[70vh] mb-32">
        {/* Left Column: Text Content */}
        <div className="lg:col-span-7">
           <div className="mb-8">
              <div className="art-badge">
                 <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                 Graphic Designer
              </div>
           </div>
           
           <h1 className="editorial-title mb-10">
              <span className="block text-foreground mb-2 uppercase leading-[0.9] tracking-tighter transition-all">
                Hi everyone,
              </span>
              <span className="block text-[#D0DFF2] mb-4 uppercase leading-[0.9] tracking-tighter transition-all">
                I'm {profile?.name || "Prathamesh"}
              </span>
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

        {/* Right Column: Profile Image Card */}
        <div className="lg:col-span-5 relative hidden lg:block h-full min-h-[500px]">
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full max-w-[420px] aspect-[4/5]">
                 <div className="relative w-full h-full bg-[#1C1C1E] dark:bg-[#F5F0E8] overflow-hidden rounded-[3.5rem] shadow-2xl transition-transform hover:scale-[1.01] z-10 border border-white/5 dark:border-black/5">
                    {profileImage ? (
                      <Image 
                        src={profileImage} 
                        alt={name} 
                        fill 
                        className="object-contain p-4 transition-transform duration-500 scale-[1.1] hover:scale-[1.15]"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">👋</div>
                    )}
                    
                    {/* Decorative Floating Status */}
                    <div className="absolute top-8 right-8 bg-white/80 dark:bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 shadow-xl z-20">
                       <div className="text-[9px] font-black uppercase tracking-widest text-foreground flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Available
                       </div>
                    </div>
                 </div>
                 
                 {/* Background accent */}
                 <div className="absolute -top-6 -right-6 w-full h-full border-2 border-art-yellow rounded-[4rem] -z-10 opacity-20" />
              </div>
           </div>
        </div>
      </div>

      {/* Education & Experience Section */}
      <section className="mb-32 px-6 lg:px-0">
        <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
           <div>
              <div className="art-badge-yellow text-[9px] px-3 py-1 mb-4 rounded-sm inline-block">PATHWAY</div>
              <h2 className="text-4xl lg:text-5xl font-black text-foreground uppercase leading-[0.9] tracking-tighter">
                 Education &<br/>
                 <span className="text-zinc-400 dark:text-zinc-600">Experience</span>
              </h2>
           </div>
           <Link href="/credentials" className="group text-[10px] font-black uppercase underline decoration-2 underline-offset-4 hover:text-art-blue transition-colors flex items-center gap-2">
              VIEW FULL CREDENTIALS <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
           {/* Experience column */}
           <div className="space-y-6">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-8 flex items-center gap-3">
                 <Briefcase className="w-4 h-4 text-art-blue" /> Professional Journey
              </h3>
              <div className="space-y-4">
                 {experience.length > 0 ? experience.map((exp) => (
                    <div key={exp._id} className="art-card bg-white dark:bg-zinc-900/40 border-border dark:border-zinc-800 p-8 rounded-[2.5rem] hover:border-art-blue transition-all group">
                       <div className="flex justify-between items-start mb-4">
                          <span className="text-[9px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">{exp.duration}</span>
                          <div className="w-2 h-2 rounded-full bg-art-blue opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                       </div>
                       <h4 className="text-2xl font-black text-foreground mb-1 tracking-tight">{exp.role}</h4>
                       <p className="text-sm font-bold text-art-blue uppercase tracking-widest">{exp.company}</p>
                    </div>
                 )) : (
                    <div className="p-8 border-2 border-dashed border-border rounded-[2.5rem] text-center text-zinc-400 text-xs font-bold uppercase">No experience logged</div>
                 )}
              </div>
           </div>

           {/* Education column */}
           <div className="space-y-6">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-8 flex items-center gap-3">
                 <GraduationCap className="w-4 h-4 text-art-yellow" /> Academic Pathway
              </h3>
              <div className="space-y-4">
                 {education.length > 0 ? education.map((edu) => (
                    <div key={edu._id} className="art-card bg-white dark:bg-zinc-900/40 border-border dark:border-zinc-800 p-8 rounded-[2.5rem] hover:border-art-yellow transition-all group">
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-[9px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">{edu.startYear} — {edu.endYear}</span>
                          <div className="w-2 h-2 rounded-full bg-art-yellow opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_rgba(253,224,71,0.5)]" />
                       </div>
                       <h4 className="text-2xl font-black text-foreground mb-1 tracking-tight">{edu.degree}</h4>
                       <p className="text-sm font-bold text-art-yellow uppercase tracking-widest">{edu.institution}</p>
                    </div>
                 )) : (
                    <div className="p-8 border-2 border-dashed border-border rounded-[2.5rem] text-center text-zinc-400 text-xs font-bold uppercase">No education logged</div>
                 )}
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
