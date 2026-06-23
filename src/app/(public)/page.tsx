"use client";

import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
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
  overview?: string;
  location?: string;
}

interface Education {
  _id: string;
  degree: string;
  institution: string;
  specialization?: string;
  startYear?: string;
  endYear?: string;
  score?: string;
  logo?: string;
}

interface Experience {
  _id: string;
  role: string;
  company: string;
  duration: string;
  description?: string;
  status?: string;
}

interface Certification {
  _id: string;
  title: string;
  organization: string;
  year?: string;
  link?: string;
  image?: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  liveLink?: string;
  githubLink?: string;
  category?: string;
}

interface Skill {
  _id: string;
  category: string;
  name: string;
}

interface Service {
  _id: string;
  title: string;
  description: string;
}

const defaultProjects: Project[] = [
  {
    _id: "proj-1",
    title: "Smart Guide",
    description: "An interactive driving-coach dashboard that analyses driver behaviour in real time and surfaces actionable coaching cues — the basis for a published research paper.",
    tags: ["Python", "ML", "Dashboard UI"],
    category: "AI / ML · Embedded Dashboard"
  },
  {
    _id: "proj-2",
    title: "Emotion Detection & Music Recommendation",
    description: "Real-time facial emotion recognition paired with a recommendation engine that curates music to match detected mood.",
    tags: ["CNN", "OpenCV", "Python"],
    category: "AI / ML · Computer Vision"
  },
  {
    _id: "proj-3",
    title: "AI Interview Simulator",
    description: "An AI-driven mock interview platform that asks role-specific questions, evaluates responses, and gives structured feedback.",
    tags: ["NLP", "LLM API", "React"],
    category: "AI / ML · NLP"
  },
  {
    _id: "proj-4",
    title: "TripZila",
    description: "A full-featured travel discovery and booking platform with itinerary planning, listings, and a responsive booking flow.",
    tags: ["JavaScript", "HTML/CSS", "REST API"],
    category: "Web · Full-Stack Platform"
  },
  {
    _id: "proj-5",
    title: "AI Supply Chain Dashboard",
    description: "A predictive analytics dashboard for supply-chain visibility — demand forecasting, bottleneck detection, and inventory insights.",
    tags: ["Python", "Data Viz", "SQL"],
    category: "Data · Analytics Dashboard"
  }
];

const defaultExp: Experience[] = [
  {
    _id: "exp-1",
    role: "AI Intern",
    company: "Infosys Springboard",
    duration: "Internship",
    description: "Worked on applied machine learning tasks — data preprocessing, model training, and evaluation — within a structured industry internship program."
  },
  {
    _id: "exp-2",
    role: "Web Development Intern",
    company: "—",
    duration: "Internship",
    description: "Built and shipped responsive front-end features, collaborated on full-stack functionality, and contributed to production-ready web applications."
  },
  {
    _id: "exp-3",
    role: "Research Project — Smart Guide",
    company: "IIT Internship",
    duration: "Research",
    description: "Contributed to a research-driven internship on driver-assistance systems, culminating in a published paper and patent application."
  },
  {
    _id: "exp-4",
    role: "Innovation Council Activities",
    company: "Institute Innovation Council",
    duration: "Leadership",
    description: "Organised and participated in innovation challenges, hackathons, and ideation sessions promoting student research and entrepreneurship."
  }
];

const defaultEdu: Education[] = [
  {
    _id: "edu-1",
    degree: "B.Tech, Computer Science & Engineering",
    institution: "Lovely Professional University",
    startYear: "2025",
    endYear: "Present",
    specialization: "Focused coursework in machine learning, data structures, and software engineering, alongside independent research projects."
  },
  {
    _id: "edu-2",
    degree: "Diploma in Computer Engineering",
    institution: "G.H. Raisoni Polytechnic, Nagpur",
    startYear: "2022",
    endYear: "2025",
    specialization: "Built foundations in programming, systems, and engineering practice.",
    score: "87.89%"
  },
  {
    _id: "edu-3",
    degree: "School Education",
    institution: "Giants English Medium School",
    startYear: "2011",
    endYear: "2022",
    specialization: "Foundational schooling that shaped early interest in mathematics and computing."
  }
];

const defaultSkills: Skill[] = [
  { _id: "sk-1", category: "Programming", name: "Python" },
  { _id: "sk-2", category: "Programming", name: "C++" },
  { _id: "sk-3", category: "Programming", name: "Java" },
  { _id: "sk-4", category: "Programming", name: "SQL" },
  { _id: "sk-5", category: "Programming", name: "HTML / CSS / JavaScript" },
  { _id: "sk-6", category: "AI & ML", name: "Machine Learning" },
  { _id: "sk-7", category: "AI & ML", name: "Deep Learning" },
  { _id: "sk-8", category: "AI & ML", name: "NLP" },
  { _id: "sk-9", category: "AI & ML", name: "Data Science" },
  { _id: "sk-10", category: "Tools", name: "Git" },
  { _id: "sk-11", category: "Tools", name: "GitHub" },
  { _id: "sk-12", category: "Tools", name: "VS Code" },
  { _id: "sk-13", category: "Tools", name: "Jupyter" },
  { _id: "sk-14", category: "Tools", name: "Google Colab" }
];

