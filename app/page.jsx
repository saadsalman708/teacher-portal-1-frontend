"use client"

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Tenor+Sans&display=swap');

        :root {
          --navy: #0B1120;
          --navy-mid: #131E35;
          --navy-card: #162040;
          --gold: #C9A84C;
          --gold-light: #E8C97A;
          --ivory: #F5F0E8;
          --ivory-muted: #C8C0AE;
          --divider: rgba(201,168,76,0.18);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        .portal-root {
          background: var(--navy);
          min-height: 100vh;
          font-family: 'Tenor Sans', sans-serif;
          color: var(--ivory);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Subtle grid overlay */
        .portal-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
          z-index: 0;
        }

        /* Radial glow top-right */
        .portal-root::after {
          content: '';
          position: absolute;
          top: -200px; right: -200px;
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 65%);
          pointer-events: none;
          z-index: 0;
        }

        .ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid var(--divider);
          pointer-events: none;
          z-index: 0;
        }

        /* --- Animated entrance --- */
        .fade-up {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.75s ease forwards;
        }
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        /* --- Content wrapper --- */
        .content-wrap {
          position: relative;
          z-index: 2;
          padding: 80px 32px 72px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100%;
          max-width: 780px;
        }

        /* Eyebrow */
        .eyebrow {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 28px;
          animation-delay: 0s;
        }
        .eyebrow-line { width: 40px; height: 1px; background: var(--gold); opacity: 0.55; }
        .eyebrow-text {
          font-size: 9.5px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--gold);
          opacity: 0.85;
        }

        /* Crest icon */
        .crest {
          width: 58px; height: 58px;
          border: 1px solid var(--divider);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 22px;
          background: rgba(201,168,76,0.06);
          animation-delay: 0.06s;
        }
        .crest-icon {
          font-size: 24px;
          color: var(--gold);
          /* Inline SVG school icon */
        }

        /* Headline */
        .headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(48px, 8vw, 72px);
          font-weight: 300;
          line-height: 1.02;
          color: var(--ivory);
          letter-spacing: -0.015em;
          margin-bottom: 8px;
          animation-delay: 0.1s;
        }
        .headline em { font-style: italic; color: var(--gold-light); }

        /* Decorative rule */
        .subtitle-rule {
          display: flex; align-items: center; gap: 18px;
          margin: 22px 0 20px;
          width: 100%; max-width: 480px;
          animation-delay: 0.18s;
        }
        .rule-line { flex: 1; height: 1px; background: var(--divider); }
        .rule-diamond {
          width: 7px; height: 7px;
          border: 1px solid var(--gold);
          transform: rotate(45deg);
          opacity: 0.65;
        }

        /* Description */
        .description {
          font-family: 'Cormorant Garamond', serif;
          font-size: 19px;
          font-weight: 300;
          font-style: italic;
          line-height: 1.7;
          color: var(--ivory-muted);
          max-width: 440px;
          margin-bottom: 44px;
          animation-delay: 0.24s;
        }

        /* Stat row */
        .stat-row {
          display: flex;
          border: 1px solid var(--divider);
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 48px;
          animation-delay: 0.3s;
        }
        .stat-item {
          padding: 16px 32px;
          border-right: 1px solid var(--divider);
          display: flex; flex-direction: column; gap: 3px;
          background: rgba(201,168,76,0.025);
        }
        .stat-item:last-child { border-right: none; }
        .stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          font-weight: 600;
          color: var(--gold-light);
          line-height: 1;
        }
        .stat-label {
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ivory-muted);
          opacity: 0.65;
        }

        /* Button row */
        .btn-row {
          display: flex; gap: 16px;
          animation-delay: 0.38s;
        }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--gold);
          color: var(--navy);
          padding: 15px 40px;
          font-family: 'Tenor Sans', sans-serif;
          font-size: 10.5px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 2px;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          border: none; cursor: pointer;
        }
        .btn-primary:hover {
          background: var(--gold-light);
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(201,168,76,0.18);
        }

        .btn-secondary {
          display: inline-flex; align-items: center; gap: 10px;
          background: transparent;
          color: var(--ivory);
          padding: 15px 40px;
          font-family: 'Tenor Sans', sans-serif;
          font-size: 10.5px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 2px;
          border: 1px solid rgba(245,240,232,0.18);
          transition: border-color 0.2s, color 0.2s, transform 0.15s;
          cursor: pointer;
        }
        .btn-secondary:hover {
          border-color: var(--gold);
          color: var(--gold-light);
          transform: translateY(-2px);
        }

        /* Feature cards */
        .features-row {
          display: flex; gap: 14px;
          margin-top: 60px;
          width: 100%;
          animation-delay: 0.48s;
        }
        .feature-card {
          flex: 1;
          background: var(--navy-card);
          border: 1px solid var(--divider);
          border-radius: 3px;
          padding: 24px 20px;
          display: flex; flex-direction: column; align-items: flex-start; gap: 10px;
          transition: border-color 0.25s, background 0.25s, transform 0.2s;
          text-align: left;
        }
        .feature-card:hover {
          border-color: rgba(201,168,76,0.4);
          background: rgba(201,168,76,0.045);
          transform: translateY(-3px);
        }
        .feature-icon {
          width: 38px; height: 38px;
          background: rgba(201,168,76,0.07);
          border: 1px solid rgba(201,168,76,0.14);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }
        .feature-title {
          font-size: 10.5px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ivory);
          font-weight: 500;
        }
        .feature-desc {
          font-family: 'Cormorant Garamond', serif;
          font-size: 14px;
          font-weight: 300;
          font-style: italic;
          color: var(--ivory-muted);
          line-height: 1.55;
        }

        /* Bottom footer rule */
        .footer-rule {
          margin-top: 52px;
          display: flex; align-items: center; gap: 14px;
          opacity: 0.3;
          animation-delay: 0.56s;
        }
        .footer-rule-line { width: 52px; height: 1px; background: var(--gold); }
        .footer-rule-text {
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--gold);
        }

        @media (max-width: 600px) {
          .features-row { flex-direction: column; }
          .stat-item { padding: 14px 22px; }
          .btn-row { flex-direction: column; width: 100%; }
          .btn-primary, .btn-secondary { justify-content: center; }
        }
      `}</style>

      <div className="portal-root">
        {/* Background decorative rings */}
        <div className="ring" style={{ width: 500, height: 500, top: -120, right: -120 }} />
        <div className="ring" style={{ width: 360, height: 360, top: -50, right: -50 }} />
        <div className="ring" style={{ width: 220, height: 220, top: 20, right: 20 }} />

        <div className="content-wrap">

          {/* Eyebrow */}
          <div className={`eyebrow fade-up ${mounted ? '' : ''}`} style={{ animationDelay: '0s' }}>
            <div className="eyebrow-line" />
            <span className="eyebrow-text">Academic Excellence Platform</span>
            <div className="eyebrow-line" />
          </div>

          {/* Crest */}
          <div className="crest fade-up" style={{ animationDelay: '0.06s' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#C9A84C' }}>
              <path d="M22 9L12 5L2 9l10 4l10-4z"/>
              <path d="M6 10.6V16a6 6 0 0 0 12 0v-5.4"/>
              <line x1="12" y1="22" x2="12" y2="13"/>
            </svg>
          </div>

          {/* Headline */}
          <h1 className="headline fade-up" style={{ animationDelay: '0.1s' }}>
            The <em>Teacher</em><br/>Portal
          </h1>

          {/* Ornamental rule */}
          <div className="subtitle-rule fade-up" style={{ animationDelay: '0.18s' }}>
            <div className="rule-line" />
            <div className="rule-diamond" />
            <div className="rule-line" />
          </div>

          {/* Description */}
          <p className="description fade-up" style={{ animationDelay: '0.24s' }}>
            A distinguished environment for educators to manage student records
            with precision, clarity, and absolute security.
          </p>

          {/* Stats */}
          <div className="stat-row fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="stat-item">
              <span className="stat-num">4</span>
              <span className="stat-label">Core Tools</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">256‑bit</span>
              <span className="stat-label">Encryption</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">∞</span>
              <span className="stat-label">Students</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="btn-row fade-up" style={{ animationDelay: '0.38s' }}>
            <Link href="/login" className="btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
              Enter Portal
            </Link>
            <Link href="/signup" className="btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="8.5" cy="7" r="4"/>
                <line x1="20" y1="8" x2="20" y2="14"/>
                <line x1="23" y1="11" x2="17" y2="11"/>
              </svg>
              Register
            </Link>
          </div>

          {/* Feature cards */}
          <div className="features-row fade-up" style={{ animationDelay: '0.48s' }}>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <span className="feature-title">Student Records</span>
              <span className="feature-desc">Create, view, and manage every student profile in a single, elegant dashboard.</span>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </div>
              <span className="feature-title">Instant Updates</span>
              <span className="feature-desc">Edit and refresh student records with real-time precision and ease.</span>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <span className="feature-title">Secure Access</span>
              <span className="feature-desc">Role-based authentication protecting every record at every moment.</span>
            </div>
          </div>

          {/* Footer ornament */}
          <div className="footer-rule fade-up" style={{ animationDelay: '0.56s' }}>
            <div className="footer-rule-line" />
            <span className="footer-rule-text">Est. MMXXIV · Crafted for Educators</span>
            <div className="footer-rule-line" />
          </div>

        </div>
      </div>
    </>
  );
}