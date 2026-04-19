"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Send, ExternalLink, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

interface Profile {
  email?: string;
  github?: string;
  linkedin?: string;
  phone?: string;
  location?: string;
}

const SectionLabel = ({ children, color = "blue" }: { children: React.ReactNode; color?: "blue" | "yellow" }) => (
  <div className={`inline-block px-3 py-1 border-2 border-art-dark text-[10px] font-black tracking-widest uppercase mb-4 shadow-[2px_2px_0px_#1e293b] ${color === 'yellow' ? 'bg-art-yellow' : 'bg-art-blue text-white'}`}>
    {children}
  </div>
);

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    fetch("/api/portfolio/profile")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setProfile(data[0]);
      })
      .catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/portfolio/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) setSuccess(true);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-16">
        <div className="art-badge-yellow text-[9px] px-3 py-1 mb-6 rounded-sm inline-block">INQUIRIES</div>
        <h1 className="editorial-title mb-8">
          <span className="block text-foreground">GET IN</span>
          <span className="block text-art-blue dark:text-blue-500">TOUCH</span>
        </h1>
        <p className="text-zinc-400 font-bold text-[10px] uppercase tracking-[0.2em] italic">"Collaborations, opportunities, or just a friendly hello."</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-32">
        {/* Contact info column */}
        <div className="lg:col-span-5 space-y-16">
            <div className="art-card bg-white/50 dark:bg-zinc-900/50 border-border dark:border-zinc-800 p-10 rounded-[2.5rem]">
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-8">Direct Communication</h2>
                <div className="flex flex-col gap-6">
                    <a href={`mailto:${profile?.email}`} className="text-3xl font-black text-foreground hover:text-blue-500 transition-colors break-all leading-none">{profile?.email?.toUpperCase()}</a>
                    <p className="text-xs font-medium text-zinc-500 uppercase tracking-tighter leading-relaxed">
                       {profile?.location || "INDIA-BASED / WORLDWIDE-REACH"}
                    </p>
                </div>
            </div>

            <div className="art-card bg-black text-white dark:bg-zinc-900 border-none p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-art-yellow/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
                
                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 opacity-50 relative z-10 flex items-center gap-2">
                   <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" /> Urgent_Contact
                </p>
                <p className="text-2xl font-black leading-[1.05] uppercase italic mb-12 relative z-10 tracking-tighter">
                   "Response times vary between 2-24 hours depending on the current development cycle."
                </p>
                
                <div className="flex gap-4 relative z-10">
                   {profile?.linkedin && (
                     <a href={profile.linkedin} target="_blank" className="w-14 h-14 rounded-3xl bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                     </a>
                   )}
                   {profile?.github && (
                     <a href={profile.github} target="_blank" className="w-14 h-14 rounded-3xl bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                     </a>
                   )}
                </div>
            </div>
        </div>

        {/* Form column */}
        <div className="lg:col-span-7">
            <div className="art-card bg-white dark:bg-zinc-900/50 border-border dark:border-zinc-800 p-12 rounded-[3rem] shadow-sm relative overflow-hidden">
                {success ? (
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="py-20 text-center"
                    >
                        <h3 className="text-5xl font-black text-foreground uppercase mb-6 leading-none">Message<br/>Logged</h3>
                        <p className="text-sm font-medium text-zinc-400 uppercase tracking-widest max-w-xs mx-auto">The system has recorded your inquiry. Expect a response shortly.</p>
                        <button onClick={() => setSuccess(false)} className="mt-12 group flex items-center gap-2 mx-auto text-[10px] font-black underline uppercase hover:text-blue-500 transition-colors">SEND ANOTHER LOG <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /></button>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Full_Name</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    required 
                                    placeholder="Enter your name"
                                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-border dark:border-zinc-800 rounded-2xl focus:border-art-blue dark:focus:border-blue-500 outline-none px-6 py-4 text-sm font-bold transition-all"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Email_Address</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    required 
                                    placeholder="Enter your email"
                                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-border dark:border-zinc-800 rounded-2xl focus:border-art-blue dark:focus:border-blue-500 outline-none px-6 py-4 text-sm font-bold transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Message_Payload</label>
                            <textarea 
                                name="message" 
                                required 
                                rows={5} 
                                placeholder="Describe your project or inquiry..."
                                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-border dark:border-zinc-800 rounded-3xl focus:border-art-blue dark:focus:border-blue-500 outline-none px-6 py-6 text-sm font-bold transition-all resize-none"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="btn-primary group flex items-center gap-3 px-12 py-4 rounded-2xl shadow-xl hover:scale-105 active:scale-95 disabled:opacity-50"
                            >
                                {loading ? "PROCESSING..." : "TRANSMIT MESSAGE"}
                                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
