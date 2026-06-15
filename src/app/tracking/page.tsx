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
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-dark-900 pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-dark-900/50 to-dark-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.06),transparent_50%)]" />
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-20 w-56 h-56 bg-purple-500/8 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 left-1/2 w-40 h-40 bg-blue-400/5 rounded-full blur-2xl animate-pulse" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 text-blue-300 text-xs font-medium mb-5 tracking-wide shadow-lg shadow-blue-500/5">
              <Truck className="w-3.5 h-3.5" />
              Real-time Tracking
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight text-balance glow-text" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {t("tracking.title")}
            </h1>
            <p className="text-dark-300 text-lg md:text-xl max-w-2xl mx-auto">
              {t("tracking.subtitle")}
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 via-dark-900/80 to-transparent" />
      </section>

      <section className="relative py-20 md:py-28 bg-dark-900 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/3 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/3 rounded-full blur-[100px]" />
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
              <div className="premium-card rounded-2xl p-6 group hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <ClipboardList className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white mb-2">
                  {t("tracking.howToTrack")}
                </h3>
                <ol className="space-y-2 text-sm text-dark-300 list-decimal list-inside">
                  <li>{t("tracking.step1")}</li>
                  <li>{t("tracking.step2")}</li>
                  <li>{t("tracking.step3")}</li>
                </ol>
              </div>

              <div className="premium-card rounded-2xl p-6 group hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white mb-2">
                  {t("tracking.howToTrack")}
                </h3>
                <ol className="space-y-2 text-sm text-dark-300 list-decimal list-inside">
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

              <div className="bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-2xl border border-amber-500/20 p-4 group hover:border-amber-500/30 transition-all duration-300">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                  <p className="text-xs text-amber-300">
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
