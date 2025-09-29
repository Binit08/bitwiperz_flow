import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "SecureWipe Pro – Enterprise-Grade Data Wiping",
  description:
    "NIST-compliant secure data wiping solution for PCs, SSDs, HDDs, and mobile devices. Enterprise-grade compliance and certified proof.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} bg-gradient-to-b from-[#0f1c2e] to-[#0a111d] text-gray-200 antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          {/* Navbar */}
          <header className="border-b border-gray-800 bg-[#0f1c2e]/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                  🔒
                </div>
                <span className="text-lg font-semibold text-white">
                  SecureWipe Pro
                </span>
              </div>

              {/* Nav Links */}
              <nav className="flex gap-8 text-sm font-medium">
                <Link href="#features" className="hover:text-cyan-400 transition-colors">
                  Features
                </Link>
                <a href="#compliance" className="hover:text-cyan-400 transition-colors">
                  Compliance
                </a>
<Link href="/demo" className="hover:text-cyan-400 transition-colors">
  Demo
</Link>
                <Link href="#contact" className="hover:text-cyan-400 transition-colors">
                  Contact
                </Link>
              </nav>

              {/* CTA */}
              <Link
                href="#demo"
                className="rounded-full transition-all duration-300 hover:bg-cyan-200 px-4 py-2 text-sm font-medium shadow-md"
              >
                Get Started
              </Link>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <footer className="border-t border-gray-800 bg-[#0a111d]">
            <div className="max-w-7xl mx-auto px-6 py-6 text-center text-xs text-gray-500">
              © {new Date().getFullYear()} SecureWipe Pro. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
