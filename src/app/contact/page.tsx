'use client';

import { useState } from 'react';

type SubmitResult = { ok: boolean; msg: string } | null; // Add this type

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<SubmitResult>(null); // Use the type here

  return (
    <div className="max-w-2xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-extrabold text-white mb-2">Contact Us</h1>
      <p className="text-gray-400 mb-8">
        Have questions about BitWiperz? Send us a message and we’ll get back to you.
      </p>

      {submitResult && (
        <div className={`mb-4 rounded-md border px-4 py-3 text-sm ${submitResult.ok ? 'border-green-500 text-green-300' : 'border-red-500 text-red-300'}`}>
          {submitResult.msg}
        </div>
      )}

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setSubmitting(true);
          setSubmitResult(null);
          try {
            const res = await fetch('/api/contact', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name, email, message }),
            });
            if (!res.ok) {
              const data = await res.json().catch(() => ({}));
              throw new Error((data && data.error) || 'Failed to submit');
            }
            setName('');
            setEmail('');
            setMessage('');
            setSubmitResult({ ok: true, msg: 'Thanks! Your message has been sent.' });
          } catch (err: any) {
            setSubmitResult({ ok: false, msg: err?.message || 'Something went wrong. Please try again.' });
          } finally {
            setSubmitting(false);
          }
        }}
        className="grid grid-cols-1 gap-4"
      >
        <div>
          <label htmlFor="name" className="block text-sm text-gray-300 mb-1">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-md bg-[#0d1726] border border-gray-700 px-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm text-gray-300 mb-1">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-md bg-[#0d1726] border border-gray-700 px-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="jane@example.com"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm text-gray-300 mb-1">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            className="w-full rounded-md bg-[#0d1726] border border-gray-700 px-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Tell us about your use case..."
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-md bg-[#00a9e0] hover:bg-[#0095c4] disabled:opacity-50 px-6 py-3 text-white font-medium shadow-lg transition"
          >
            {submitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  );
}