const defaultServices: Service[] = [
  { _id: "srv-1", title: "AI / ML Development", description: "Designing, training, and deploying machine learning models for real-world problems." },
  { _id: "srv-2", title: "Data Analytics", description: "Turning raw data into dashboards and insights that support real decisions." },
  { _id: "srv-3", title: "Web Development", description: "Building responsive, production-ready web applications end to end." },
  { _id: "srv-4", title: "Research & Innovation", description: "Framing research questions, running experiments, and writing up findings." },
  { _id: "srv-5", title: "Technical Consulting", description: "Advising on architecture, tooling, and feasibility for AI-driven products." },
  { _id: "srv-6", title: "UI / UX Design", description: "Designing clean, usable interfaces for technical and consumer products." }
];

const defaultCerts: Certification[] = [
  { _id: "c-1", title: "AI Internship", organization: "Infosys Springboard", year: "Featured" },
  { _id: "c-2", title: "Research Internship", organization: "Indian Institute of Technology (IIT)", year: "Featured" },
  { _id: "c-3", title: "Machine Learning Specialisation", organization: "Add issuing platform", year: "Add date" },
  { _id: "c-4", title: "Cloud Fundamentals", organization: "Add issuing platform", year: "Add date" },
  { _id: "c-5", title: "Python / Java / C++ Certification", organization: "Add issuing platform", year: "Add date" },
  { _id: "c-6", title: "Hackathon Achievement", organization: "Add event name", year: "Add date" }
];

// Helper Component for Stats Counter
const StatCounter = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const stepTime = Math.abs(Math.floor(duration / Math.max(target, 1)));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{count}</span>;
};

