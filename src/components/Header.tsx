"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { key: "nav.home", href: "/" },
  { key: "nav.services", href: "/services" },
  { key: "nav.pricing", href: "/pricing" },
  { key: "nav.booking", href: "/booking" },
  { key: "nav.tracking", href: "/tracking" },
  { key: "nav.contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, lang, toggleLang } = useLanguage();

  return (
    <header className="sticky top-0 z-50 glass-strong border-b border-white/30 shadow-lg shadow-blue-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200/50 group-hover:shadow-blue-300/50 group-hover:scale-105 transition-all duration-300">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg lg:text-xl font-bold text-gray-900 tracking-tight">
              Mauli<span className="text-blue-600">Laundry</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "bg-blue-600/10 text-blue-700 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
            <div className="ml-3 flex items-center gap-2">
              <button
                onClick={toggleLang}
                className="px-3 py-2 rounded-xl text-xs font-bold border border-gray-200/60 text-gray-500 hover:bg-white/60 hover:border-gray-300 transition-all duration-200 uppercase tracking-wider"
              >
                {lang === "en" ? "MR" : "EN"}
              </button>
              <Link
                href="/booking"
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-600 transition-all duration-200 shadow-lg shadow-blue-200/50 hover:shadow-blue-300/50 hover:-translate-y-0.5 active:translate-y-0"
              >
                {t("nav.bookNow")}
              </Link>
            </div>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleLang}
              className="px-3 py-2 rounded-xl text-xs font-bold border border-gray-200/60 text-gray-500 hover:bg-white/60 transition-colors uppercase tracking-wider"
            >
              {lang === "en" ? "MR" : "EN"}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2.5 rounded-xl text-gray-600 hover:bg-white/60 transition-colors"
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
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1 border-t border-white/20 bg-white/95 backdrop-blur-2xl">
              {LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    pathname === item.href
                      ? "bg-blue-600/10 text-blue-700"
                      : "text-gray-600 hover:bg-white/70"
                  }`}
                >
                  {t(item.key)}
                </Link>
              ))}
              <Link
                href="/booking"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-sm font-semibold rounded-xl text-center mt-3 shadow-lg shadow-blue-200/50"
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
