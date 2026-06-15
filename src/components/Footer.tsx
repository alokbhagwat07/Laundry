"use client";

import Link from "next/link";
import { Sparkles, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.04] bg-dark-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.04),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.03),transparent_50%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-400/30 group-hover:scale-105 transition-all duration-300">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Mauli<span className="text-blue-400">Laundry</span>
              </span>
            </Link>
            <p className="text-dark-400 text-sm leading-relaxed max-w-xs">
              {t("footer.description")}
            </p>
          </div>

          <div>
            <h3 className="text-dark-200 font-semibold mb-5 text-sm uppercase tracking-widest">{t("footer.quickLinks")}</h3>
            <ul className="space-y-3">
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
                    className="text-sm text-dark-400 hover:text-blue-400 transition-all duration-200 flex items-center gap-1.5 group/link"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover/link:opacity-100 group-hover/link:translate-y-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-dark-200 font-semibold mb-5 text-sm uppercase tracking-widest">{t("footer.services")}</h3>
            <ul className="space-y-3">
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
                    className="text-sm text-dark-400 hover:text-blue-400 transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-dark-200 font-semibold mb-5 text-sm uppercase tracking-widest">{t("footer.contactUs")}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
                  <Phone className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-sm text-dark-300">+91 95455 28747</span>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
                  <Mail className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-sm text-dark-300">bhagwatalok72@gmail.com</span>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
                  <MapPin className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-sm text-dark-300">Annapurna Mata Nagar, Wadgoan Road, Alandi Dewachi</span>
              </li>
            </ul>
            <div className="mt-6 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <p className="text-xs text-dark-500 leading-relaxed">
                {t("footer.hours")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
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
