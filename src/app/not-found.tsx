"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function NotFound() {
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const starsEl = starsRef.current;
    if (!starsEl) return;

    // Clear any existing stars (e.g. from hot-reloading)
    starsEl.innerHTML = "";

    const count = 140;
    for (let i = 0; i < count; i++) {
      const s = document.createElement("div");
      s.className = "star";
      const size = Math.random() * 1.8 + 0.6;
      s.style.width = `${size}px`;
      s.style.height = `${size}px`;
      s.style.left = `${Math.random() * 100}%`;
      s.style.top = `${Math.random() * 70}%`;
      s.style.animationDelay = `${Math.random() * 4}s`;
      s.style.animationDuration = `${3 + Math.random() * 3}s`;
      starsEl.appendChild(s);
    }
  }, []);

  return (
    <div className="stage-404">
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --void: #070a14;
          --deep: #0c1230;
          --blue: #16205c;
          --gold: #B08D57;
          --gold-bright: #E8C994;
          --paper: #f5f3ee;
          --silver: rgba(245, 243, 238, 0.55);
          --line: rgba(176, 141, 87, 0.35);
        }
        
        .stage-404 {
          position: fixed;
          inset: 0;
          z-index: 9999;
          overflow: hidden;
          background: radial-gradient(ellipse 120% 60% at 50% 0%, #131b48 0%, #0c1230 35%, var(--void) 75%);
          font-family: var(--font-body), 'Inter', system-ui, sans-serif;
          color: var(--paper);
          width: 100vw;
          height: 100vh;
        }

        .stage-404 * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* stars */
        .stage-404 .stars {
          position: absolute;
          inset: 0;
        }
        .stage-404 .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: var(--paper);
          border-radius: 50%;
          opacity: .6;
          animation: twinkle 4s ease-in-out infinite;
        }
        @keyframes twinkle {
          0%, 100% { opacity: .15; }
          50% { opacity: .9; }
        }

        /* planet curve, echoing the banner */
        .stage-404 .planet {
          position: absolute;
          bottom: -62%;
          left: 50%;
          transform: translateX(-50%);
          width: 165%;
          height: 90%;
          border-radius: 50%;
          background: radial-gradient(circle at 50% 0%, #cfd6e6 0%, #8e98b8 18%, #3c4470 42%, #161c3a 65%, #070a14 85%);
          box-shadow: 0 -6px 90px 10px rgba(90, 110, 220, 0.45);
        }
        .stage-404 .planet::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: repeating-radial-gradient(circle at 40% 10%, rgba(0, 0, 0, 0.08) 0 2px, transparent 2px 6px);
          mix-blend-mode: overlay;
        }

        /* web threads forming a broken citation mark */
        .stage-404 .web-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .stage-404 .strand {
          stroke: rgba(245, 243, 238, 0.18);
          stroke-width: 1;
          fill: none;
        }
        .stage-404 .strand-break {
          stroke: var(--gold);
          stroke-width: 1.4;
          fill: none;
          filter: drop-shadow(0 0 3px rgba(176, 141, 87, 0.6));
        }

        /* the spider, dangling from a single thread, swinging */
        .stage-404 .dangle {
          position: absolute;
          top: 0;
          left: 50%;
          transform-origin: top center;
          animation: swing 6s ease-in-out infinite;
        }
        @keyframes swing {
          0%, 100% { transform: translateX(-50%) rotate(-6deg); }
          50% { transform: translateX(-50%) rotate(6deg); }
        }
        .stage-404 .thread {
          width: 1px;
          height: 120px;
          background: linear-gradient(to bottom, rgba(245, 243, 238, 0.5), rgba(245, 243, 238, 0.05));
          margin: 0 auto;
        }
        .stage-404 .spider {
          width: 26px;
          height: 26px;
          margin: 0 auto;
          position: relative;
        }
        .stage-404 .spider svg {
          width: 100%;
          height: 100%;
          display: block;
        }
        .stage-404 .spider path, .stage-404 .spider line {
          stroke: var(--gold-bright);
          stroke-width: 1.6;
          stroke-linecap: round;
          fill: none;
        }
        .stage-404 .spider circle {
          fill: var(--gold-bright);
          stroke: none;
        }

        /* central content */
        .stage-404 .content {
          position: relative;
          z-index: 5;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 24px;
        }

        .stage-404 .eyebrow {
          font-family: var(--font-mono), 'JetBrains Mono', monospace;
          font-size: 12px;
          letter-spacing: .32em;
          text-transform: uppercase;
          color: var(--gold-bright);
          opacity: .85;
          margin-bottom: 22px;
          display: flex;
          align-items: center;
          gap: 0px;
        }
        .stage-404 .eyebrow::before {
          content: "§ ";
        }

        .stage-404 .code {
          font-family: var(--font-display), Georgia, 'Times New Roman', serif;
          font-weight: 500;
          font-size: clamp(86px, 17vw, 168px);
          line-height: .85;
          letter-spacing: -.02em;
          color: var(--paper);
          position: relative;
          display: inline-block;
        }
        .stage-404 .code .tear {
          color: transparent;
          -webkit-text-stroke: 1.5px var(--gold);
          text-shadow: 0 0 18px rgba(176, 141, 87, 0.5);
        }

        .stage-404 .citation {
          font-family: var(--font-display), Georgia, serif;
          font-style: italic;
          font-size: 15px;
          color: var(--silver);
          margin-top: 18px;
          max-width: 440px;
        }
        .stage-404 .citation .marker {
          font-family: var(--font-mono), 'JetBrains Mono', monospace;
          font-style: normal;
          color: var(--gold-bright);
          font-size: 12px;
          vertical-align: super;
          margin-right: 2px;
        }

        .stage-404 .lede {
          font-size: 15px;
          color: var(--silver);
          margin-top: 8px;
          max-width: 420px;
          line-height: 1.6;
        }

        .stage-404 .actions {
          margin-top: 34px;
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .stage-404 .btn {
          font-family: var(--font-mono), 'JetBrains Mono', monospace;
          font-size: 12px;
          letter-spacing: .08em;
          text-transform: uppercase;
          padding: 13px 26px;
          border-radius: 2px;
          text-decoration: none;
          transition: all .25s ease;
          cursor: pointer;
          border: 1px solid var(--line);
          color: var(--paper);
          background: transparent;
        }
        .stage-404 .btn.primary {
          background: var(--gold);
          color: #0c1230;
          border-color: var(--gold);
        }
        .stage-404 .btn.primary:hover {
          background: var(--gold-bright);
          box-shadow: 0 0 18px rgba(176, 141, 87, .5);
        }
        .stage-404 .btn:not(.primary):hover {
          border-color: var(--gold);
          color: var(--gold-bright);
        }

        .stage-404 .seam {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--line), transparent);
        }

        .stage-404 .footer-mark {
          position: absolute;
          bottom: 26px;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          z-index: 5;
        }
        .stage-404 .logo {
          font-family: var(--font-display), Georgia, serif;
          font-weight: 600;
          font-size: 18px;
          letter-spacing: .02em;
          color: var(--paper);
          opacity: .9;
        }
        .stage-404 .logo span {
          color: var(--gold-bright);
        }
        .stage-404 .doc-id {
          font-family: var(--font-mono), 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: .1em;
          color: var(--silver);
          text-transform: uppercase;
        }

        @media (max-width: 560px) {
          .stage-404 .footer-mark {
            padding: 0 18px;
          }
          .stage-404 .citation, .stage-404 .lede {
            font-size: 13px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .stage-404 .star, .stage-404 .dangle {
            animation: none !important;
          }
        }
      ` }} />
      <div className="seam" />
      <div className="stars" ref={starsRef} />
      <div className="planet" />

      <svg className="web-layer" viewBox="0 0 1600 800" preserveAspectRatio="none">
        <path className="strand" d="M800,0 L260,800" />
        <path className="strand" d="M800,0 L1340,800" />
        <path className="strand" d="M800,0 L500,800" />
        <path className="strand" d="M800,0 L1100,800" />
        <path className="strand" d="M0,260 Q400,300 800,290 Q1200,300 1600,260" />
        <path className="strand" d="M0,420 Q400,460 800,450 Q1200,460 1600,420" />
        <path className="strand-break" d="M620,300 Q700,420 560,500" />
        <path className="strand-break" d="M980,300 Q900,420 1040,500" />
      </svg>

      <div className="dangle" style={{ marginLeft: "120px" }}>
        <div className="thread" />
        <div className="spider">
          <svg viewBox="0 0 26 26">
            <circle cx="13" cy="11" r="4.5" />
            <line x1="13" y1="14" x2="13" y2="20" />
            <path d="M9,8 L3,4 M9,11 L1,11 M9,14 L3,19" />
            <path d="M17,8 L23,4 M17,11 L25,11 M17,14 L23,19" />
          </svg>
        </div>
      </div>

      <div className="content">
        <div className="eyebrow">Reference Not Found</div>
        <div className="code">
          4<span className="tear">0</span>4
        </div>
        <p className="citation">
          <span className="marker">[ibid.]</span>
          The page you followed leads to a source that was moved, renamed, or never existed.
        </p>
        <p className="lede">
          Looks like a thread snapped somewhere between citation and page. Let's get you back to solid ground.
        </p>
        <div className="actions">
          <Link href="/" className="btn primary">
            Return to thesis
          </Link>
          <button onClick={() => window.history.back()} className="btn">
            Go back
          </button>
        </div>
      </div>

      <div className="footer-mark">
        <div className="logo">
          P<span>G.</span>
        </div>
        <div className="doc-id">ERR · 404 · ORBIT-LOST</div>
      </div>
    </div>
  );
}

