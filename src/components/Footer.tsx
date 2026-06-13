"use client";

import Link from "next/link";
import { Sparkles, Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Mauli<span className="text-blue-400">Laundry</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2.5">
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
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t("footer.services")}</h3>
            <ul className="space-y-2.5">
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
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t("footer.contactUs")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-blue-400 shrink-0" />
                <span className="text-sm text-gray-400">+91 95455 28747</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-blue-400 shrink-0" />
                <span className="text-sm text-gray-400">
                  bhagwatalok72@gmail.com
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-blue-400 shrink-0" />
                <span className="text-sm text-gray-400">
                  Alandi, Pune, Maharashtra
                </span>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-xs text-gray-500">
                {t("footer.hours")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Mauli Laundry. {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              {t("footer.poweredBy")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
