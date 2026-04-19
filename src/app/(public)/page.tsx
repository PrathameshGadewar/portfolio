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
    <div className="max-w-7xl mx-auto px-6">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[70vh]">
        <div className="lg:col-span-12">
           <div className="mb-6">
              <div className="art-badge">
                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                 AVAILABLE FOR WORK
              </div>
           </div>
           
           <h1 className="editorial-title text-white mb-8">
              HELLO, I'M<br />
              <span className="text-white drop-shadow-sm">{name}</span>
           </h1>
           
           <p className="text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed">
              {bio}
           </p>
           
           <div className="flex flex-wrap gap-4 mb-20">
              <Link href="/projects" className="btn-primary">View Projects</Link>
              <button onClick={() => setIsResumeOpen(true)} className="btn-outline flex items-center gap-2">
                 Download CV <ArrowUpRight className="w-4 h-4" />
              </button>
           </div>
           
           <div className="flex items-center gap-6">
              <span className="text-sm font-bold text-zinc-500">Connect:</span>
              <div className="flex gap-4">
                 {profile?.linkedin && (
                   <a href={profile.linkedin} target="_blank" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white transition-all">
                     in
                   </a>
                 )}
                 {profile?.github && (
                   <a href={profile.github} target="_blank" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white transition-all">
                     gh
                   </a>
                 )}
              </div>
           </div>
        </div>
      </div>

      {/* Floating Image element like in screenshot */}
      <div className="fixed top-1/2 right-[10%] -translate-y-1/2 w-[350px] aspect-square -z-10 opacity-30 pointer-events-none hidden lg:block">
         <div className="relative w-full h-full bg-zinc-900 overflow-hidden rounded-2xl">
            {profileImage ? (
              <Image src={profileImage} alt={name} fill className="object-cover grayscale" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl font-black text-white/5">PG</div>
            )}
            <div className="absolute top-4 right-4 bg-zinc-800/80 backdrop-blur-md p-4 rounded-xl border border-zinc-700">
               <div className="text-lg font-black text-white leading-none mb-1">Full Stack</div>
               <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">2+ yrs exp.</div>
            </div>
         </div>
      </div>
    </div>
  );
}
