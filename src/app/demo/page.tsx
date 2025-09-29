"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Usb, Trash2, HardDrive } from "lucide-react";

export default function DemoPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [usbReady, setUsbReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wipeConfirm, setWipeConfirm] = useState(false);
  const [restartConfirm, setRestartConfirm] = useState(false);
  const [restarting, setRestarting] = useState(false);

  const handleFlash = () => {
    setOpen(true);
    setLoading(true);
    setProgress(0);

    let val = 0;
    const interval = setInterval(() => {
      val += 20;
      setProgress(val);
      if (val >= 100) {
        clearInterval(interval);
        setOpen(false);
        setLoading(false);
        setUsbReady(true);
        toast.success("USB Ready ✅");
      }
    }, 500);
  };

  const handleWipeConfirm = () => {
    setWipeConfirm(false);
    setRestartConfirm(true);
  };

  const handleRestart = () => {
    setRestartConfirm(false);
    setRestarting(true);
    setProgress(0);

    let val = 0;
    const interval = setInterval(() => {
      val += 25;
      setProgress(val);
      if (val >= 100) {
        clearInterval(interval);
        setRestarting(false);
        toast.success("System Restarted & Wiping Started 🗑️");
        router.push('/wiping_utility'); // navigate to wiping progress page
      }
    }, 800);
  };

  // Basic modal component
  type ModalProps = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
  };

  const Modal = ({ open, onClose, children }: ModalProps) => {
    if (!open) return null;
    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="relative bg-slate-800/90 border border-slate-700 text-white rounded-2xl shadow-2xl max-w-md w-full p-6">
          <button
            className="absolute top-3 right-3 text-slate-400 hover:text-slate-200"
            onClick={onClose}
          >
            ✕
          </button>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 space-y-10">
      <h1 className="text-3xl font-bold tracking-wide text-slate-100 drop-shadow-lg">
        System Tools
      </h1>

      {/* Glassmorphic Container */}
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-6 w-full max-w-2xl">
        <div className="flex gap-6">
          <button
            onClick={handleFlash}
            disabled={usbReady || loading}
            className="flex items-center gap-2 px-6 py-3 text-lg font-semibold rounded-2xl shadow-md transition-all bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Usb className="w-5 h-5" /> Flash USB
          </button>

          <button
            onClick={() => setWipeConfirm(true)}
            disabled={!usbReady || restarting}
            className="flex items-center gap-2 px-6 py-3 text-lg font-semibold rounded-2xl shadow-md transition-all bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-5 h-5" /> Start Wipe
          </button>
        </div>

        {/* Connected Devices Section */}
        <div className="w-full mt-6">
          <h2 className="text-lg font-semibold mb-3 text-slate-200">
            Connected Devices
          </h2>
          <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 flex items-center gap-3">
            <HardDrive className="w-6 h-6 text-blue-400" />
            <p className="text-slate-300">
              USB Drive (32GB) - {usbReady ? "Ready" : "Not Ready"}
            </p>
          </div>
        </div>
      </div>

      {/* Flash USB Progress Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <h2 className="text-lg font-semibold text-slate-100 mb-4">
          Flashing USB Drive...
        </h2>
        <div className="py-4">
          <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-3 bg-blue-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="mt-4 text-sm text-slate-300">{progress}% completed</p>
        </div>
      </Modal>

      {/* Wipe Confirmation Modal */}
      <Modal open={wipeConfirm} onClose={() => setWipeConfirm(false)}>
        <h2 className="text-lg font-bold text-red-400 mb-2">Confirm Wipe</h2>
        <p className="text-slate-300 text-sm">
          This action will permanently erase all data from the USB drive. Do you
          want to continue?
        </p>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setWipeConfirm(false)}
            className="rounded-xl px-4 py-2 border border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            Cancel
          </button>
          <button
            onClick={handleWipeConfirm}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl font-semibold"
          >
            Confirm
          </button>
        </div>
      </Modal>

      {/* Restart Confirmation Modal */}
      <Modal open={restartConfirm} onClose={() => setRestartConfirm(false)}>
        <h2 className="text-lg font-bold text-blue-400 mb-2">Restart Required</h2>
        <p className="text-slate-300 text-sm">
          The system needs to restart into the wiping utility. Unsaved work will
          be lost. Do you want to restart now?
        </p>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setRestartConfirm(false)}
            className="rounded-xl px-4 py-2 border border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            Cancel
          </button>
          <button
            onClick={handleRestart}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl font-semibold"
          >
            Restart
          </button>
        </div>
      </Modal>

      {/* Fullscreen Restarting Loader */}
      {restarting && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
          <div className="animate-spin h-12 w-12 rounded-full border-4 border-gray-700 border-t-blue-400 mb-6"></div>
          <h2 className="text-xl font-semibold mb-2">Restarting...</h2>
          <p className="text-sm text-gray-400">
            Your system is restarting into the wiping utility
          </p>
        </div>
      )}
    </div>
  );
}
