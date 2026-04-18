"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Send, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

interface Profile {
  email?: string;
  github?: string;
  linkedin?: string;
  phone?: string;
  location?: string;
}

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

  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: profile?.email || "hello@prathamesh.dev",
      href: `mailto:${profile?.email || "hello@prathamesh.dev"}`,
      color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "India",
      href: null,
      color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
    },
  ];

  const socialLinks = [
    { icon: ExternalLink, href: profile?.github || "", label: "GitHub" },
    { icon: ExternalLink, href: profile?.linkedin || "", label: "LinkedIn" },
  ].filter((s) => s.href && s.href !== "");

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-white/60 dark:bg-white/10 rounded-xl border border-white/40 shadow-sm">
          <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Contact</h1>
          <p className="text-gray-500 dark:text-white/40">Let's build something great together.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="md:col-span-1 space-y-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-card p-6 space-y-4"
          >
            <h3 className="font-bold text-lg text-gray-900 dark:text-white border-b border-gray-100 dark:border-white/10 pb-4">
              Contact Info
            </h3>

            {contactItems.map((item) => (
              <div key={item.label} className="flex items-center gap-4 text-gray-600 dark:text-white/50">
                <div className={`p-3 rounded-full ${item.color}`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <div className="text-sm break-all">
                  <p className="text-gray-400 dark:text-white/30 text-xs font-semibold uppercase tracking-wider mb-0.5">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a href={item.href} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p>{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6"
            >
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Connect</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100/50 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-white/40 dark:border-white/10 rounded-full text-sm font-medium text-gray-700 dark:text-white/60 transition-colors"
                  >
                    <social.icon className="w-4 h-4" />
                    {social.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-2 glass-card p-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Send a Message</h2>

          {success ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-6 rounded-2xl border border-green-200 dark:border-green-800/30 text-center"
            >
              <div className="text-2xl mb-2">🎉</div>
              <p className="font-semibold">Message sent successfully!</p>
              <p className="text-sm mt-1 opacity-80">I'll get back to you as soon as possible.</p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-4 text-sm underline opacity-60 hover:opacity-100"
              >
                Send another
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 dark:text-white/60 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-white/50 dark:bg-white/5 border border-white/60 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500/50 transition-all shadow-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 dark:text-white/60 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-white/50 dark:bg-white/5 border border-white/60 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500/50 transition-all shadow-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 dark:text-white/60 mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/50 dark:bg-white/5 border border-white/60 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500/50 transition-all shadow-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 resize-none"
                  placeholder="How can I help you?"
                />
              </div>

              <button
                id="contact-submit-btn"
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3.5 bg-gray-900 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 font-semibold disabled:opacity-50 text-sm"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
