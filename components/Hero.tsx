"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { particles, sora } from "./siteTheme";

const heroTypingText = "AI Projects - Smart Automation - Future Experiments";
const typingSpeed = 65;
const deletingSpeed = 36;
const pauseDuration = 2000;

type HeroProps = {
  websiteName: string;
};

function RobotIcon() {
  return (
    <div className="icon-shell relative rounded-[30px] p-[1.5px]">
      <div className="icon-border-spin absolute inset-0 rounded-[30px]" />
      <div className="icon-border-glow absolute inset-0 rounded-[30px]" />
      <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/5 shadow-[0_0_45px_rgba(255,42,42,0.22)] backdrop-blur-xl">
        <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_center,rgba(255,75,75,0.2),transparent_70%)]" />
        <svg aria-hidden="true" className="relative h-10 w-10 text-white" fill="none" viewBox="0 0 48 48">
          <rect x="11" y="14" width="26" height="19" rx="8" stroke="currentColor" strokeWidth="2.6" />
          <path d="M24 8v6M18 38h12M14 21h-2m24 0h-2" stroke="currentColor" strokeLinecap="round" strokeWidth="2.6" />
          <circle cx="19" cy="23" r="2.2" fill="#ff4b4b" />
          <circle cx="29" cy="23" r="2.2" fill="#ff4b4b" />
        </svg>
      </div>
    </div>
  );
}

