'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [restarting, setRestarting] = useState(false);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            className="rounded-full border border-solid border-black/10 dark:border-white/20 transition-colors flex items-center justify-center bg-blue-600 text-white hover:bg-blue-500 font-medium text-sm sm:text-base h-10 sm:h-12 px-5 sm:w-auto"
            onClick={() => setShowConfirm(true)}
          >
            Start Wipe
          </button>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a className="flex items-center gap-2 hover:underline hover:underline-offset-4" href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>

      {/* Warning Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50">
          <div className="w-[420px] rounded-xl border border-[#d5deea] bg-white p-5 shadow-2xl">
            <h3 className="m-0 mb-2 text-lg font-semibold">Confirm Restart</h3>
            <p className="m-0 text-[13px] text-gray-600">
              The system will restart into the wiping utility; unsaved work will be lost. Continue?
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="rounded-md border border-blue-700 bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500"
                onClick={async () => {
                  setShowConfirm(false);
                  setRestarting(true);
                  await new Promise((r) => setTimeout(r, 1200));
                  router.push('/wiping_utility');
                }}
              >
                Restart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Black Loading Screen */}
      {restarting && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-black text-[#e6eef8]">
          <div className="text-center">
            <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-2 border-neutral-700 border-t-blue-400" />
            <div className="text-sm">Restarting into Wiping Utility…</div>
          </div>
        </div>
      )}
    </div>
  );
}
