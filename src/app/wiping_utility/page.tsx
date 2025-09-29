'use client';

import { useEffect, useRef, useState } from 'react';

type Step = 'welcome' | 'phoneInfo' | 'pcStart' | 'wiping' | 'cert';

type Bus = 'NVMe' | 'SATA' | 'USB' | 'eMMC';

interface Drive {
  name: string;
  bus: Bus;
  nvmeSanitize?: boolean;
  ataSecureErase?: boolean;
}

interface Certificate {
  id: string;
  device: string;
  method: string;
  startedAt: string;
  finishedAt: string;
  signature: string;
  sha256?: string;
  pdfDataUrl?: string;
}

export default function Kiosk() {
  const [step, setStep] = useState<Step>('welcome');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [cert, setCert] = useState<Certificate | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
    };
  }, []);

  function reset() {
    setStep('welcome');
    setBusy(false);
    setProgress(0);
    setLogs([]);
    setCert(null);
  }

  function randomHex(bytes: number) {
    const a = new Uint8Array(bytes);
    crypto.getRandomValues(a);
    return Array.from(a).map((x) => x.toString(16).padStart(2, '0')).join('');
  }

  // Simulated hardware enumeration
  function detectDrives(): Drive[] {
    // Example set; tweak as desired for demos
    return [
      { name: 'Samsung 980 NVMe', bus: 'NVMe', nvmeSanitize: true },
      { name: 'WD Blue SATA', bus: 'SATA', ataSecureErase: true }
    ];
  }

  function chooseBestMethod(d: Drive): string {
    if (d.bus === 'NVMe' && d.nvmeSanitize) return 'NVMe Format/Sanitize (NIST 800-88 Clear/Purge)';
    if (d.bus === 'SATA' && d.ataSecureErase) return 'ATA Secure Erase Enhanced (NIST 800-88)';
    if (d.bus === 'USB') return 'blkdiscard + TRIM where supported, else single‑pass zero';
    return 'Single‑pass zero with verify (fallback)';
  }

  async function startWipe() {
    setBusy(true);
    setStep('wiping');
    setLogs((l) => [...l, 'Initializing wipe workflow…']);

    // Progress ticker
    timerRef.current = window.setInterval(() => {
      setProgress((p) => Math.min(100, p + Math.max(1, Math.round(Math.random() * 7))));
    }, 300);

    // Auto detect drives and choose best method
    const drives = detectDrives();
    setLogs((l) => [...l, `Detected ${drives.length} storage device(s).`]);

    for (const d of drives) {
      const method = chooseBestMethod(d);
      setLogs((l) => [...l, `Selected method for ${d.name}: ${method}.`]);
      await new Promise((r) => setTimeout(r, 400));
      setLogs((l) => [...l, 'Pre‑wipe checks: SMART baseline, power safety, capabilities verified.']);
      await new Promise((r) => setTimeout(r, 400));
      setLogs((l) => [...l, 'Executing wipe routine (simulated)…']);
      await new Promise((r) => setTimeout(r, 800));
      setLogs((l) => [...l, 'Post‑wipe validation: random spot‑checks and device self‑report.']);
      await new Promise((r) => setTimeout(r, 400));
    }

    // Finish up
    await new Promise((r) => setTimeout(r, 900));
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
    setProgress(100);

    const started = new Date(Date.now() - 60_000).toISOString();
    const finished = new Date().toISOString();

    // Tiny valid demo PDF as data URL (placeholder)
    const pdfDataUrl =
      'application/pdf;base64,JVBERi0xLjQKJcTl8uXrp/OgCjEgMCBvYmoKPj4KZW5kb2JqCnhyZWYKMCAwCjAwMDAwMDAwMDAgNjU1MzUgZiAKdHJhaWxlcgo8PC9Sb290IDEgMCBSPj4Kc3RhcnR4cmVmCjAKJSVFT0Y=';

    const certObj: Certificate = {
      id: randomHex(8),
      device: 'Demo PC',
      method: 'Auto‑selected per device capabilities (NVMe/ATA/TRIM)',
      startedAt: started,
      finishedAt: finished,
      signature: 'DEMO_UNSIGNED',
      sha256: randomHex(32),
      pdfDataUrl
    };

    setCert(certObj);
    setBusy(false);
    setStep('cert');
  }

  function downloadJSON() {
    if (!cert) return;
    const blob = new Blob([JSON.stringify(cert, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bitwiperz-certificate-${cert.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function downloadPDF() {
    if (!cert?.pdfDataUrl) return;
    const a = document.createElement('a');
    a.href = cert.pdfDataUrl;
    a.download = `bitwiperz-certificate-${cert.id}.pdf`;
    a.click();
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#000',
        color: '#e6eef8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24
      }}
    >
      <div style={{ width: 'min(960px, 100%)' }}>
        <header style={{ marginBottom: 24, textAlign: 'center' }}>
          <h1 style={{ fontSize: 36, margin: 0 }}>BitWiperz • Kiosk</h1>
          <p style={{ opacity: 0.7, marginTop: 6 }}>Secure Wipe Environment (Demo)</p>
        </header>

        {step === 'welcome' && (
          <Card title="Select Target">
            <p style={{ opacity: 0.8 }}>
              Choose what to sanitize; this demo simulates PC and Phone flows.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 14 }}>
              <Btn onClick={() => setStep('pcStart')}>PC</Btn>
              <Btn onClick={() => setStep('phoneInfo')}>Phone</Btn>
            </div>
          </Card>
        )}

        {step === 'phoneInfo' && (
          <Card title="Phone (Android)">
            <p style={{ opacity: 0.8 }}>
              Phone wiping requires an Android‑specific workflow; this demo currently showcases only the PC path.
            </p>
            <div style={{ marginTop: 14 }}>
              <Btn onClick={() => setStep('welcome')}>Back</Btn>
            </div>
          </Card>
        )}

        {step === 'pcStart' && (
          <Card title="Ready to Wipe">
            <p style={{ opacity: 0.8 }}>
              One‑click mode: the system will auto‑select the safest standards‑aligned method per drive.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 14 }}>
              <BtnDanger disabled={busy} onClick={startWipe}>Start Wipe</BtnDanger>
              <Btn onClick={() => setStep('welcome')}>Cancel</Btn>
            </div>
          </Card>
        )}

        {step === 'wiping' && (
          <Card title="Wiping…">
            <div style={{ marginBottom: 10 }}>
              <div style={{ height: 12, background: '#17202b', borderRadius: 8, overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${progress}%`,
                    height: '100%',
                    background: '#4ea1ff',
                    transition: 'width 0.25s ease'
                  }}
                />
              </div>
              <p style={{ marginTop: 8, opacity: 0.7 }}>{progress}%</p>
            </div>
            <div
              style={{
                height: 160,
                overflow: 'auto',
                border: '1px solid #243041',
                borderRadius: 10,
                padding: 10,
                background: '#0b0f13'
              }}
            >
              {logs.map((l, i) => (
                <div key={i} style={{ fontSize: 13, opacity: 0.85 }}>
                  • {l}
                </div>
              ))}
            </div>
          </Card>
        )}

        {step === 'cert' && cert && (
          <Card title="Wipe Certificate">
            <p style={{ opacity: 0.85 }}>
              Wipe completed and a verifiable certificate artifact was generated for audit and validation.
            </p>
            <div style={{ marginTop: 10, display: 'grid', gap: 6, fontSize: 14 }}>
              <div>ID: {cert.id}</div>
              <div>Device: {cert.device}</div>
              <div>Method: {cert.method}</div>
              <div>Started: {cert.startedAt}</div>
              <div>Finished: {cert.finishedAt}</div>
              {cert.sha256 && <div>SHA256: {cert.sha256}</div>}
              <div>Signature: {cert.signature}</div>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 14 }}>
              <Btn onClick={downloadJSON}>Download JSON</Btn>
              <Btn onClick={downloadPDF}>Download PDF</Btn>
              <Btn onClick={reset}>Done</Btn>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: '#121821',
        border: '1px solid #243041',
        borderRadius: 14,
        padding: 16,
        boxShadow: '0 1px 0 rgba(255,255,255,0.03) inset, 0 10px 28px rgba(0,0,0,0.4)'
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: 8 }}>{title}</h2>
      <div>{children}</div>
    </div>
  );
}

function Btn(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      style={{
        background: '#1e2937',
        border: '1px solid #243041',
        color: '#e6eef8',
        padding: '10px 14px',
        borderRadius: 10,
        cursor: 'pointer',
        opacity: props.disabled ? 0.6 : 1
      }}
    />
  );
}

function BtnDanger(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      style={{
        background: '#ef4444',
        border: '1px solid #972626',
        color: '#0b0f13',
        padding: '10px 14px',
        borderRadius: 10,
        cursor: 'pointer',
        opacity: props.disabled ? 0.6 : 1
      }}
    />
  );
}