export default function Hero({ websiteName }: HeroProps) {
  const router = useRouter();
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);



  useEffect(() => {
    const isComplete = displayText === heroTypingText;
    const isEmpty = displayText.length === 0;

    let timeout = typingSpeed;

    if (isDeleting) {
      if (!isEmpty) {
        timeout = deletingSpeed;
      } else {
        setIsDeleting(false);
        return;
      }
    } else if (isComplete) {
      timeout = pauseDuration;
    }

    const timer = window.setTimeout(() => {
      if (!isDeleting && !isComplete) {
        setDisplayText(heroTypingText.slice(0, displayText.length + 1));
        return;
      }

      if (!isDeleting && isComplete) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting) {
        setDisplayText(heroTypingText.slice(0, displayText.length - 1));
      }
    }, timeout);

    return () => window.clearTimeout(timer);
  }, [displayText, isDeleting]);

  return (
    <section className={`${sora.className} relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-6 pb-16 pt-[45px] text-white`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,42,42,0.18),transparent_30%),radial-gradient(circle_at_bottom,rgba(255,75,75,0.12),transparent_35%)]" />
      <div className="absolute inset-0 opacity-40">
        {particles.map((particle, index) => (
          <span key={index} className="particle absolute rounded-full bg-white/80" style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size, animationDelay: particle.delay, animationDuration: particle.duration, boxShadow: "0 0 18px rgba(255,255,255,0.45)" }} />
        ))}
      </div>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff4b4b]/60 to-transparent" />

      <button
        type="button"
        onClick={() => router.push("/admin/login")}
        aria-label="Open admin login"
        className="absolute right-5 top-5 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#0d0d0d]/95 text-[#e5e5e5] shadow-[0_0_18px_rgba(0,0,0,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ff2a2a]/65 hover:text-white hover:shadow-[0_0_24px_rgba(255,42,42,0.22)]"
      >
        <svg aria-hidden="true" className="h-5 w-5 text-[#ff2a2a]" fill="none" viewBox="0 0 24 24">
          <path d="M12 3 5 6v5c0 5 3.5 8.7 7 10 3.5-1.3 7-5 7-10V6z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
          <path d="M9.5 12 11 13.5 14.5 10" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
        </svg>
      </button>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <div className="hero-fade hero-float mb-8"><RobotIcon /></div>
        <div className="hero-fade hero-delay-1 mb-5">
          <div className="title-spotlight relative inline-flex justify-center px-6 py-4 sm:px-10">
            <div className="title-halo absolute inset-0" />
            <h1 className={`bitcount-title hero-title relative z-10 text-[24px] leading-none tracking-[0.04em] text-white sm:text-[34px] md:text-[50px] lg:text-[84px] xl:text-[104px]`}>
              <span className="hero-title-base">{websiteName.toUpperCase()}</span>
              <span className="hero-title-shimmer" aria-hidden="true">{websiteName.toUpperCase()}</span>
            </h1>
          </div>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.45em] text-[#ff4b4b] sm:text-base">Building Intelligent AI Systems.</p>
        </div>
        <div className="hero-fade hero-delay-2 mt-1 flex justify-center px-2">
          <div className="typing-wrap inline-block max-w-full text-center">
            <span className="typing-line text-sm font-medium tracking-[0.03em] text-[#9ca3af] sm:text-[15px] md:text-base">{displayText}</span>
            <span className="typing-cursor" aria-hidden="true">|</span>
          </div>
        </div>
        <div className="hero-fade hero-delay-3 mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link href="/explorer" prefetch className="group inline-flex min-w-[190px] items-center justify-center rounded-full border border-[#ff4b4b]/70 bg-[#ff2a2a] px-8 py-4 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(255,42,42,0.34)] active:scale-[0.98]">
            <span className="transition-transform duration-150 group-hover:scale-[1.02]">Explore Projects</span>
          </Link>
          <a href="https://github.com/" target="_blank" rel="noreferrer" className="group inline-flex min-w-[190px] items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ff4b4b]/70 hover:bg-white/10 hover:shadow-[0_0_24px_rgba(255,75,75,0.18)] active:scale-[0.98]">
            <span className="transition-colors duration-150 group-hover:text-white">View GitHub</span>
          </a>
        </div>
      </div>

      <style jsx>{`
        .hero-fade { opacity: 0; transform: translateY(22px); animation: heroFade 0.9s ease forwards; }
        .hero-delay-1 { animation-delay: 0.15s; }
        .hero-delay-2 { animation-delay: 0.3s; }
        .hero-delay-3 { animation-delay: 0.45s; }
        .hero-float { animation: heroFade 0.9s ease forwards, floatIcon 5s ease-in-out infinite 0.9s; }
        .typing-wrap { display: inline-block; width: auto; max-width: 100%; }
        .typing-line { display: inline-block; width: auto; min-height: 1.75rem; white-space: nowrap; }
        .typing-cursor { display: inline-block; margin-left: 1px; color: #ff2a2a; animation: blink 1s step-end infinite; }
        .icon-shell { box-shadow: 0 0 22px rgba(255, 42, 42, 0.14); }
        .icon-border-spin { background: conic-gradient(from 0deg, transparent 0deg 300deg, rgba(255, 42, 42, 0.95) 326deg, rgba(255, 103, 103, 0.8) 344deg, transparent 360deg); filter: blur(0.6px); animation: rotateBorder 3s linear infinite; }
        .icon-border-glow { background: conic-gradient(from 0deg, transparent 0deg 300deg, rgba(255, 42, 42, 0.42) 326deg, rgba(255, 96, 96, 0.3) 344deg, transparent 360deg); filter: blur(10px); opacity: 0.75; animation: rotateBorder 3s linear infinite; }
        .particle { animation: particleDrift linear infinite; }
        .title-spotlight { isolation: isolate; }
        .title-halo {
          background: radial-gradient(circle, rgba(255, 42, 42, 0.2) 0%, rgba(255, 42, 42, 0.08) 32%, transparent 68%);
          filter: blur(18px);
          transform: scale(1.08);
          animation: haloPulse 2.6s ease-in-out infinite;
        }
        .hero-title {
          position: relative;
          display: inline-grid;
          place-items: center;
        }
        .hero-title-base,
        .hero-title-shimmer {
          grid-area: 1 / 1;
        }
        .hero-title-base {
          color: rgba(255, 255, 255, 0.92);
          text-shadow:
            0 0 6px rgba(255, 42, 42, 0.14),
            0 0 16px rgba(255, 42, 42, 0.14),
            0 0 28px rgba(255, 42, 42, 0.1);
          animation: titleGlow 2.6s ease-in-out infinite;
        }
        .hero-title-shimmer {
          background-image: linear-gradient(90deg, transparent 0%, rgba(255, 42, 42, 0.96) 48%, transparent 100%);
          background-size: 240% 100%;
          background-position: -140% 50%;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          opacity: 0.9;
          filter: drop-shadow(0 0 10px rgba(255, 42, 42, 0.18));
          animation: titleSweep 2.5s linear infinite;
        }
        @keyframes heroFade { to { opacity: 1; transform: translateY(0); } }
        @keyframes floatIcon { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes rotateBorder { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes particleDrift { 0%, 100% { opacity: 0.25; transform: translate3d(0, 0, 0) scale(1); } 50% { opacity: 1; transform: translate3d(0, -12px, 0) scale(1.4); } }
        @keyframes titleGlow {
          0%, 100% {
            text-shadow:
              0 0 6px rgba(255, 42, 42, 0.14),
              0 0 16px rgba(255, 42, 42, 0.14),
              0 0 28px rgba(255, 42, 42, 0.1);
          }
          50% {
            text-shadow:
              0 0 8px rgba(255, 42, 42, 0.22),
              0 0 22px rgba(255, 42, 42, 0.22),
              0 0 38px rgba(255, 42, 42, 0.16);
          }
        }
        @keyframes haloPulse {
          0%, 100% {
            opacity: 0.62;
            transform: scale(1.04);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.1);
          }
        }
        @keyframes titleSweep {
          0% {
            background-position: -140% 50%;
          }
          100% {
            background-position: 140% 50%;
          }
        }
        @media (max-width: 767px) { .typing-line { white-space: normal; } }
      `}</style>
    </section>
  );
}
