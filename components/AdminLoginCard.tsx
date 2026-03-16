"use client";

import { useState } from "react";

export default function AdminLoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const response = await fetch("/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = (await response.json()) as { error?: string };
    if (!response.ok) {
      setIsSubmitting(false);
      setError(data.error ?? "Invalid email or password");
      return;
    }

    window.location.href = "/admin/dashboard";
  }

  return (
    <div className="w-full max-w-xl overflow-hidden rounded-[30px] border border-[#ff2a2a]/20 bg-[#050505] shadow-[0_0_60px_rgba(255,42,42,0.12)]">
      <div className="border-b border-[#ff2a2a]/20 bg-[linear-gradient(180deg,rgba(255,42,42,0.12),rgba(255,42,42,0.03))] px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56] shadow-[0_0_12px_rgba(255,95,86,0.4)]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e] shadow-[0_0_12px_rgba(255,189,46,0.3)]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f] shadow-[0_0_12px_rgba(39,201,63,0.3)]" />
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#ff8d8d]">auth.session.terminal</span>
        </div>
      </div>

      <div className="relative bg-[linear-gradient(180deg,rgba(8,8,8,0.98),rgba(3,3,3,1))] p-6 text-[#d7d7d7] sm:p-8">
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:100%_24px]" />

        <div className="relative rounded-[24px] border border-white/8 bg-black/45 p-6 font-mono sm:p-7">
          <div className="text-[11px] uppercase tracking-[0.25em] text-[#ff5c5c]">admin access</div>
          <h1 className="mt-4 text-[18px] font-semibold tracking-[-0.03em] text-white sm:text-[22px]">Admin Login</h1>
          <p className="mt-3 max-w-lg text-sm leading-7 text-[#8f8f8f]">
            Authenticate with your admin email and password to unlock the Agelent control shell.
          </p>

          <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-[#7e7e7e]">email</span>
              <div className="flex items-center rounded-[18px] border border-white/10 bg-[#080808] px-4 py-3 focus-within:border-[#ff2a2a]/60">
                <span className="mr-3 text-[#ff2a2a]">&gt;</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@agelent.dev"
                  autoComplete="email"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#5f5f5f]"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-[#7e7e7e]">password</span>
              <div className="flex items-center rounded-[18px] border border-white/10 bg-[#080808] px-4 py-3 focus-within:border-[#ff2a2a]/60">
                <span className="mr-3 text-[#ff2a2a]">#</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#5f5f5f]"
                />
              </div>
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-between rounded-[18px] border border-[#ff2a2a]/45 bg-[linear-gradient(180deg,rgba(255,42,42,0.16),rgba(255,42,42,0.05))] px-5 py-4 text-sm font-semibold text-white transition-all duration-150 hover:border-[#ff2a2a]/75 hover:bg-[linear-gradient(180deg,rgba(255,42,42,0.24),rgba(255,42,42,0.08))] hover:shadow-[0_0_24px_rgba(255,42,42,0.18)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span>{isSubmitting ? "Authorizing..." : "Execute Login"}</span>
              <span className="text-[#ff8d8d]">&gt;_</span>
            </button>
          </form>

          {error ? <p className="mt-4 text-sm text-[#ff8d8d]">{error}</p> : null}
        </div>
      </div>
    </div>
  );
}
