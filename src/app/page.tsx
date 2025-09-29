'use client';

import { useState } from 'react';

export default function Home() {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center text-center py-24 px-6">
      {/* Lock Icon */}
      <div className="mb-6 w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-cyan-400 to-blue-500 text-white text-2xl">
        🔒
      </div>

      {/* Headline */}
      <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-white mb-4">
        Enterprise-Grade{" "}
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Secure Data Wiping
        </span>
      </h1>

      {/* Subheadline */}
      <p className="max-w-2xl text-gray-400 text-lg mb-10">
        NIST-compliant erasure for PCs, SSDs, HDDs, and Mobile Devices.
        Trusted by enterprises worldwide for complete data destruction with
        certified proof.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="rounded-md bg-[#00a9e0] hover:bg-[#0095c4] px-6 py-3 text-white font-medium shadow-lg transition">
          ▶ Start Free Demo
        </button>
        <button className="rounded-md bg-gray-700 text-gray-400 px-6 py-3 font-medium cursor-not-allowed">
          Request Enterprise Access
        </button>
      </div>
    </div>
  );
}
