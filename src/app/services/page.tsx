"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SERVICES } from "@/lib/pricing";
import { useLanguage } from "@/lib/LanguageContext";

export default function ServicesPage() {
  const { t } = useLanguage();

  return (
    <>
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("services.title")}
          </h1>
          <p className="text-blue-100 text-lg max-w-xl mx-auto">
            {t("services.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 overflow-hidden group"
              >
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/booking"
                    className="inline-flex items-center gap-2 text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors"
                  >
                    {t("nav.bookNow")} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {t("services.notSure")}
          </h2>
          <p className="text-gray-500 mb-6">
            {t("services.notSureText")}
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            {t("services.viewPricing")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
