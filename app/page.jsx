"use client";

import Link from 'next/link';

export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        :root {
          --cyan: #00E5FF;
          --cyan-dim: rgba(0,229,255,0.12);
          --rose: #FF3CAC;
          --rose-dim: rgba(255,60,172,0.10);
          --teal: #00B4D8;
          --violet: #7B2FBE;
          --deep: #020817;
          --surface: rgba(6,18,46,0.65);
          --glass-border: rgba(0,229,255,0.12);
          --text-primary: #EEF4FF;
          --text-secondary: rgba(200,215,255,0.6);
          --text-muted: rgba(200,215,255,0.35);
        }

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        .page-root {
          font-family: 'DM Sans', sans-serif;
          background: var(--deep);
          min-height: 100vh;
          color: var(--text-primary);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        /* ── Aurora layer ── */
        .aurora {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }
        .aurora-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          mix-blend-mode: screen;
          animation: drift 12s ease-in-out infinite alternate;
        }
        .orb-1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(0,180,216,0.35) 0%, transparent 65%);
          top: -200px; left: -150px;
          animation-delay: 0s; animation-duration: 14s;
        }
        .orb-2 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(123,47,190,0.4) 0%, transparent 65%);
          top: -100px; right: -100px;
          animation-delay: 3s; animation-duration: 11s;
        }
        .orb-3 {
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(255,60,172,0.2) 0%, transparent 65%);
          bottom: -300px; left: 30%;
          animation-delay: 6s; animation-duration: 16s;
        }
        .orb-4 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(0,229,255,0.2) 0%, transparent 65%);
          bottom: 10%; right: 5%;
          animation-delay: 2s; animation-duration: 10s;
        }

        @keyframes drift {
          0%   { transform: translate(0, 0) scale(1); }
          33%  { transform: translate(40px, -60px) scale(1.08); }
          66%  { transform: translate(-30px, 30px) scale(0.95); }
          100% { transform: translate(20px, -20px) scale(1.04); }
        }

        /* ── Dot-grid texture overlay ── */
        .dot-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(0,229,255,0.08) 1px, transparent 1px);
          background-size: 32px 32px;
          z-index: 1;
          pointer-events: none;
        }

        /* ── Thin scan line ── */
        .scanline {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: repeating-linear-gradient(
            180deg,
            transparent,
            transparent 3px,
            rgba(0,229,255,0.012) 3px,
            rgba(0,229,255,0.012) 4px
          );
        }

        /* ── Navbar ── */
        .navbar {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 40px;
          border-bottom: 1px solid rgba(0,229,255,0.07);
        }
        .nav-logo {
          display: flex; align-items: center; gap: 10px;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-primary);
          text-decoration: none;
        }
        .nav-logo-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--cyan);
          box-shadow: 0 0 12px var(--cyan), 0 0 24px rgba(0,229,255,0.4);
          animation: pulse-dot 2.4s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.85); }
        }
        .nav-links {
          display: flex; gap: 32px;
          list-style: none;
        }
        .nav-links a {
          font-size: 13px;
          font-weight: 400;
          color: var(--text-secondary);
          text-decoration: none;
          letter-spacing: 0.04em;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--cyan); }
        .nav-cta {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 9px 22px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: var(--deep);
          background: var(--cyan);
          border: none;
          border-radius: 6px;
          text-decoration: none;
          cursor: pointer;
          transition: box-shadow 0.2s, transform 0.15s;
        }
        .nav-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 28px rgba(0,229,255,0.5);
        }

        /* ── Hero ── */
        .hero {
          position: relative;
          z-index: 5;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 72px 40px 40px;
          text-align: center;
        }

        .badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 18px;
          border-radius: 100px;
          border: 1px solid rgba(0,229,255,0.2);
          background: rgba(0,229,255,0.06);
          font-size: 11.5px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--cyan);
          margin-bottom: 32px;
          opacity: 0;
          animation: fadeUp 0.6s 0.1s ease forwards;
        }
        .badge-ping {
          position: relative;
          width: 7px; height: 7px;
        }
        .badge-ping::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: var(--cyan);
          animation: ping 1.8s ease-out infinite;
        }
        .badge-ping::after {
          content: '';
          position: absolute;
          inset: 1.5px;
          border-radius: 50%;
          background: var(--cyan);
        }
        @keyframes ping {
          0% { transform: scale(1); opacity: 0.75; }
          80%, 100% { transform: scale(2.2); opacity: 0; }
        }

        .hero-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(44px, 7vw, 86px);
          line-height: 1;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          margin-bottom: 12px;
          opacity: 0;
          animation: fadeUp 0.7s 0.2s ease forwards;
        }
        .hero-title-line2 {
          display: block;
          background: linear-gradient(90deg, var(--cyan) 0%, #A78BFA 50%, var(--rose) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 32px rgba(0,229,255,0.25));
        }

        .hero-sub {
          font-size: clamp(16px, 2vw, 19px);
          font-weight: 300;
          font-style: italic;
          color: var(--text-secondary);
          max-width: 560px;
          line-height: 1.75;
          margin: 20px auto 44px;
          opacity: 0;
          animation: fadeUp 0.7s 0.32s ease forwards;
        }

        /* ── CTA ── */
        .cta-row {
          display: flex; gap: 14px; justify-content: center; align-items: center;
          flex-wrap: wrap;
          opacity: 0;
          animation: fadeUp 0.7s 0.44s ease forwards;
        }
        .btn-glow {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 44px;
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--deep);
          background: linear-gradient(135deg, var(--cyan) 0%, #67E8F9 100%);
          border: none;
          border-radius: 8px;
          text-decoration: none;
          cursor: pointer;
          position: relative;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-glow::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 10px;
          background: linear-gradient(135deg, var(--cyan), #A78BFA, var(--rose));
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .btn-glow:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 40px rgba(0,229,255,0.45), 0 8px 32px rgba(0,0,0,0.4);
        }
        .btn-glow:hover::before { opacity: 1; }
        .btn-ghost {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 15px 40px;
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-primary);
          background: transparent;
          border: 1px solid rgba(200,215,255,0.18);
          border-radius: 8px;
          text-decoration: none;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, transform 0.2s, background 0.2s;
        }
        .btn-ghost:hover {
          border-color: rgba(0,229,255,0.45);
          color: var(--cyan);
          background: rgba(0,229,255,0.05);
          transform: translateY(-2px);
        }
        .btn-arrow {
          display: inline-block;
          transition: transform 0.2s;
        }
        .btn-glow:hover .btn-arrow,
        .btn-ghost:hover .btn-arrow { transform: translateX(4px); }

        /* ── Stats strip ── */
        .stats-strip {
          display: flex;
          gap: 0;
          margin-top: 64px;
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          overflow: hidden;
          backdrop-filter: blur(12px);
          background: var(--surface);
          opacity: 0;
          animation: fadeUp 0.7s 0.56s ease forwards;
        }
        .stat-cell {
          flex: 1;
          padding: 20px 28px;
          border-right: 1px solid var(--glass-border);
          display: flex; flex-direction: column; gap: 4px;
          transition: background 0.2s;
        }
        .stat-cell:last-child { border-right: none; }
        .stat-cell:hover { background: rgba(0,229,255,0.04); }
        .stat-n {
          font-family: 'Syne', sans-serif;
          font-size: 26px;
          font-weight: 800;
          background: linear-gradient(90deg, var(--cyan), #A78BFA);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }
        .stat-l {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        /* ── Feature cards ── */
        .features-section {
          position: relative;
          z-index: 5;
          padding: 0 40px 80px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
          opacity: 0;
          animation: fadeUp 0.75s 0.66s ease forwards;
        }
        .feat-card {
          background: var(--surface);
          backdrop-filter: blur(16px);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 28px 24px;
          display: flex; flex-direction: column; align-items: flex-start; gap: 12px;
          transition: border-color 0.25s, transform 0.2s, background 0.25s;
          position: relative;
          overflow: hidden;
        }
        .feat-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,229,255,0.04) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .feat-card:hover {
          border-color: rgba(0,229,255,0.3);
          transform: translateY(-4px);
          background: rgba(6,18,46,0.8);
        }
        .feat-card:hover::before { opacity: 1; }
        .feat-icon {
          width: 44px; height: 44px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
        }
        .feat-icon-cyan { background: rgba(0,229,255,0.1); }
        .feat-icon-violet { background: rgba(123,47,190,0.15); }
        .feat-icon-rose { background: rgba(255,60,172,0.1); }
        .feat-title {
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }
        .feat-desc {
          font-size: 13.5px;
          font-weight: 300;
          color: var(--text-secondary);
          line-height: 1.65;
        }
        .feat-tag {
          margin-top: auto;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 4px;
        }
        .tag-cyan { color: var(--cyan); background: rgba(0,229,255,0.08); }
        .tag-violet { color: #A78BFA; background: rgba(167,139,250,0.1); }
        .tag-rose { color: var(--rose); background: rgba(255,60,172,0.08); }

        /* ── Footer strip ── */
        .footer-strip {
          position: relative;
          z-index: 5;
          border-top: 1px solid rgba(0,229,255,0.07);
          padding: 20px 40px;
          display: flex; align-items: center; justify-content: space-between;
          opacity: 0;
          animation: fadeUp 0.6s 0.8s ease forwards;
        }
        .footer-left {
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .footer-dots {
          display: flex; gap: 6px; align-items: center;
        }
        .f-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
        }
        .f-dot-1 { background: var(--cyan); opacity: 0.6; }
        .f-dot-2 { background: #A78BFA; opacity: 0.5; }
        .f-dot-3 { background: var(--rose); opacity: 0.45; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 700px) {
          .features-section { grid-template-columns: 1fr; padding: 0 20px 60px; }
          .navbar { padding: 18px 20px; }
          .nav-links { display: none; }
          .hero { padding: 48px 20px 32px; }
          .stats-strip { flex-direction: column; }
          .stat-cell { border-right: none; border-bottom: 1px solid var(--glass-border); }
          .stat-cell:last-child { border-bottom: none; }
        }
      `}</style>

      <div className="page-root">

        {/* Aurora background */}
        <div className="aurora">
          <div className="aurora-orb orb-1" />
          <div className="aurora-orb orb-2" />
          <div className="aurora-orb orb-3" />
          <div className="aurora-orb orb-4" />
        </div>
        <div className="dot-grid" />
        <div className="scanline" />

        {/* Navbar */}
        <nav className="navbar">
          <a href="/" className="nav-logo">
            <div className="nav-logo-dot" />
            EduPortal
          </a>
          <ul className="nav-links">
            <li><a href="#">Features</a></li>
            <li><a href="#">Students</a></li>
            <li><a href="#">Security</a></li>
            <li><a href="#">Docs</a></li>
          </ul>
          <Link href="/signup" className="nav-cta">
            Get Started
            <span className="btn-arrow">→</span>
          </Link>
        </nav>

        {/* Hero */}
        <section className="hero">

          <div className="badge">
            <div className="badge-ping" />
            Next-Gen Educator Platform — v2.0
          </div>

          <h1 className="hero-title">
            Your Classroom,
            <span className="hero-title-line2"> Elevated.</span>
          </h1>

          <p className="hero-sub">
            Seamlessly manage students, track academic progress, and command your dashboard with precision — built for educators who refuse to settle.
          </p>

          <div className="cta-row">
            <Link href="/login" className="btn-glow">
              Access Dashboard
              <span className="btn-arrow">→</span>
            </Link>
            <Link href="/signup" className="btn-ghost">
              Create Account
              <span className="btn-arrow">↗</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="stats-strip">
            <div className="stat-cell">
              <span className="stat-n">100%</span>
              <span className="stat-l">Secure</span>
            </div>
            <div className="stat-cell">
              <span className="stat-n">256‑bit</span>
              <span className="stat-l">Encryption</span>
            </div>
            <div className="stat-cell">
              <span className="stat-n">&lt;50ms</span>
              <span className="stat-l">Response</span>
            </div>
            <div className="stat-cell">
              <span className="stat-n">∞</span>
              <span className="stat-l">Students</span>
            </div>
            <div className="stat-cell">
              <span className="stat-n whitespace-nowrap">24 / 7</span>
              <span className="stat-l">Uptime</span>
            </div>
          </div>

        </section>

        {/* Feature cards */}
        <div className="features-section">

          <div className="feat-card">
            <div className="feat-icon feat-icon-cyan">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <span className="feat-title">End-to-End Security</span>
            <span className="feat-desc">256-bit encryption guards every record, login, and data transfer — no compromises, ever.</span>
            <span className="feat-tag tag-cyan">AES-256</span>
          </div>

          <div className="feat-card">
            <div className="feat-icon feat-icon-violet">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
              </svg>
            </div>
            <span className="feat-title">Student Roster</span>
            <span className="feat-desc">Create, update, and manage unlimited student profiles with a fluid, intuitive interface.</span>
            <span className="feat-tag tag-violet">CRUD + more</span>
          </div>

          <div className="feat-card">
            <div className="feat-icon feat-icon-rose">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF3CAC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <span className="feat-title">Lightning API</span>
            <span className="feat-desc">Sub-50ms response times on every query, backed by a real-time reactive architecture.</span>
            <span className="feat-tag tag-rose">Real-time</span>
          </div>

        </div>

        {/* Footer */}
        <div className="footer-strip">
          <span className="footer-left">EduPortal · Est. 2024</span>
          <div className="footer-dots">
            <div className="f-dot f-dot-1" />
            <div className="f-dot f-dot-2" />
            <div className="f-dot f-dot-3" />
          </div>
          <span className="footer-left">Built for Educators</span>
        </div>

      </div>
    </>
  );
};