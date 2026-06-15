"use client";

import Link from "next/link";
import { Sparkles, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative overflow-hidden bg-dark-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.06),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.05),transparent_60%)]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[128px]" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-[128px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-xl shadow-blue-500/20 group-hover:shadow-blue-400/40 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <Sparkles className="w-5.5 h-5.5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Mauli<span className="text-blue-400">Laundry</span>
              </span>
            </Link>
            <p className="text-dark-400 text-sm leading-relaxed max-w-xs">
              {t("footer.description")}
            </p>
          </div>

          <div>
            <h3 className="text-dark-200 font-semibold mb-6 text-xs uppercase tracking-[0.2em]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{t("footer.quickLinks")}</h3>
            <ul className="space-y-3.5">
              {[
                { label: t("nav.home"), href: "/" },
                { label: t("nav.services"), href: "/services" },
                { label: t("nav.pricing"), href: "/pricing" },
                { label: t("footer.bookPickup"), href: "/booking" },
                { label: t("footer.trackOrder"), href: "/tracking" },
                { label: "Admin", href: "/admin" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-dark-400 hover:text-blue-400 transition-all duration-300 flex items-center gap-1.5 group/link"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-px left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-indigo-400 group-hover/link:w-full transition-all duration-300" />
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-1 translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-y-0 group-hover/link:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-dark-200 font-semibold mb-6 text-xs uppercase tracking-[0.2em]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{t("footer.services")}</h3>
            <ul className="space-y-3.5">
              {[
                "Wash & Fold",
                "Wash & Iron",
                "Dry Cleaning",
                "Express Delivery",
                "Pickup & Delivery",
              ].map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-sm text-dark-400 hover:text-blue-400 transition-all duration-300 flex items-center gap-1.5 group/link"
                  >
                    <span className="w-1 h-1 rounded-full bg-dark-600 group-hover/link:bg-blue-400 transition-colors duration-300" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-dark-200 font-semibold mb-6 text-xs uppercase tracking-[0.2em]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{t("footer.contactUs")}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3.5 group">
                <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 group-hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                  <Phone className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <span className="text-xs text-dark-500 uppercase tracking-wider">Phone</span>
                  <p className="text-sm text-dark-200 font-medium">+91 95455 28747</p>
                </div>
              </li>
              <li className="flex items-start gap-3.5 group">
                <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 group-hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                  <Mail className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <span className="text-xs text-dark-500 uppercase tracking-wider">Email</span>
                  <p className="text-sm text-dark-200 font-medium">bhagwatalok72@gmail.com</p>
                </div>
              </li>
              <li className="flex items-start gap-3.5 group">
                <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 group-hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                  <MapPin className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <span className="text-xs text-dark-500 uppercase tracking-wider">Address</span>
                  <p className="text-sm text-dark-200 font-medium">Annapurna Mata Nagar, Wadgoan Road, Alandi Dewachi</p>
                </div>
              </li>
            </ul>
            <div className="mt-8 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300">
              <p className="text-xs text-dark-500 leading-relaxed">
                {t("footer.hours")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-dark-500">
            &copy; {new Date().getFullYear()} Mauli Laundry. {t("footer.copyright")}
          </p>
          <p className="text-sm text-dark-500">
            {t("footer.poweredBy")}
          </p>
        </div>
      </div>
    </footer>
  );
}
