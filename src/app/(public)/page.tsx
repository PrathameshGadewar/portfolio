"use client";

import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import { Heart } from "lucide-react";
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
  icon?: string;
}

interface Service {
  _id: string;
  title: string;
  description: string;
}

interface Publication {
  _id: string;
  title: string;
  journal?: string;
  publishedDate?: string;
  doi?: string;
  description?: string;
  paperLink?: string;
}

interface Patent {
  _id: string;
  title: string;
  techArea?: string;
  appNumber?: string;
  description?: string;
  status?: string;
}

interface Achievement {
  _id: string;
  title: string;
  description?: string;
  images: string[];
  year?: string;
}

const getSkillFill = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("python")) return 90;
  if (n.includes("javascript") || n.includes("css") || n.includes("html") || n.includes("react") || n.includes("next")) return 85;
  if (n.includes("sql") || n.includes("database") || n.includes("mongo") || n.includes("postgres")) return 80;
  if (n.includes("c++") || n.includes("java")) return 75;
  if (n.includes("machine") || n.includes("deep") || n.includes("learning") || n.includes("ai")) return 85;
  return 80; // default
};

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
const SkillBar = ({ name, targetFill, icon }: { name: string; targetFill: number; icon?: string }) => {
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
        <div className="flex items-center gap-2">
          {icon && (
            <div className="w-5 h-5 shrink-0 rounded overflow-hidden flex items-center justify-center bg-white/5 p-0.5 border border-white/10">
              <img src={icon} alt={name} className="w-full h-full object-contain" />
            </div>
          )}
          <span>{name}</span>
        </div>
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
  const [publications, setPublications] = useState<Publication[]>([]);
  const [patents, setPatents] = useState<Patent[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
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
      fetch("/api/portfolio/skill").then((r) => r.json()).catch(() => []),
      fetch("/api/portfolio/publication").then((r) => r.json()).catch(() => []),
      fetch("/api/portfolio/patent").then((r) => r.json()).catch(() => []),
      fetch("/api/portfolio/achievement").then((r) => r.json()).catch(() => [])
    ])
      .then(([profileData, eduData, expData, projData, certData, servData, skillData, pubData, patData, achData]) => {
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
        if (Array.isArray(pubData)) setPublications(pubData);
        if (Array.isArray(patData)) setPatents(patData);
        if (Array.isArray(achData)) setAchievements(achData);
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

  // Filtering projects
  const filteredProjects = projectFilter === "all"
    ? projects
    : projects.filter(p => {
        const cat = p.category?.toLowerCase() || "";
        const tagsStr = p.tags.join(" ").toLowerCase();
        return cat.includes(projectFilter) || tagsStr.includes(projectFilter);
      });

  // Filtering certifications
  const filteredCerts = certFilter === "all"
    ? certifications
    : certifications.filter(c => {
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
                {profile?.resumeLink && (
                  profile.resumeLink === '/api/resume' ? (
                    <button 
                      onClick={() => setIsResumeOpen(true)} 
                      className="btn btn-outline" 
                      id="resume-btn"
                    >
                      Download Resume
                    </button>
                  ) : (
                    <a 
                      href={profile.resumeLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-outline" 
                      id="resume-btn"
                    >
                      Download Resume
                    </a>
                  )
                )}
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

            <div className="timeline">
              {experience.map((exp, idx) => (
                <div key={exp._id || idx} className="t-item reveal">
                  <div className="t-dot"></div>
                  <div className="t-date">{exp.duration}</div>
                  <div className="t-title port-h">{exp.role}</div>
                  <div className="t-org">{exp.company}</div>
                  <div className="t-desc">{exp.description}</div>
                </div>
              ))}
              {experience.length === 0 && (
                <div className="reveal text-zinc-500 font-mono text-sm py-4">No experience entries found in the system. Add them in the Admin Panel!</div>
              )}
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
              {education.map((edu, idx) => (
                <div key={edu._id || idx} className="t-item reveal">
                  <div className="t-dot"></div>
                  <div className="flex gap-5 items-start">
                    {edu.logo && (
                      <div className="edu-logo">
                        <img src={edu.logo} alt={edu.institution} />
                      </div>
                    )}
                    <div className="flex-1">
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
                  </div>
                </div>
              ))}
              {education.length === 0 && (
                <div className="reveal text-zinc-500 font-mono text-sm py-4">No education records found in the system. Add them in the Admin Panel!</div>
              )}
            </div>
          </div>
        </section>

        {/* ============ CERTIFICATIONS & ACHIEVEMENTS ============ */}
        <section id="certifications" className="port-section">
          <div className="port-container">
            <p className="eyebrow reveal"><span className="num">§05</span> AWARDS &amp; ACHIEVEMENTS</p>
            <h2 className="section-title reveal port-h">Certifications &amp; Achievements</h2>
            <p className="section-sub reveal">Credentials across AI/ML, cloud, programming, internships, and competitions.</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
              {/* Left Column: Achievements Feed */}
              <div className="lg:col-span-1 flex flex-col h-[650px] bg-[var(--surface)] border border-border rounded-[14px] p-6 overflow-hidden reveal">
                <div className="flex items-center justify-between mb-4 shrink-0">
                  <h3 className="text-xl font-bold font-display text-[var(--text)]">Achievements Feed</h3>
                  <span className="text-[10px] font-mono text-gold px-2 py-0.5 rounded border border-gold/30 bg-gold/10 uppercase tracking-wider">Scroll</span>
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar">
                  {achievements.map((ach, idx) => (
                    <div key={ach._id || idx} className="p-4 bg-surface/50 rounded-xl border border-border/80 flex flex-col gap-2 hover:border-gold-soft transition-colors">
                      <div className="flex items-start justify-between">
                        <h4 className="font-bold text-sm text-[var(--text)] font-display leading-tight">{ach.title}</h4>
                        {ach.year && <span className="text-[10px] font-mono text-[var(--text-faint)] whitespace-nowrap ml-2">{ach.year}</span>}
                      </div>
                      {ach.description && <p className="text-[12px] text-[var(--text-dim)] leading-relaxed">{ach.description}</p>}
                      
                      {ach.images && ach.images.length > 0 && (
                        <div className="relative group mt-1">
                          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none scroll-smooth" id={`gallery-${ach._id || idx}`}>
                            {ach.images.map((img, imgIdx) => (
                              <img 
                                key={imgIdx}
                                src={img}
                                alt={`Achievement photo ${imgIdx + 1}`}
                                onClick={() => setSelectedCertImage(img)}
                                className="w-16 h-16 object-cover rounded-lg border border-border hover:border-gold cursor-pointer shrink-0 transition-transform hover:scale-105"
                              />
                            ))}
                          </div>
                          
                          {ach.images.length > 2 && (
                            <>
                              <button 
                                onClick={() => {
                                  const container = document.getElementById(`gallery-${ach._id || idx}`);
                                  if (container) container.scrollLeft -= 80;
                                }}
                                className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/60 border border-white/10 text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black"
                              >
                                <span>&larr;</span>
                              </button>
                              <button 
                                onClick={() => {
                                  const container = document.getElementById(`gallery-${ach._id || idx}`);
                                  if (container) container.scrollLeft += 80;
                                }}
                                className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/60 border border-white/10 text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black"
                              >
                                <span>&rarr;</span>
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                  {achievements.length === 0 && (
                    <div className="text-zinc-500 font-mono text-xs text-center py-10">No achievements recorded. Add them in the Admin Panel!</div>
                  )}
                </div>
              </div>

              {/* Right Column: Certifications Grid */}
              <div className="lg:col-span-2 flex flex-col h-[650px] reveal">
                <div className="cert-tabs mb-6 shrink-0">
                  <button onClick={() => setCertFilter("all")} className={`filter-btn ${certFilter === "all" ? "active" : ""}`}>All</button>
                  <button onClick={() => setCertFilter("ai")} className={`filter-btn ${certFilter === "ai" ? "active" : ""}`}>AI &amp; ML</button>
                  <button onClick={() => setCertFilter("cloud")} className={`filter-btn ${certFilter === "cloud" ? "active" : ""}`}>Cloud</button>
                  <button onClick={() => setCertFilter("prog")} className={`filter-btn ${certFilter === "prog" ? "active" : ""}`}>Programming</button>
                  <button onClick={() => setCertFilter("intern")} className={`filter-btn ${certFilter === "intern" ? "active" : ""}`}>Internships</button>
                  <button onClick={() => setCertFilter("comp")} className={`filter-btn ${certFilter === "comp" ? "active" : ""}`}>Competitions</button>
                </div>

                <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredCerts.map((cert, idx) => (
                      <div 
                        key={cert._id || idx} 
                        onClick={() => cert.image ? setSelectedCertImage(cert.image) : cert.link ? window.open(cert.link, "_blank") : null}
                        className={`cert-card ${(cert.year === "Featured" || idx < 2) ? "cert-featured" : ""} ${cert.image || cert.link ? "cursor-pointer transition-transform hover:scale-[1.02]" : ""}`}
                      >
                        <div className="cert-icon flex justify-between items-center">
                          <span>{cert.year === "Featured" ? "Featured Credentials" : "Academic Credentials"}</span>
                          {cert.image ? (
                            <span className="text-[10px] font-mono text-gold px-2 py-0.5 rounded border border-gold/30 bg-gold/10">View Photo 👁</span>
                          ) : cert.link ? (
                            <span className="text-[10px] font-mono text-zinc-400 px-2 py-0.5 rounded border border-border bg-surface">Verify Link ↗</span>
                          ) : null}
                        </div>
                        <h3 className="cert-title port-h text-[var(--text)]">{cert.title}</h3>
                        <div className="cert-org">{cert.organization}</div>
                        <div className="cert-date">{cert.year}</div>
                      </div>
                    ))}
                    {filteredCerts.length === 0 && (
                      <div className="col-span-full text-zinc-500 font-mono text-xs text-center py-10">No certifications found.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ PUBLICATIONS ============ */}
        <section id="publications" className="port-section">
          <div className="port-container">
            <p className="eyebrow reveal"><span className="num">§06</span> RESEARCH PUBLICATIONS</p>
            <h2 className="section-title reveal port-h">Publications</h2>
            <p className="section-sub reveal">Peer-reviewed and presented research.</p>

            <div className="publications-list">
              {publications.map((pub, idx) => (
                <div key={pub._id || idx} className="pub-card reveal">
                  <h3 className="pub-title port-h">{pub.title}</h3>
                  <div className="pub-meta">
                    {pub.journal && <span>Journal: {pub.journal}</span>}
                    {pub.publishedDate && <span>Published: {pub.publishedDate}</span>}
                    {pub.doi && <span>DOI: {pub.doi}</span>}
                  </div>
                  {pub.description && <p className="pub-abstract">{pub.description}</p>}
                  {pub.paperLink && (
                    <div className="pub-actions">
                      <a 
                        href={pub.paperLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-outline"
                      >
                        View Paper ↗
                      </a>
                    </div>
                  )}
                </div>
              ))}
              {publications.length === 0 && (
                <div className="reveal text-zinc-500 font-mono text-sm py-4">No publications records found in the system. Add them in the Admin Panel!</div>
              )}
            </div>
          </div>
        </section>

        <div className="port-container"><div className="divider-line"></div></div>

        {/* ============ PATENTS ============ */}
        <section id="patents" className="section-alt port-section">
          <div className="port-container">
            <p className="eyebrow reveal"><span className="num">§07</span> PATENTS &amp; RIGHTS</p>
            <h2 className="section-title reveal port-h">Patents &amp; Intellectual Property</h2>
            <p className="section-sub reveal">Filed and pending patent applications.</p>

            <div className="patents-list">
              {patents.map((pat, idx) => (
                <div key={pat._id || idx} className="patent-card reveal">
                  <div className="patent-col">
                    <div className="patent-field">
                      <span className="patent-label">Patent Title</span>
                      <span className="patent-value port-h font-bold">{pat.title}</span>
                    </div>
                    {pat.appNumber && (
                      <div className="patent-field">
                        <span className="patent-label">Application Number</span>
                        <span className="patent-value font-mono text-sm">{pat.appNumber}</span>
                      </div>
                    )}
                    {pat.status && (
                      <div className="patent-field">
                        <span className="patent-label">Status</span>
                        <div>
                          <span className="status-pill">{pat.status}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="patent-col">
                    {pat.techArea && (
                      <div className="patent-field">
                        <span className="patent-label">Technology Area</span>
                        <span className="patent-value">{pat.techArea}</span>
                      </div>
                    )}
                    {pat.description && (
                      <div className="patent-field">
                        <span className="patent-label">Description</span>
                        <span className="patent-value text-zinc-400 leading-relaxed block">{pat.description}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {patents.length === 0 && (
                <div className="reveal text-zinc-500 font-mono text-sm py-4">No patent records found in the system. Add them in the Admin Panel!</div>
              )}
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
              {services.map((service, idx) => (
                <div key={service._id || idx} className="service-card reveal">
                  <div className="service-num">{idx < 9 ? `0${idx + 1}` : idx + 1}</div>
                  <h3 className="service-title port-h">{service.title}</h3>
                  <p className="service-desc">{service.description}</p>
                </div>
              ))}
              {services.length === 0 && (
                <div className="col-span-full reveal text-zinc-500 font-mono text-sm py-4">No services defined in the system. Add them in the Admin Panel!</div>
              )}
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
                {skills.filter(s => s.category.toLowerCase().includes("program") || s.category.toLowerCase().includes("lang")).length > 0 && (
                  <div className="skill-group reveal">
                    <div className="skill-group-title">Programming</div>
                    {skills.filter(s => s.category.toLowerCase().includes("program") || s.category.toLowerCase().includes("lang")).map((skill, idx) => (
                      <SkillBar key={skill._id || idx} name={skill.name} targetFill={getSkillFill(skill.name)} icon={skill.icon} />
                    ))}
                  </div>
                )}

                {/* AI / ML Group */}
                {skills.filter(s => s.category.toLowerCase().includes("ai") || s.category.toLowerCase().includes("machine") || s.category.toLowerCase().includes("learning") || s.category.toLowerCase().includes("data")).length > 0 && (
                  <div className="skill-group reveal">
                    <div className="skill-group-title">AI &amp; ML</div>
                    {skills.filter(s => s.category.toLowerCase().includes("ai") || s.category.toLowerCase().includes("machine") || s.category.toLowerCase().includes("learning") || s.category.toLowerCase().includes("data")).map((skill, idx) => (
                      <SkillBar key={skill._id || idx} name={skill.name} targetFill={getSkillFill(skill.name)} icon={skill.icon} />
                    ))}
                  </div>
                )}
              </div>

              {/* Tools Group */}
              {skills.filter(s => !s.category.toLowerCase().includes("program") && !s.category.toLowerCase().includes("lang") && !s.category.toLowerCase().includes("ai") && !s.category.toLowerCase().includes("machine") && !s.category.toLowerCase().includes("learning") && !s.category.toLowerCase().includes("data")).length > 0 && (
                <div className="reveal">
                  <div className="skill-group-title">Tools</div>
                  <div className="badge-cloud">
                    {skills.filter(s => !s.category.toLowerCase().includes("program") && !s.category.toLowerCase().includes("lang") && !s.category.toLowerCase().includes("ai") && !s.category.toLowerCase().includes("machine") && !s.category.toLowerCase().includes("learning") && !s.category.toLowerCase().includes("data")).map((skill, idx) => (
                      <span key={skill._id || idx} className="badge">
                        {skill.icon && (
                          <span className="w-4 h-4 shrink-0 rounded overflow-hidden flex items-center justify-center bg-white/5 p-0.5 border border-white/10">
                            <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
                          </span>
                        )}
                        <span>{skill.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {skills.length === 0 && (
              <div className="reveal text-zinc-500 font-mono text-sm py-4">No skills entered in the system. Add them in the Admin Panel!</div>
            )}
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
            <p className="inline-flex items-center gap-1 flex-wrap">
              Built with
              <Heart className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 hover:text-red-300 hover:fill-red-300 dark:hover:text-red-300 dark:hover:fill-red-300 transition-all duration-300 cursor-pointer" />
              and lots of Chai .
            </p>
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
