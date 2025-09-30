export default function CompliancePage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-extrabold text-white mb-2">Compliance</h1>
      <p className="text-gray-400 mb-8">
        BitWiperz aligns with leading international standards and industry best practices for secure data erasure.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-lg border border-gray-800 bg-[#0d1726]/60 p-4">
          <h2 className="text-white font-semibold mb-1">NIST SP 800-88 Rev. 1</h2>
          <p className="text-sm text-gray-400">Guidelines for Media Sanitization with verification and audit-ready logs.</p>
        </div>
        <div className="rounded-lg border border-gray-800 bg-[#0d1726]/60 p-4">
          <h2 className="text-white font-semibold mb-1">DoD 5220.22-M</h2>
          <p className="text-sm text-gray-400">Multi-pass overwrite patterns for legacy compliance requirements.</p>
        </div>
        <div className="rounded-lg border border-gray-800 bg-[#0d1726]/60 p-4">
          <h2 className="text-white font-semibold mb-1">ISO/IEC 27001 Friendly</h2>
          <p className="text-sm text-gray-400">Supports ISMS controls for secure asset decommissioning.</p>
        </div>
        <div className="rounded-lg border border-gray-800 bg-[#0d1726]/60 p-4">
          <h2 className="text-white font-semibold mb-1">GDPR/CCPA Support</h2>
          <p className="text-sm text-gray-400">Enables data subject rights by ensuring irreversible erasure.</p>
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-400">
        Need formal documentation? <a href="/contact" className="text-cyan-400 hover:underline">Contact us</a> for compliance reports and certificates.
      </div>
    </div>
  );
}


