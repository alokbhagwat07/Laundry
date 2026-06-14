"use client";

import BookingForm from "@/components/BookingForm";
import { Sparkles, ShieldCheck, HeadphonesIcon } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { motion } from "framer-motion";

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
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-600 via-blue-700 to-indigo-900 py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl animate-float" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm text-blue-100 text-xs font-medium mb-5 tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              Easy Booking
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight text-balance">
              {t("booking.title")}
            </h1>
            <p className="text-blue-100/70 text-lg md:text-xl max-w-2xl mx-auto">
              {t("booking.subtitle")}
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1"
            >
              <BookingForm />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:w-80 space-y-4"
            >
              <div className="glass rounded-2xl shadow-lg p-6 card-hover">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  {t("booking.whyBookWithUs")}
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full mt-2 shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl p-6 text-white">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/[0.03] rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="relative">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <HeadphonesIcon className="w-5 h-5" />
                    {t("booking.needHelp")}
                  </h3>
                  <p className="text-blue-100/80 text-sm mb-4">
                    {t("booking.needHelpText")}
                  </p>
                  <a
                    href="tel:+919545528747"
                    className="block w-full py-2.5 bg-white/20 backdrop-blur-sm rounded-xl text-center text-sm font-medium hover:bg-white/30 transition-colors"
                  >
                    +91 95455 28747
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
