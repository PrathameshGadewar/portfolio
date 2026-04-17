"use client";

import { useEffect, useState } from "react";
import { Users, Briefcase, Server, GraduationCap, Award, Mail, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Stats {
  projects: number;
  experiences: number;
  services: number;
  educations: number;
  certifications: number;
  messages: number;
  skills: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    experiences: 0,
    services: 0,
    educations: 0,
    certifications: 0,
    messages: 0,
    skills: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [projects, experiences, services, educations, certifications, messages, skills] =
          await Promise.all([
            fetch("/api/portfolio/project").then((r) => r.json()),
            fetch("/api/portfolio/experience").then((r) => r.json()),
            fetch("/api/portfolio/service").then((r) => r.json()),
            fetch("/api/portfolio/education").then((r) => r.json()),
            fetch("/api/portfolio/certification").then((r) => r.json()),
            fetch("/api/portfolio/message").then((r) => r.json()),
            fetch("/api/portfolio/skill").then((r) => r.json()),
          ]);

        setStats({
          projects: Array.isArray(projects) ? projects.length : 0,
          experiences: Array.isArray(experiences) ? experiences.length : 0,
          services: Array.isArray(services) ? services.length : 0,
          educations: Array.isArray(educations) ? educations.length : 0,
          certifications: Array.isArray(certifications) ? certifications.length : 0,
          messages: Array.isArray(messages) ? messages.length : 0,
          skills: Array.isArray(skills) ? skills.length : 0,
        });
      } catch (err) {
        console.error("Failed to load stats:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const statCards = [
    { title: "Projects", value: stats.projects, icon: Briefcase, color: "bg-blue-50 text-blue-600", href: "/admin/project" },
    { title: "Experience", value: stats.experiences, icon: Users, color: "bg-purple-50 text-purple-600", href: "/admin/experience" },
    { title: "Services", value: stats.services, icon: Server, color: "bg-orange-50 text-orange-600", href: "/admin/service" },
    { title: "Education", value: stats.educations, icon: GraduationCap, color: "bg-green-50 text-green-600", href: "/admin/education" },
    { title: "Certifications", value: stats.certifications, icon: Award, color: "bg-yellow-50 text-yellow-600", href: "/admin/certification" },
    { title: "Skills", value: stats.skills, icon: TrendingUp, color: "bg-teal-50 text-teal-600", href: "/admin/skill" },
    { title: "Messages", value: stats.messages, icon: Mail, color: "bg-red-50 text-red-600", href: "/admin/message" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's an overview of your portfolio content.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={stat.href} className="block">
              <div className="p-6 bg-white rounded-2xl border border-gray-100 flex items-center gap-5 shadow-sm hover:shadow-md hover:border-gray-200 transition-all group">
                <div className={`p-3.5 rounded-xl ${stat.color} shrink-0`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                  {loading ? (
                    <div className="h-8 w-12 bg-gray-100 animate-pulse rounded mt-1" />
                  ) : (
                    <p className="text-3xl font-bold text-gray-900 group-hover:text-black transition-colors">
                      {stat.value}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Add Project", href: "/admin/project" },
            { label: "Add Experience", href: "/admin/experience" },
            { label: "Add Skill", href: "/admin/skill" },
            { label: "View Messages", href: "/admin/message" },
            { label: "Edit Profile", href: "/admin/profile" },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
