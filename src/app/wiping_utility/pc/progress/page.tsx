'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';

type LogItem = { t: string; msg: string };

type Certificate = {
  id: string;
  device: string;
  method: string;
  startedAt: string;
  finishedAt: string;
  signature: string;
  sha256?: string;
  pdfDataUrl?: string;
};

export default function PcProgressPage() {
  const startedRef = useRef<string>(new Date().toISOString());

  // timers we can stop at 100%
  const progressTimerRef = useRef<number | null>(null);
  const stepTimerRef = useRef<number | null>(null);

  // ui state
  const [progress, setProgress] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [done, setDone] = useState(false);

  // modal state for signed PDF download
  const [cert, setCert] = useState<Certificate | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalBusy, setModalBusy] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const plannedSteps = useMemo(() => {
    const method =
      Math.random() > 0.5
        ? 'NVMe Format/Sanitize (NIST 800‑88)'
        : 'ATA Secure Erase Enhanced (NIST 800‑88)';
    return [
      'Detecting storage devices…',
      `Selected best method: ${method} (simulated)…`,
      'Pre‑wipe checks: SMART baseline, power safety, capabilities…',
      'Executing secure erase routine…',
      'Post‑wipe validation: device self‑report + random verify…',
      'Finalizing logs and generating certificate…'
    ];
  }, []);

  function pushLog(msg: string) {
    const ts = new Date().toLocaleTimeString([], { hour12: false });
    setLogs((prev) => [...prev, { t: ts, msg }]);
  }

  function randomHex(bytes: number) {
    const a = new Uint8Array(bytes);
    crypto.getRandomValues(a);
    return Array.from(a).map((x) => x.toString(16).padStart(2, '0')).join('');
  }

  // drive progress + step logs until 100%
  useEffect(() => {
    progressTimerRef.current = window.setInterval(() => {
      setProgress((p) => Math.min(100, p + Math.max(1, Math.round(Math.random() * 7))));
    }, 300);

    let i = -1;
    stepTimerRef.current = window.setInterval(() => {
      i++;
      const idx = Math.min(i, plannedSteps.length - 1);
      setStepIdx(idx);
      pushLog(plannedSteps[idx]);
    }, 900);

    return () => {
      if (progressTimerRef.current) window.clearInterval(progressTimerRef.current);
      if (stepTimerRef.current) window.clearInterval(stepTimerRef.current);
    };
  }, [plannedSteps]);

  // auto-scroll logs
  useEffect(() => {
    if (scrollerRef.current) scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
  }, [logs]);

  // finalize at 100%: stop timers, freeze logs, prepare cert (no JSON button)
  useEffect(() => {
    if (progress >= 100 && !done) {
      setDone(true);
      setStepIdx(plannedSteps.length - 1);

      // stop both intervals
      if (progressTimerRef.current) {
        window.clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
      }
      if (stepTimerRef.current) {
        window.clearInterval(stepTimerRef.current);
        stepTimerRef.current = null;
      }

      pushLog('Completed successfully.');

      const finishedAt = new Date().toISOString();
      setCert({
        id: randomHex(8),
        device: 'Demo PC',
        method: 'Auto‑selected per drive (NVMe/ATA/TRIM)',
        startedAt: startedRef.current,
        finishedAt,
        signature: 'PENDING_SERVER_SIGNATURE',
        sha256: randomHex(32)
      });
    }
  }, [progress, done, plannedSteps.length]);

  // modal: simulate online check + signed PDF fetch
  async function confirmAndDownload() {
    setModalError(null);

    if (!navigator.onLine) {
      setModalError('No internet connection detected. Please connect and try again.');
      return;
    }

    setModalBusy(true);

    // Simulate calling signing service and returning a signed PDF as data URL
    await new Promise((r) => setTimeout(r, 1200));

    const pdfDataUrl =
      'application/pdf;base64,JVBERi0xLjQKJcTl8uXrp/OgCjEgMCBvYmoKPj4KZW5kb2JqCnhyZWYKMCAwCjAwMDAwMDAwMDAgNjU1MzUgZiAKdHJhaWxlcgo8PC9Sb290IDEgMCBSPj4Kc3RhcnR4cmVmCjAKJSVFT0Y=';

    // attach “signed” artifact to cert
    setCert((c) => (c ? { ...c, signature: 'SERVER_SIGNED_DEMO', pdfDataUrl } : c));

    // download now
    if (pdfDataUrl) {
      const a = document.createElement('a');
      a.href = pdfDataUrl;
      a.download = `bitwiperz-certificate-${cert?.id || 'demo'}.pdf`;
      a.click();
    }

    setModalBusy(false);
    setModalOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#0b0f13] text-[#e6eef8] flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">PC Wipe in Progress</h1>
          <p className="mt-1 text-sm text-[#9fb2c8]">
            Automatic, standards‑aligned workflow; do not power off.
          </p>
        </header>

        <section className="rounded-2xl border border-[#243041] bg-[#121821] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]">
          {/* Progress */}
          <div className="mb-3">
            <div className="h-3 w-full overflow-hidden rounded-lg border border-[#2f3c52] bg-[#17202b]">
              <div
                className="h-full bg-gradient-to-r from-[#7bb0ff] via-[#4e8bff] to-[#3b7afd] transition-[width] duration-200 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-[#9fb2c8]">
              <span>
                Step {Math.min(stepIdx + 1, plannedSteps.length)} of {plannedSteps.length}
              </span>
              <span>{progress}%</span>
            </div>
          </div>

          {/* Current step */}
          <div className="rounded-lg border border-[#2e3b4f] bg-[#0f141b] p-3 text-sm text-[#cfe0ff]">
            {plannedSteps[stepIdx] || 'Preparing…'}
          </div>

          {/* Logs (frozen at 100% because timers are cleared) */}
          <div
            ref={scrollerRef}
            className="mt-3 h-56 overflow-auto rounded-lg border border-[#2e3b4f] bg-[#0b0f13] p-3 text-xs"
          >
            {logs.length === 0 ? (
              <div className="text-[#9fb2c8]">Initializing…</div>
            ) : (
              logs.map((line, i) => (
                <div key={i} className="grid grid-cols-[64px_1fr] gap-2">
                  <span className="text-[#7ea1d1]">{line.t}</span>
                  <span className="text-[#a9bbd4]">• {line.msg}</span>
                </div>
              ))
            )}
          </div>

          {/* Footer actions (only after done) */}
          {done && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Link
                href="/"
                className="rounded-md border border-[#2e3b4f] bg-[#121821] px-4 py-2 text-xs text-[#e6eef8] hover:bg-[#1a2230]"
                title="Skip certificate and continue"
              >
                Continue without certificate
              </Link>

              <button
                onClick={() => setModalOpen(true)}
                className="rounded-md border border-[#2b5fcb] bg-[#4ea1ff] px-4 py-2 text-xs font-medium text-[#0b0f13] hover:bg-[#6bb0ff]"
              >
                Download signed certificate (PDF)
              </button>
            </div>
          )}
        </section>

        <footer className="mt-6 text-center text-xs text-[#9fb2c8]">
          BitWiperz • Professional Device Wiping
        </footer>
      </div>

      {/* Internet-required download modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-[2px]">
          <div className="w-[480px] rounded-xl border border-[#2e3b4f] bg-[#0f141b] p-5 shadow-2xl">
            <h3 className="text-lg font-semibold">Download Digitally Signed Certificate</h3>
            <p className="mt-2 text-sm text-[#9fb2c8]">
              Connect to the internet so the server can sign the certificate and return a PDF.
            </p>
            {modalError && (
              <div className="mt-3 rounded-md border border-[#5e2b2b] bg-[#2a1414] px-3 py-2 text-xs text-[#ffb3b3]">
                {modalError}
              </div>
            )}
            <div className="mt-5 flex justify-end gap-2">
              <button
                disabled={modalBusy}
                onClick={() => setModalOpen(false)}
                className="rounded-md border border-[#2e3b4f] bg-[#121821] px-4 py-2 text-sm text-[#e6eef8] hover:bg-[#1a2230]"
              >
                Cancel
              </button>
              <button
                disabled={modalBusy}
                onClick={confirmAndDownload}
                className="rounded-md bg-[#4ea1ff] px-4 py-2 text-sm text-[#0b0f13] hover:bg-[#6bb0ff]"
              >
                {modalBusy ? 'Fetching…' : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
