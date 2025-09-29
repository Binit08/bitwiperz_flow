'use client';

import Link from 'next/link';

export default function WipingHome() {
  return (
    <div className="min-h-screen bg-[#0b0f13] text-[#e6eef8] flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">BitWiperz • Utility</h1>
          <p className="text-sm text-[#9fb2c8] mt-2">Choose what to erase — the engine auto‑selects the safest standards‑aligned method.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {/* PC card */}
          <Link
            href="/wiping_utility/pc"
            className="group relative rounded-2xl border border-[#243041] bg-[#121821] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset] focus:outline-none focus:ring-2 focus:ring-[#4ea1ff]/60 hover:border-[#345074] transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="mt-1 rounded-xl bg-[#1e2937] p-3 ring-1 ring-[#243041] group-hover:ring-[#345074] transition-colors">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M3 5h18v10H3z" stroke="#82b7ff" strokeWidth="1.5" />
                  <path d="M8 19h8" stroke="#82b7ff" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Erase storage of PC</h2>
                <p className="mt-1 text-sm text-[#9fb2c8]">
                  Auto‑detects NVMe/SATA/USB and chooses NVMe Format, ATA Secure Erase, or a safe fallback.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#4ea1ff] px-4 py-2 text-[#0b0f13]">
                  Start PC workflow
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M13 5l7 7-7 7M5 12h14" stroke="#0b0f13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-[#4ea1ff]/30" />
          </Link>

          {/* Phone card */}
          <Link
            href="/wiping_utility/phone"
            className="group relative rounded-2xl border border-[#243041] bg-[#121821] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset] focus:outline-none focus:ring-2 focus:ring-[#4ea1ff]/60 hover:border-[#345074] transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="mt-1 rounded-xl bg-[#1e2937] p-3 ring-1 ring-[#243041] group-hover:ring-[#345074] transition-colors">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <rect x="7" y="3" width="10" height="18" rx="2" stroke="#82ffcf" strokeWidth="1.5" />
                  <circle cx="12" cy="17" r="1" fill="#82ffcf" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Erase phone</h2>
                <p className="mt-1 text-sm text-[#9fb2c8]">
                  Guides through Android workflow and prepares device‑specific steps for secure sanitization.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#2e3b4f] px-4 py-2 text-[#e6eef8] bg-[#1e2937]">
                  Start phone workflow
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M13 5l7 7-7 7M5 12h14" stroke="#e6eef8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-[#4ea1ff]/20" />
          </Link>
        </div>

        <footer className="mt-8 flex items-center justify-between text-xs text-[#9fb2c8]">
          <span>BitWiperz • Professional Device Wiping</span>
          <span>Dark theme • One‑click UX</span>
        </footer>
      </div>
    </div>
  );
}