// Helper Component for Skill progress bar
const SkillBar = ({ name, targetFill }: { name: string; targetFill: number }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setWidth(targetFill);
        }
      });
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [targetFill]);

  return (
    <div ref={ref} className="skill-row">
      <div className="skill-row-top">
        <span>{name}</span>
        <span>{targetFill}%</span>
      </div>
      <div className="skill-bar-track">
        <div 
          className="skill-bar-fill" 
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

export default function HomePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [education, setEducation] = useState<Education[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedCertImage, setSelectedCertImage] = useState<string | null>(null);

  // Filters State
  const [projectFilter, setProjectFilter] = useState("all");
  const [certFilter, setCertFilter] = useState("all");

  // Nav scroll and mobile menu state
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Contact form submission state
  const [formStatus, setFormStatus] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  // Refs for canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Theme support
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch data
  useEffect(() => {
    Promise.all([
      fetch("/api/portfolio/profile").then((r) => r.json()).catch(() => null),
      fetch("/api/portfolio/education").then((r) => r.json()).catch(() => []),
      fetch("/api/portfolio/experience").then((r) => r.json()).catch(() => []),
      fetch("/api/portfolio/project").then((r) => r.json()).catch(() => []),
      fetch("/api/portfolio/certification").then((r) => r.json()).catch(() => []),
      fetch("/api/portfolio/service").then((r) => r.json()).catch(() => []),
      fetch("/api/portfolio/skill").then((r) => r.json()).catch(() => [])
    ])
      .then(([profileData, eduData, expData, projData, certData, servData, skillData]) => {
        if (Array.isArray(profileData) && profileData.length > 0) {
          setProfile(profileData[0]);
        } else if (profileData && !Array.isArray(profileData)) {
          setProfile(profileData);
        }
        if (Array.isArray(eduData)) setEducation(eduData);
        if (Array.isArray(expData)) setExperience(expData);
        if (Array.isArray(projData)) setProjects(projData);
        if (Array.isArray(certData)) setCertifications(certData);
        if (Array.isArray(servData)) setServices(servData);
        if (Array.isArray(skillData)) setSkills(skillData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Active scroll section and scroll progress indicator
  useEffect(() => {
    const handleScroll = () => {
      // Header background switch
      setScrolled(window.scrollY > 20);

      // Scroll progress
      const scrollProgress = document.getElementById("scroll-progress");
      if (scrollProgress) {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
        scrollProgress.style.width = `${progress}%`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for active section highlighting and reveals
  useEffect(() => {
    if (loading) return;

    const sections = ["home", "credentials", "projects", "experience", "education", "certifications", "publications", "patents", "services", "skills", "contact"];
    
    // Observer for Active Navigation Section
    const activeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0
    });

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) activeObserver.observe(el);
    });

    // Observer for scroll reveal animations
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
        }
      });
    }, { threshold: 0.1 });

    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach((el) => revealObserver.observe(el));

    return () => {
      activeObserver.disconnect();
      revealObserver.disconnect();
    };
  }, [loading]);

  // Particle background rendering logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const activeTheme = resolvedTheme || theme || "dark";

    const init = () => {
      particles = [];
      const count = Math.min(Math.floor(canvas.width / 15), 100);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.5 + 0.5,
        });
      }
    };
    init();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx = -p.vx;
        if (p.y < 0 || p.y > canvas.height) p.vy = -p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = activeTheme === 'dark' ? 'rgba(176,141,87,0.15)' : 'rgba(176,141,87,0.3)';
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [resolvedTheme, theme]);

  // Form submission handler
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    setFormStatus("");

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
      if (res.ok) {
        setFormStatus("Message transmitted successfully!");
        (e.target as HTMLFormElement).reset();
      } else {
        const err = await res.json();
        setFormStatus(`Error: ${err.message || "Failed to deliver message."}`);
      }
    } catch (err) {
      console.error(err);
      setFormStatus("Network connection error. Try again.");
    } finally {
      setFormLoading(false);
    }
  };

  // Merging database items with static HTML layout items
  const displayProjects = [...projects, ...defaultProjects.filter(dp => !projects.some(p => p.title.toLowerCase() === dp.title.toLowerCase()))];
  const displayExp = [...experience, ...defaultExp.filter(de => !experience.some(e => e.role.toLowerCase() === de.role.toLowerCase()))];
  const displayEdu = [...education, ...defaultEdu.filter(de => !education.some(e => e.degree.toLowerCase() === de.degree.toLowerCase()))];
  const displaySkills = [...skills, ...defaultSkills.filter(ds => !skills.some(s => s.name.toLowerCase() === ds.name.toLowerCase()))];
  const displayServices = [...services, ...defaultServices.filter(ds => !services.some(s => s.title.toLowerCase() === ds.title.toLowerCase()))];
  const displayCerts = [...certifications, ...defaultCerts.filter(dc => !certifications.some(c => c.title.toLowerCase() === dc.title.toLowerCase()))];

  // Filtering projects
  const filteredProjects = projectFilter === "all"
    ? displayProjects
    : displayProjects.filter(p => {
        const cat = p.category?.toLowerCase() || "";
        const tagsStr = p.tags.join(" ").toLowerCase();
        return cat.includes(projectFilter) || tagsStr.includes(projectFilter);
      });

  // Filtering certifications
  const filteredCerts = certFilter === "all"
    ? displayCerts
    : displayCerts.filter(c => {
        const details = (c.title + " " + (c.organization || "")).toLowerCase();
        if (certFilter === "ai") return details.includes("ai") || details.includes("machine learning") || details.includes("intelligence");
        if (certFilter === "cloud") return details.includes("cloud") || details.includes("aws") || details.includes("azure") || details.includes("gcp");
        if (certFilter === "prog") return details.includes("python") || details.includes("java") || details.includes("c++") || details.includes("javascript") || details.includes("programming");
        if (certFilter === "intern") return details.includes("intern");
        if (certFilter === "comp") return details.includes("hackathon") || details.includes("competition") || details.includes("achievement");
        return true;
      });

  const activeThemeToggle = () => {
    if (!mounted) return;
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const navScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileNavOpen(false);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <a href="#home" className="skip-link">Skip to content</a>
      <div id="scroll-progress"></div>

      <header className={`port-header ${scrolled ? "scrolled" : ""}`} id="site-header">
        <nav className="port-nav">
          <a href="#home" onClick={(e) => navScrollTo(e, "home")} className="logo">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAAmCAYAAACcRCiyAAADnUlEQVR4nO2XTYgcRRTHX310dff0zLhz0IOHTRA/DkEjXkwuKrh4MncVQVBZ9BhBCLJ7irkoIQhe9LCX4MFAUBI9iCbswYOCHgQDBnGFPYgYcGe3Z7q7uqpeeUg29NZ8bE9vz6rQv1v9+73/e2+6q6caoKGhoaGhoeH/CikTFETdtTJxRqtPdJ5dt9baWZrgwj/GRXCOEPpEUbdovlIyWzU6/3MWvzKUGjzs9DZns7WxTAYn0eidaVEijJYZFytlHFWWPKuV/HW2PiZD6zLaC+n4rc7PXATHJ0WE7YX1skMDAHhB65oIo+V6+pvb4Lfx/PAqZbzt6mF7YR0IeWBWP8bFigiiF+rordrg1m5kw50Hs0H/SDboH8nT4QmL5sq4UBG0PtqzDqPlCUNro/NVJdNTSqanjM5Xx/kxT7xHKfMr9V2g0h63aL7JhjuvunFcBMc9P7zq6mncXwSwQCnz/ag7sk+Nzt/N0+HH42oHUXeNULZU1FCr8zIdfFCm90nU+qjrPPvJIn7n6ozzHgCA54dvuNfQ6MuThgYAkEn8GgBgUaOMv3jQXvlBDVwQ9ZeMihNFjVL2sAH1/biGlUzemeZnrbVpvHWUEFLq6SxL7YMTIPe5mrX2b0IIAULu36vjDTQmLeM769lgP2p/q1PuvelqaPQmoazr6taY63XXL0utdzxo3/PFiKe1fyAaSRkP3HgL9q9xPiKMXmFcnJ1WSybxo2j0dtVeKw1OKFsqe5rTSp6pUmPezPUAg0ZfVjJdnxJy4P/jqsxtcDT6U5nEp3fXFjEeKU75kqsdFrV/pKDRl/JseMYi6jE+NwEgLGrZYPuotYhubBHu+Q95QetaUZNJfAyNHvkxy1Jpj1vEb7Ph9kuz5qHRn1HG9+R5Qfj6tAMMAADj3vOu1UGGBqj8qNusSpbOs/OuxrhY4SJ4fFIO4969lHuni5pF83WV+kXm+nJzMVrdsmg+d3XPD68EUXeNca9H7sC41wui7ocibP/oxiuZrTr5T4Wd3mbY6W2KIHq5TC+1fqSUKkgICdoLv0HFbXbnpfn27poyFvqt7s1ijJLJczqXv0zzOdQ7DnD76CmT+LGKyRvFoQEAGPNGvCjjT+5ndeiDAwCg0YM03loEa38vnaPVhXTQf2ZER7PhataYG/v5/SuD75IO+k/LZOcRNPrSpBjU6v003lqU6eDCuOtGq1tGybfuxht9UeXZD/Pot6GhoaGhoeG/wT9xwYRhSBFoYAAAAABJRU5ErkJggg==" alt="PG. — Prathamesh home" className="logo-img" />
          </a>
          <ul className="nav-links" id="nav-links">
            <li><a href="#home" onClick={(e) => navScrollTo(e, "home")} className={activeSection === "home" ? "active" : ""}>Home</a></li>
            <li><a href="#credentials" onClick={(e) => navScrollTo(e, "credentials")} className={activeSection === "credentials" ? "active" : ""}>Credentials</a></li>
            <li><a href="#projects" onClick={(e) => navScrollTo(e, "projects")} className={activeSection === "projects" ? "active" : ""}>Projects</a></li>
            <li><a href="#experience" onClick={(e) => navScrollTo(e, "experience")} className={activeSection === "experience" ? "active" : ""}>Experience</a></li>
            <li><a href="#education" onClick={(e) => navScrollTo(e, "education")} className={activeSection === "education" ? "active" : ""}>Education</a></li>
            <li><a href="#certifications" onClick={(e) => navScrollTo(e, "certifications")} className={activeSection === "certifications" ? "active" : ""}>Certifications</a></li>
            <li><a href="#publications" onClick={(e) => navScrollTo(e, "publications")} className={activeSection === "publications" ? "active" : ""}>Publications</a></li>
            <li><a href="#patents" onClick={(e) => navScrollTo(e, "patents")} className={activeSection === "patents" ? "active" : ""}>Patents</a></li>
            <li><a href="#services" onClick={(e) => navScrollTo(e, "services")} className={activeSection === "services" ? "active" : ""}>Services</a></li>
            <li><a href="#skills" onClick={(e) => navScrollTo(e, "skills")} className={activeSection === "skills" ? "active" : ""}>Skills</a></li>
            <li><a href="#contact" onClick={(e) => navScrollTo(e, "contact")} className={activeSection === "contact" ? "active" : ""}>Contact</a></li>
          </ul>
          <div className="nav-actions">
            <button className="theme-toggle" onClick={activeThemeToggle} id="theme-toggle" aria-label="Toggle light and dark mode">◐</button>
            <button className="menu-btn" onClick={() => setMobileNavOpen(true)} id="menu-btn" aria-label="Open menu">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>
      </header>

      <div className={`mobile-nav ${mobileNavOpen ? "open" : ""}`} id="mobile-nav">
        <button className="mobile-close" onClick={() => setMobileNavOpen(false)} id="mobile-close" aria-label="Close menu">×</button>
        <a href="#home" onClick={(e) => navScrollTo(e, "home")}>Home</a>
        <a href="#credentials" onClick={(e) => navScrollTo(e, "credentials")}>Credentials</a>
        <a href="#projects" onClick={(e) => navScrollTo(e, "projects")}>Projects</a>
        <a href="#experience" onClick={(e) => navScrollTo(e, "experience")}>Experience</a>
        <a href="#education" onClick={(e) => navScrollTo(e, "education")}>Education</a>
        <a href="#certifications" onClick={(e) => navScrollTo(e, "certifications")}>Certifications</a>
        <a href="#publications" onClick={(e) => navScrollTo(e, "publications")}>Publications</a>
        <a href="#patents" onClick={(e) => navScrollTo(e, "patents")}>Patents</a>
        <a href="#services" onClick={(e) => navScrollTo(e, "services")}>Services</a>
        <a href="#skills" onClick={(e) => navScrollTo(e, "skills")}>Skills</a>
        <a href="#contact" onClick={(e) => navScrollTo(e, "contact")}>Contact</a>
      </div>

      <main id="home">
        {/* ============ HERO ============ */}
        <section className="hero port-section">
          <canvas id="particles" ref={canvasRef}></canvas>
          <div className="port-container hero-inner">
            <div className="hero-text">
              <p className="eyebrow"><span className="num">VOL. I — ABSTRACT</span></p>
              <h1 className="port-h">Prathamesh<br /><em>Exploring Infinite Possibilities</em></h1>
              <p className="hero-role">{profile?.roles?.join(" — ") || "AI & Machine Learning Enthusiast — Researcher — Software Developer"}</p>
              <p className="hero-tagline">{profile?.bio || "Computer Science Engineering student building at the intersection of applied AI, data-driven products, and research — one experiment, one publication, one shipped project at a time."}</p>
              <div className="cta-row">
                <a href="#projects" onClick={(e) => navScrollTo(e, "projects")} className="btn btn-primary">View Projects</a>
                <button onClick={() => setIsResumeOpen(true)} className="btn btn-outline" id="resume-btn">Download Resume</button>
                <a href="#contact" onClick={(e) => navScrollTo(e, "contact")} className="btn btn-ghost">Contact Me →</a>
              </div>
            </div>
            <div className="hero-portrait">
              <div className="portrait-frame">
                {profile?.profileImage ? (
                  <img src={profile.profileImage} alt={profile?.name || "Prathamesh"} />
                ) : (
                  <div className="ph">PORTRAIT<br />placeholder — upload via<br />admin panel</div>
                )}
              </div>
              <div className="portrait-seal">EST.<br />RESEARCHER<br />2022—</div>
            </div>
          </div>
          <div className="scroll-cue"><span>SCROLL</span><span className="line"></span></div>
        </section>

        {/* ============ CREDENTIALS / MY JOURNEY (intro) ============ */}
        <section id="credentials" className="port-section">
          <div className="port-container">
            <p className="eyebrow reveal"><span className="num">§01</span> CREDENTIALS</p>
            <h2 className="section-title reveal port-h">My Journey</h2>
            <p className="section-sub reveal">{profile?.overview || "A short account of how a curiosity for machines that learn turned into a research and engineering practice."}</p>
            <div className="timeline">
              <div className="t-item reveal">
                <div className="t-dot"></div>
                <div className="t-date">Origin</div>
                <div className="t-title port-h">Where it started</div>
                <div className="t-desc">A fascination with how systems make decisions led me from writing first lines of code to designing models that learn from data — and from there, to asking harder questions about how AI should be built responsibly and usefully.</div>
              </div>
              <div className="t-item reveal">
                <div className="t-dot"></div>
                <div className="t-date">Focus</div>
                <div className="t-title port-h">What I work on</div>
                <div className="t-desc">Applied machine learning, intelligent dashboards, and human-centred AI products — translating research ideas into systems people can actually use, from driving-coach dashboards to emotion-aware recommenders.</div>
              </div>
              <div className="t-item reveal">
                <div className="t-dot"></div>
                <div className="t-date">Direction</div>
                <div className="t-title port-h">Where it's going</div>
                <div className="t-desc">Deepening research in applied ML and NLP while building production-grade software — with the goal of contributing original, published, and patentable work to the field.</div>
              </div>
            </div>
          </div>
        </section>

        <div className="port-container"><div className="divider-line"></div></div>

        {/* ============ PROJECTS ============ */}
        <section id="projects" className="section-alt port-section">
          <div className="port-container">
            <p className="eyebrow reveal"><span className="num">§02</span> SHOWCASE</p>
            <h2 className="section-title reveal port-h">Projects</h2>
            <p className="section-sub reveal">A selection of applied AI, web, and data systems — built, tested, and shipped.</p>

            <div className="filter-row reveal">
              <button onClick={() => setProjectFilter("all")} className={`filter-btn ${projectFilter === "all" ? "active" : ""}`}>All</button>
              <button onClick={() => setProjectFilter("ai")} className={`filter-btn ${projectFilter === "ai" ? "active" : ""}`}>AI / ML</button>
              <button onClick={() => setProjectFilter("web")} className={`filter-btn ${projectFilter === "web" ? "active" : ""}`}>Web</button>
              <button onClick={() => setProjectFilter("data")} className={`filter-btn ${projectFilter === "data" ? "active" : ""}`}>Data</button>
            </div>

            <div className="project-grid" id="project-grid">
              {filteredProjects.map((project, idx) => (
                <article key={project._id || idx} className="project-card reveal">
                  <div className="project-media">
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="glyph">
                        {project.title.toLowerCase().includes("music") || project.title.toLowerCase().includes("sound") ? "♪" : 
                         project.title.toLowerCase().includes("guide") || project.title.toLowerCase().includes("coach") ? "⌁" : 
                         project.title.toLowerCase().includes("interview") || project.title.toLowerCase().includes("chat") ? "⟡" : 
                         project.title.toLowerCase().includes("trip") || project.title.toLowerCase().includes("travel") ? "✈" : "⛓"}
                      </span>
                    )}
                  </div>
                  <div className="project-body">
                    <div className="project-cat">{project.category || "General Platform"}</div>
                    <h3 className="project-title port-h">{project.title}</h3>
                    <p className="project-desc">{project.description}</p>
                    <div className="stack-row">
                      {project.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="tag">{tag}</span>
                      ))}
                    </div>
                    <div className="project-links">
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer">↗ GitHub</a>
                      )}
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer">↗ Live Demo</a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ EXPERIENCE ============ */}
        <section id="experience" className="port-section">
          <div className="port-container">
            <p className="eyebrow reveal"><span className="num">§03</span> MY JOURNEY</p>
            <h2 className="section-title reveal port-h">Experience</h2>
            <p className="section-sub reveal">Internships, research, and leadership — in chronological order.</p>

            <div className="timeline">
              {displayExp.map((exp, idx) => (
                <div key={exp._id || idx} className="t-item reveal">
                  <div className="t-dot"></div>
                  <div className="t-date">{exp.duration}</div>
                  <div className="t-title port-h">{exp.role}</div>
                  <div className="t-org">{exp.company}</div>
                  <div className="t-desc">{exp.description}</div>
                </div>
              ))}
            </div>

            <div className="stat-row">
              <div className="stat reveal">
                <div className="stat-num">
                  <StatCounter target={projects.length > 0 ? projects.length : 5} />
                </div>
                <div className="stat-label">Projects shipped</div>
              </div>
              <div className="stat reveal">
                <div className="stat-num">
                  <StatCounter target={experience.length > 0 ? experience.length : 2} />
                </div>
                <div className="stat-label">Internships completed</div>
              </div>
              <div className="stat reveal">
                <div className="stat-num"><StatCounter target={1} /></div>
                <div className="stat-label">Publication</div>
              </div>
              <div className="stat reveal">
                <div className="stat-num">
                  <StatCounter target={certifications.length > 0 ? certifications.length : 10} />
                </div>
                <div className="stat-label">Certifications</div>
              </div>
            </div>
          </div>
        </section>

        <div className="port-container"><div className="divider-line"></div></div>

        {/* ============ EDUCATION ============ */}
        <section id="education" className="section-alt port-section">
          <div className="port-container">
            <p className="eyebrow reveal"><span className="num">§04</span> ACADEMICS</p>
            <h2 className="section-title reveal port-h">Education</h2>
            <p className="section-sub reveal">Academic record and milestones.</p>

            <div className="timeline">
              {displayEdu.map((edu, idx) => (
                <div key={edu._id || idx} className="t-item reveal">
                  <div className="t-dot"></div>
                  <div className="t-date">{edu.startYear} — {edu.endYear}</div>
                  <div className="t-title port-h">{edu.degree}</div>
                  <div className="t-org">{edu.institution}</div>
                  <div className="t-desc">{edu.specialization || "Engineering course curriculum"}</div>
                  {edu.score && (
                    <div className="edu-meta">
                      <span>Score: {edu.score}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CERTIFICATIONS ============ */}
        <section id="certifications" className="port-section">
          <div className="port-container">
            <p className="eyebrow reveal"><span className="num">§05</span> AWARDS</p>
            <h2 className="section-title reveal port-h">Certifications &amp; Achievements</h2>
            <p className="section-sub reveal">Credentials across AI/ML, cloud, programming, internships, and competitions.</p>

            <div className="cert-tabs reveal">
              <button onClick={() => setCertFilter("all")} className={`filter-btn ${certFilter === "all" ? "active" : ""}`}>All</button>
              <button onClick={() => setCertFilter("ai")} className={`filter-btn ${certFilter === "ai" ? "active" : ""}`}>AI &amp; ML</button>
              <button onClick={() => setCertFilter("cloud")} className={`filter-btn ${certFilter === "cloud" ? "active" : ""}`}>Cloud</button>
              <button onClick={() => setCertFilter("prog")} className={`filter-btn ${certFilter === "prog" ? "active" : ""}`}>Programming</button>
              <button onClick={() => setCertFilter("intern")} className={`filter-btn ${certFilter === "intern" ? "active" : ""}`}>Internships</button>
              <button onClick={() => setCertFilter("comp")} className={`filter-btn ${certFilter === "comp" ? "active" : ""}`}>Competitions</button>
            </div>

            <div className="cert-grid" id="cert-grid">
              {filteredCerts.map((cert, idx) => (
                <div 
                  key={cert._id || idx} 
                  onClick={() => cert.image ? setSelectedCertImage(cert.image) : cert.link ? window.open(cert.link, "_blank") : null}
                  className={`cert-card reveal ${(cert.year === "Featured" || idx < 2) ? "cert-featured" : ""} ${cert.image || cert.link ? "cursor-pointer transition-transform hover:scale-[1.02]" : ""}`}
                >
                  <div className="cert-icon flex justify-between items-center">
                    <span>{cert.year === "Featured" ? "Featured Credentials" : "Academic Credentials"}</span>
                    {cert.image ? (
                      <span className="text-[10px] font-mono text-gold px-2 py-0.5 rounded border border-gold/30 bg-gold/10">View Photo 👁</span>
                    ) : cert.link ? (
                      <span className="text-[10px] font-mono text-zinc-400 px-2 py-0.5 rounded border border-border bg-surface">Verify Link ↗</span>
                    ) : null}
                  </div>
                  <h3 className="cert-title port-h">{cert.title}</h3>
                  <div className="cert-org">{cert.organization}</div>
                  <div className="cert-date">{cert.year}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="port-container"><div className="divider-line"></div></div>

        {/* ============ PUBLICATIONS ============ */}
        <section id="publications" className="section-alt port-section">
          <div className="port-container">
            <p className="eyebrow reveal"><span className="num">§06</span> RESEARCH PUBLICATIONS</p>
            <h2 className="section-title reveal port-h">Publications</h2>
            <p className="section-sub reveal">Peer-reviewed and presented research.</p>

            <div className="pub-card reveal">
              <h3 className="pub-title port-h">Smart Guide: An Interactive Driving Coach on your Dashboard</h3>
              <div className="pub-meta">
                <span>Journal: International Journal of Intelligent Transportation Systems</span>
                <span>Published: Nov 2024</span>
                <span>DOI: 10.1109/MITS.2024.10421</span>
              </div>
              <p className="pub-abstract">This paper presents Smart Guide, an embedded dashboard system that analyses driver behaviour in real time to deliver actionable coaching feedback, aiming to improve driving safety and habit formation through accessible, in-vehicle AI.</p>
              <div className="pub-actions">
                <a href="https://doi.org" target="_blank" rel="noopener noreferrer" className="btn btn-outline">View Paper ↗</a>
              </div>
            </div>
          </div>
        </section>

        {/* ============ PATENTS ============ */}
        <section id="patents" className="port-section">
          <div className="port-container">
            <p className="eyebrow reveal"><span className="num">§07</span> PATENTS &amp; RIGHTS</p>
            <h2 className="section-title reveal port-h">Patents &amp; Intellectual Property</h2>
            <p className="section-sub reveal">Filed and pending patent applications.</p>

            <div className="patent-card reveal">
              <div>
                <div className="patent-field">
                  <div className="patent-label">Patent Title</div>
                  <div className="patent-value">Smart Guide — Interactive Driving Coach System</div>
                </div>
                <div className="patent-field">
                  <div className="patent-label">Application Number</div>
                  <div className="patent-value">TEMP/2024/9871542</div>
                </div>
                <div className="patent-field">
                  <div className="patent-label">Status</div>
                  <div className="patent-value"><span className="status-pill">Application Filed</span></div>
                </div>
              </div>
              <div>
                <div className="patent-field">
                  <div className="patent-label">Technology Area</div>
                  <div className="patent-value">Embedded AI / Driver Assistance Systems</div>
                </div>
                <div className="patent-field">
                  <div className="patent-label">Description</div>
                  <div className="patent-value">An in-vehicle dashboard system that uses real-time behavioural analysis to deliver coaching feedback to drivers, aimed at improving driving safety.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="port-container"><div className="divider-line"></div></div>

        {/* ============ SERVICES ============ */}
        <section id="services" className="section-alt port-section">
          <div className="port-container">
            <p className="eyebrow reveal"><span className="num">§08</span> WHAT I DO</p>
            <h2 className="section-title reveal port-h">Services</h2>
            <p className="section-sub reveal">Where I can help — from research to shipped product.</p>

            <div className="service-grid">
              {displayServices.map((service, idx) => (
                <div key={service._id || idx} className="service-card reveal">
                  <div className="service-num">{idx < 9 ? `0${idx + 1}` : idx + 1}</div>
                  <h3 className="service-title port-h">{service.title}</h3>
                  <p className="service-desc">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ SKILLS ============ */}
        <section id="skills" className="port-section">
          <div className="port-container">
            <p className="eyebrow reveal"><span className="num">§09</span> EXPERTISE</p>
            <h2 className="section-title reveal port-h">Skills</h2>
            <p className="section-sub reveal">Languages, frameworks, and tools I work with regularly.</p>

            <div className="skills-grid">
              <div>
                {/* Programming Group */}
                <div className="skill-group reveal">
                  <div className="skill-group-title">Programming</div>
                  {displaySkills.filter(s => s.category.toLowerCase().includes("program")).map((skill, idx) => (
                    <SkillBar key={skill._id || idx} name={skill.name} targetFill={skill.name.toLowerCase() === "python" ? 90 : skill.name.toLowerCase().includes("javascript") || skill.name.toLowerCase().includes("css") ? 85 : skill.name.toLowerCase() === "sql" ? 80 : 70} />
                  ))}
                  {/* Fallback if no programming category matching */}
                  {displaySkills.filter(s => s.category.toLowerCase().includes("program")).length === 0 && (
                    <>
                      <SkillBar name="Python" targetFill={90} />
                      <SkillBar name="C++" targetFill={75} />
                      <SkillBar name="Java" targetFill={70} />
                      <SkillBar name="SQL" targetFill={80} />
                      <SkillBar name="HTML / CSS / JavaScript" targetFill={85} />
                    </>
                  )}
                </div>

                {/* AI / ML Group */}
                <div className="skill-group reveal">
                  <div className="skill-group-title">AI &amp; ML</div>
                  {displaySkills.filter(s => s.category.toLowerCase().includes("ai") || s.category.toLowerCase().includes("machine") || s.category.toLowerCase().includes("data")).map((skill, idx) => (
                    <SkillBar key={skill._id || idx} name={skill.name} targetFill={skill.name.toLowerCase().includes("machine") ? 85 : skill.name.toLowerCase().includes("data") ? 80 : 75} />
                  ))}
                  {/* Fallback if no AI category matching */}
                  {displaySkills.filter(s => s.category.toLowerCase().includes("ai") || s.category.toLowerCase().includes("machine") || s.category.toLowerCase().includes("data")).length === 0 && (
                    <>
                      <SkillBar name="Machine Learning" targetFill={85} />
                      <SkillBar name="Deep Learning" targetFill={75} />
                      <SkillBar name="NLP" targetFill={70} />
                      <SkillBar name="Data Science" targetFill={80} />
                    </>
                  )}
                </div>
              </div>

              {/* Tools Group */}
              <div className="reveal">
                <div className="skill-group-title">Tools</div>
                <div className="badge-cloud">
                  {displaySkills.filter(s => s.category.toLowerCase().includes("tool") || s.category.toLowerCase().includes("dev") || s.category.toLowerCase().includes("other")).map((skill, idx) => (
                    <span key={skill._id || idx} className="badge">{skill.name}</span>
                  ))}
                  {displaySkills.filter(s => s.category.toLowerCase().includes("tool") || s.category.toLowerCase().includes("dev") || s.category.toLowerCase().includes("other")).length === 0 && (
                    <>
                      <span className="badge">Git</span>
                      <span className="badge">GitHub</span>
                      <span className="badge">VS Code</span>
                      <span className="badge">Jupyter</span>
                      <span className="badge">Google Colab</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="port-container"><div className="divider-line"></div></div>

        {/* ============ CONTACT ============ */}
        <section id="contact" className="section-alt port-section">
          <div className="port-container">
            <p className="eyebrow reveal"><span className="num">§10</span> GET IN TOUCH</p>
            <h2 className="section-title reveal port-h">Contact</h2>
            <p className="section-sub reveal">Open to research collaboration, internships, and interesting problems.</p>

            <div className="contact-wrap">
              <div className="reveal">
                <div className="contact-info-item">
                  <div className="contact-label">Email</div>
                  <div className="contact-value"><a href={`mailto:${profile?.email || "your.email@example.com"}`}>{profile?.email || "your.email@example.com"}</a></div>
                </div>
                {profile?.linkedin && (
                  <div className="contact-info-item">
                    <div className="contact-label">LinkedIn</div>
                    <div className="contact-value"><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">{profile.linkedin.replace("https://", "")}</a></div>
                  </div>
                )}
                {profile?.github && (
                  <div className="contact-info-item">
                    <div className="contact-label">GitHub</div>
                    <div className="contact-value"><a href={profile.github} target="_blank" rel="noopener noreferrer">{profile.github.replace("https://", "")}</a></div>
                  </div>
                )}
                <div className="social-row">
                  {profile?.linkedin && <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="social-pill">LinkedIn</a>}
                  {profile?.github && <a href={profile.github} target="_blank" rel="noopener noreferrer" className="social-pill">GitHub</a>}
                  {profile?.twitter && <a href={profile.twitter} target="_blank" rel="noopener noreferrer" className="social-pill">Twitter</a>}
                </div>
              </div>

              <div className="reveal">
                <form className="contact-form" onSubmit={handleContactSubmit}>
                  <div className="field">
                    <label htmlFor="form-name">Name</label>
                    <input type="text" id="form-name" name="name" required placeholder="Your name" />
                  </div>
                  <div className="field">
                    <label htmlFor="form-email">Email</label>
                    <input type="email" id="form-email" name="email" required placeholder="Your email address" />
                  </div>
                  <div className="field">
                    <label htmlFor="form-msg">Message</label>
                    <textarea id="form-msg" name="message" required placeholder="Tell me about your project or inquiry..."></textarea>
                  </div>
                  <button type="submit" disabled={formLoading} className="btn btn-primary w-fit self-end">
                    {formLoading ? "Sending..." : "Transmit Message →"}
                  </button>
                  {formStatus && <div className="form-status mt-2">{formStatus}</div>}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="port-footer">
        <div className="port-container">
          <div className="footer-top">
            <div className="footer-brand">
              Prathamesh<span>.</span>
              <p className="footer-statement">B.Tech Student &amp; AI Practitioner exploring how intelligent systems shape our interactions.</p>
            </div>
            <div className="footer-links">
              <div className="footer-col">
                <h4>Navigation</h4>
                <a href="#home" onClick={(e) => navScrollTo(e, "home")}>Home</a>
                <a href="#credentials" onClick={(e) => navScrollTo(e, "credentials")}>Credentials</a>
                <a href="#projects" onClick={(e) => navScrollTo(e, "projects")}>Projects</a>
                <a href="#contact" onClick={(e) => navScrollTo(e, "contact")}>Contact</a>
              </div>
              <div className="footer-col">
                <h4>Socials</h4>
                {profile?.linkedin && <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
                {profile?.github && <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
                {profile?.twitter && <a href={profile.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>}
                {profile?.instagram && <a href={profile.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Prathamesh. All rights reserved.</p>
            <p>Designed for premium editorial aesthetic &amp; dark readability.</p>
          </div>
        </div>
      </footer>

      {profile && (
        <ResumeModal 
          isOpen={isResumeOpen} 
          onClose={() => setIsResumeOpen(false)} 
          resumeUrl={profile.resumeLink || ""} 
          name={profile.name} 
        />
      )}

      {/* Certificate Image Lightbox Modal */}
      {selectedCertImage && (
        <div 
          className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setSelectedCertImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-zinc-950 border border-zinc-850 rounded-2xl overflow-hidden p-2 flex flex-col items-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black text-xl z-10 font-bold"
              onClick={() => setSelectedCertImage(null)}
            >
              ×
            </button>
            <img 
              src={selectedCertImage} 
              alt="Certificate Verification" 
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-inner"
            />
            <div className="py-2 text-[11px] font-mono text-zinc-400">
              Click overlay to close verification viewer
            </div>
          </div>
        </div>
      )}
    </>
  );
}
