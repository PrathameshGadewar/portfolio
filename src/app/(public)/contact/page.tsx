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
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
      <div className="mb-16">
        <SectionLabel color="blue">Inquiries</SectionLabel>
        <h1 className="editorial-title text-art-dark dark:text-white">GET IN<br/><span className="text-art-blue">TOUCH</span></h1>
        <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest italic">"Collaborations, opportunities, or just a friendly hello."</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact info column */}
        <div className="lg:col-span-4 space-y-12">
            <div>
                <h2 className="text-xs font-black uppercase tracking-widest text-art-blue mb-4">Direct Communication</h2>
                <div className="flex flex-col gap-4">
                    <a href={`mailto:${profile?.email}`} className="text-2xl font-black hover:text-art-blue transition-colors break-words">{profile?.email?.toUpperCase()}</a>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">{profile?.location || "INDIA-BASED / WORLDWIDE-REACH"}</span>
                </div>
            </div>

            <div>
                <h2 className="text-xs font-black uppercase tracking-widest text-art-yellow mb-4">Social Network</h2>
                <div className="flex flex-col gap-3 font-black text-sm uppercase">
                    {profile?.github && <a href={profile.github} target="_blank" className="flex items-center gap-2 hover:translate-x-1 transition-transform">GITHUB <ArrowRight className="w-3 h-3" /></a>}
                    {profile?.linkedin && <a href={profile.linkedin} target="_blank" className="flex items-center gap-2 hover:translate-x-1 transition-transform">LINKEDIN <ArrowRight className="w-3 h-3" /></a>}
                </div>
            </div>

            <div className="art-card bg-art-dark text-white shadow-none">
                <p className="text-[10px] font-black uppercase mb-4 text-art-yellow">Urgent_Contact</p>
                <p className="text-xs font-bold leading-loose uppercase italic opacity-60">"Response times vary between 2-24 hours depending on the current development cycle."</p>
            </div>
        </div>

        {/* Form column */}
        <div className="lg:col-span-8">
            <div className="art-card relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-art-blue/5 rounded-bl-full -z-10" />
                
                {success ? (
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="py-20 text-center"
                    >
                        <SectionLabel color="yellow">Success</SectionLabel>
                        <h3 className="text-4xl font-black uppercase mb-4">Message<br/>Logged</h3>
                        <p className="text-xs font-bold text-gray-400 uppercase">THE SYSTEM HAS RECORDED YOUR INQUIRY. EXPECT A RESPONSE SHORTLY.</p>
                        <button onClick={() => setSuccess(false)} className="mt-8 text-[10px] font-black underline uppercase">SEND ANOTHER LOG</button>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Full_Name</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    required 
                                    placeholder="ENTER_NAME"
                                    className="w-full bg-transparent border-b-2 border-art-dark/10 focus:border-art-blue outline-none py-2 text-sm font-bold uppercase transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email_Address</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    required 
                                    placeholder="ENTER_EMAIL"
                                    className="w-full bg-transparent border-b-2 border-art-dark/10 focus:border-art-blue outline-none py-2 text-sm font-bold transition-colors"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Message_Payload</label>
                            <textarea 
                                name="message" 
                                required 
                                rows={6} 
                                placeholder="TYPE_YOUR_MESSAGE_HERE..."
                                className="w-full bg-transparent border-b-2 border-art-dark/10 focus:border-art-blue outline-none py-2 text-sm font-bold uppercase transition-colors resize-none"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="art-accent-blue px-10 py-3 text-xs font-black uppercase tracking-widest hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_#1e293b] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all disabled:opacity-50"
                            >
                                {loading ? "PROCESSING..." : "TRANSMIT MESSAGE"}
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
