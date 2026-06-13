"use client";

import BookingForm from "@/components/BookingForm";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function BookingPage() {
  const { t } = useLanguage();

  const benefits = [
    "Free doorstep pickup & delivery",
    "Professional cleaning with premium products",
    "48-hour standard delivery",
    "Real-time order tracking",
    "24/7 AI customer support",
    "Bulk discounts available",
  ];

  return (
    <>
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("booking.title")}
          </h1>
          <p className="text-blue-100 text-lg max-w-xl mx-auto">
            {t("booking.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="flex-1">
              <BookingForm />
            </div>
            <div className="lg:w-80 space-y-4">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  {t("booking.whyBookWithUs")}
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">{t("booking.needHelp")}</h3>
                <p className="text-blue-100 text-sm mb-4">
                  {t("booking.needHelpText")}
                </p>
                <a
                  href="tel:+919545528747"
                  className="block w-full py-2.5 bg-white/20 rounded-xl text-center text-sm font-medium hover:bg-white/30 transition-colors"
                >
                  📞 +91 95455 28747
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
