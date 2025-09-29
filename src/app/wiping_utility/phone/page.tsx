'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StartPhoneWorkflow() {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function proceed() {
    setConfirmOpen(false);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400)); // simulate quick capability scan
    router.push('/wiping_utility/phone');
  }

  return (
    <div className="min-h-screen bg-[#0b0f13] text-[#e6eef8] flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Start Phone Wipe</h1>
          <p className="mt-2 text-sm text-[#9fb2c8]">
            One‑click mode: the utility guides device prep and auto‑selects the safest steps for sanitization.
          </p>
        </header>

        <div className="rounded-2xl border border-[#243041] bg-[#121821] p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]">
          <div className="flex flex-col items-center justify-center gap-6">
            <button
              onClick={() => setConfirmOpen(true)}
              className="group relative h-40 w-40 rounded-full bg-[#4ea1ff] text-[#0b0f13] text-lg font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.35)] ring-1 ring-[#2b5fcb] transition hover:scale-[1.03] hover:bg-[#6bb0ff] focus:outline-none focus:ring-2 focus:ring-[#7dc0ff]"
            >
              Start Wipe
              <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-transparent group-hover:ring-white/20" />
            </button>

            <div className="text-center text-[#9fb2c8] text-sm">
              No manual selection needed; the engine finds the best suitable erase method automatically.
            </div>
          </div>
        </div>

        <footer className="mt-8 text-center text-xs text-[#9fb2c8]">
          BitWiperz • Professional Device Wiping
        </footer>
      </div>

      {/* Warning dialog */}
      {confirmOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-[480px] rounded-xl border border-[#2e3b4f] bg-[#0f141b] p-5 shadow-2xl">
            <h3 className="text-lg font-semibold">Confirm action</h3>
            <p className="mt-2 text-sm text-[#9fb2c8]">
              This will restart the workflow and begin preparation; unsaved work may be lost. Continue?
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setConfirmOpen(false)}
                className="rounded-md border border-[#2e3b4f] bg-[#121821] px-4 py-2 text-sm text-[#e6eef8] hover:bg-[#1a2230] focus:outline-none focus:ring-2 focus:ring-[#4ea1ff]/40"
              >
                Cancel
              </button>
              <button
                onClick={proceed}
                className="rounded-md bg-[#ef4444] px-4 py-2 text-sm text-[#0b0f13] hover:bg-[#f16969] focus:outline-none focus:ring-2 focus:ring-[#ef4444]/50"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loader modal */}
      {loading && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-black/80">
          <div className="text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-neutral-700 border-t-[#7bb0ff]" />
            <div className="text-sm text-[#cfe0ff]">Finding best suitable erase method…</div>
          </div>
        </div>
      )}
    </div>
  );
}
