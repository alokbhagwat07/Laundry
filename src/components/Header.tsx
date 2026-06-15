"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { key: "nav.home", href: "/" },
  { key: "nav.services", href: "/services" },
  { key: "nav.pricing", href: "/pricing" },
  { key: "nav.booking", href: "/booking" },
  { key: "nav.payment", href: "/payment" },
  { key: "nav.tracking", href: "/tracking" },
  { key: "nav.contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, lang, toggleLang } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-dark-800/60 backdrop-blur-2xl border-b border-white/[0.04] shadow-lg shadow-black/20"
          : "bg-gradient-to-b from-dark-900/80 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 lg:w-11 lg:h-11 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-400/30 group-hover:scale-110 transition-all duration-500">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg lg:text-xl font-bold text-white tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Mauli<span className="text-blue-400">Laundry</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  pathname === link.href
                    ? "bg-blue-500/10 text-blue-300 shadow-sm border border-blue-500/10"
                    : "text-dark-300 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
            <div className="ml-4 flex items-center gap-3">
              <button
                onClick={toggleLang}
                className="px-3 py-2 rounded-xl text-xs font-bold border border-white/[0.06] text-dark-400 hover:text-white hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300 uppercase tracking-wider"
              >
                {lang === "en" ? "MR" : "EN"}
              </button>
              <Link
                href="/booking"
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-600 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-400/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                {t("nav.bookNow")}
              </Link>
            </div>
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={toggleLang}
              className="px-3 py-2 rounded-xl text-xs font-bold border border-white/[0.06] text-dark-400 hover:text-white transition-colors uppercase tracking-wider"
            >
              {lang === "en" ? "MR" : "EN"}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2.5 rounded-xl text-dark-300 hover:text-white hover:bg-white/[0.04] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1.5 border-t border-white/[0.04] bg-dark-800/80 backdrop-blur-2xl">
              {LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    pathname === item.href
                      ? "bg-blue-500/10 text-blue-300"
                      : "text-dark-300 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {t(item.key)}
                </Link>
              ))}
              <Link
                href="/booking"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-sm font-semibold rounded-xl text-center mt-4 shadow-lg shadow-blue-500/20"
              >
                {t("nav.bookNow")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
