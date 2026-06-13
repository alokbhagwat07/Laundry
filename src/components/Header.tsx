"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-700 transition-colors">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">
                Mauli<span className="text-blue-600">Laundry</span>
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
            <button
              onClick={toggleLang}
              className="ml-2 px-3 py-2 rounded-lg text-xs font-bold border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors uppercase tracking-wider"
            >
              {lang === "en" ? "MR" : "EN"}
            </button>
            <Link
              href="/booking"
              className="ml-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-200"
            >
              {t("nav.bookNow")}
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleLang}
              className="px-3 py-2 rounded-lg text-xs font-bold border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors uppercase tracking-wider"
            >
              {lang === "en" ? "MR" : "EN"}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-3 space-y-1 border-t border-gray-100 bg-white">
          {LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                pathname === item.href
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
          <Link
            href="/booking"
            onClick={() => setMobileOpen(false)}
            className="block px-4 py-3 bg-blue-600 text-white text-sm font-semibold rounded-xl text-center mt-2"
          >
            {t("nav.bookNow")}
          </Link>
        </div>
      </div>
    </header>
  );
}
