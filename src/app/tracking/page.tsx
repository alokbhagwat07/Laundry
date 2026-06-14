"use client";

import Link from "next/link";
import OrderTracker from "@/components/OrderTracker";
import { Truck, Search, ClipboardList, Lightbulb } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { motion } from "framer-motion";

export default function TrackingPage() {
  const { t } = useLanguage();

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-600 via-blue-700 to-indigo-900 py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl animate-float-slow" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm text-blue-100 text-xs font-medium mb-5 tracking-wide">
              <Truck className="w-3.5 h-3.5" />
              Real-time Tracking
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight text-balance">
              {t("tracking.title")}
            </h1>
            <p className="text-blue-100/70 text-lg md:text-xl max-w-2xl mx-auto">
              {t("tracking.subtitle")}
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 w-full"
            >
              <OrderTracker />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:w-80 space-y-4"
            >
              <div className="glass rounded-2xl shadow-lg p-6 card-hover">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <ClipboardList className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  {t("tracking.howToTrack")}
                </h3>
                <ol className="space-y-2 text-sm text-gray-600 list-decimal list-inside">
                  <li>{t("tracking.step1")}</li>
                  <li>{t("tracking.step2")}</li>
                  <li>{t("tracking.step3")}</li>
                </ol>
              </div>

              <div className="glass rounded-2xl shadow-lg p-6 card-hover">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  {t("tracking.howToTrack")}
                </h3>
                <ol className="space-y-2 text-sm text-gray-600 list-decimal list-inside">
                  <li>{t("tracking.step1")}</li>
                  <li>{t("tracking.step2")}</li>
                  <li>{t("tracking.step3")}</li>
                </ol>
                <Link
                  href="/booking"
                  className="mt-4 inline-flex px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-indigo-600 transition-all duration-200 shadow-md"
                >
                  {t("tracking.bookPickup")}
                </Link>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border border-amber-100 p-4">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-xs text-amber-800">
                    {t("tracking.tip")}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
