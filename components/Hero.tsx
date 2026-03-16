"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { montserrat, inter, jetBrainsMono, sora, particles } from "./siteTheme";

import type { InstallCommand } from "@/lib/site-data";

type HeroProps = {
  websiteName: string;
  installCommands: InstallCommand[];
};

export default function Hero({ websiteName, installCommands }: HeroProps) {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeCommand, setActiveCommand] = useState("");
  
  // Animation state for the rotating headline
  const words = ["automation", "builders", "developers", "agents", "creators"];
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedWord, setDisplayedWord] = useState("");
  const [phase, setPhase] = useState<"TYPING" | "PAUSE_FULL" | "DELETING" | "PAUSE_EMPTY">("TYPING");

  useEffect(() => {
    setMounted(true);
    
    // OS Detection
    const ua = window.navigator.userAgent.toLowerCase();
    let detectedOS = "Linux"; // Default
    if (ua.indexOf("win") !== -1) detectedOS = "Windows";
    else if (ua.indexOf("mac") !== -1 || ua.indexOf("iphone") !== -1 || ua.indexOf("ipad") !== -1) detectedOS = "Mac";
    
    // Find matching command from Supabase data
    const match = installCommands.find(c => c.osName.toLowerCase() === detectedOS.toLowerCase());
    
    if (match) {
      setActiveCommand(match.command);
    } else {
      // Standard Fallbacks if row is missing
      if (detectedOS === "Windows") {
        setActiveCommand('powershell -c "irm https://agelent.dev/install.ps1 | iex"');
      } else {
        setActiveCommand('curl -fsSL https://agelent.dev/install.sh | bash');
      }
    }
  }, [installCommands]);

  // Terminal-style Typing/Backspacing Logic
  useEffect(() => {
    if (!mounted) return;

    const currentFullWord = words[wordIndex];
    let timeout: NodeJS.Timeout;

    if (phase === "TYPING") {
      if (displayedWord.length < currentFullWord.length) {
        timeout = setTimeout(() => {
          setDisplayedWord(currentFullWord.slice(0, displayedWord.length + 1));
        }, 60);
      } else {
        setPhase("PAUSE_FULL");
      }
    } else if (phase === "PAUSE_FULL") {
      timeout = setTimeout(() => {
        setPhase("DELETING");
      }, 4000);
    } else if (phase === "DELETING") {
      if (displayedWord.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedWord(displayedWord.slice(0, -1));
        }, 40);
      } else {
        setPhase("PAUSE_EMPTY");
      }
    } else if (phase === "PAUSE_EMPTY") {
      timeout = setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % words.length);
        setPhase("TYPING");
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [displayedWord, phase, wordIndex, mounted]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  if (!mounted) return <div className="min-h-screen bg-[#050505]" />;

  return (
    <section className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050505] px-6 py-20 text-white ${inter.className}`}>
      
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,42,42,0.15),transparent_50%)]" />
        <div className="absolute inset-0 opacity-30">
          {particles.map((particle, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0.1 }}
              animate={{ 
                opacity: [0.1, 0.6, 0.1],
                y: [0, -20, 0] 
              }}
              transition={{ 
                duration: parseFloat(particle.duration), 
                repeat: Infinity, 
                delay: parseFloat(particle.delay) 
              }}
              className="absolute rounded-full bg-white"
              style={{ 
                left: particle.left, 
                top: particle.top, 
                width: particle.size, 
                height: particle.size,
                boxShadow: "0 0 10px rgba(255,255,255,0.4)"
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
        
        {/* Logo Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-10"
        >
          <div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-[#ff3b3b]/20 blur-3xl" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/5 shadow-[0_0_40px_rgba(255,59,59,0.2)] backdrop-blur-xl">
            <svg aria-hidden="true" className="h-10 w-10 text-white" fill="none" viewBox="0 0 48 48">
              <rect x="11" y="14" width="26" height="19" rx="8" stroke="currentColor" strokeWidth="2.6" />
              <path d="M24 8v6M18 38h12M14 21h-2" stroke="currentColor" strokeLinecap="round" strokeWidth="2.6" />
              <circle cx="19" cy="23" r="2.2" fill="#ff3b3b" />
              <circle cx="29" cy="23" r="2.2" fill="#ff3b3b" />
            </svg>
          </div>
        </motion.div>

        {/* AI Status Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-6 flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-1.5 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
          </span>
          <span className={`${jetBrainsMono.className} text-[11px] font-medium uppercase tracking-[0.2em] text-orange-200/80`}>
            Thinking...
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className={`${montserrat.className} mb-6 w-full px-2 text-[clamp(18px,7vw,28px)] font-bold leading-[1.2] tracking-tighter text-[#f5f5f5] break-keep sm:text-[54px] md:text-[78px]`}
        >
          Built for{" "}
          <span className="inline-block text-[#ff3b3b] whitespace-nowrap">
            &gt;{" "}
            <span className="relative">
              {displayedWord}
              <motion.span 
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                className="inline-block h-[0.8em] w-[3px] bg-[#ff3b3b] ml-1.5 align-middle"
              />
            </span>
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-12 max-w-2xl px-6 text-lg leading-relaxed text-zinc-400 sm:text-xl"
        >
          Create AI agents, automation, and developer tools faster with {websiteName}.
        </motion.p>

        {/* Terminal Install Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="group relative w-full max-w-2xl px-2"
        >
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="flex w-full items-center overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm transition-all duration-300 group-hover:border-[#ff3b3b]/30 group-hover:bg-zinc-900/80">
              <div className="flex h-12 items-center gap-2 border-r border-white/10 bg-white/5 px-4 text-sm font-medium text-zinc-300">
                <svg className="h-4 w-4 text-[#ff3b3b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3" />
                </svg>
                <span className="hidden sm:inline">Install Agelent</span>
              </div>
              <div className={`flex-1 overflow-hidden px-4 py-3 text-left font-mono text-sm text-zinc-400 ${jetBrainsMono.className}`}>
                <div className="whitespace-nowrap overflow-x-auto custom-scrollbar">
                  {activeCommand}
                </div>
              </div>
              <button
                onClick={handleCopy}
                className="flex h-12 w-12 items-center justify-center border-l border-white/10 bg-white/5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.svg 
                      key="check" 
                      initial={{ scale: 0.5, opacity: 0 }} 
                      animate={{ scale: 1, opacity: 1 }} 
                      exit={{ scale: 0.5, opacity: 0 }}
                      className="h-5 w-5 text-green-400" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth="2.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </motion.svg>
                  ) : (
                    <motion.svg 
                      key="copy" 
                      initial={{ scale: 0.5, opacity: 0 }} 
                      animate={{ scale: 1, opacity: 1 }} 
                      exit={{ scale: 0.5, opacity: 0 }}
                      className="h-5 w-5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Secondary Actions */}
          <div className="mt-8 text-sm text-zinc-500">
            Or explore the{" "}
            <Link href="/explorer" className="!text-white hover:!text-[#ff3b3b] underline decoration-zinc-700 underline-offset-4 transition-colors">
              projects
            </Link>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 0px;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
}
