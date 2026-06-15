"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { SERVICES } from "@/lib/pricing";
import { useLanguage } from "@/lib/LanguageContext";
import { motion } from "framer-motion";

export default function ServicesPage() {
  const { t } = useLanguage();

  return (
    <>
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-dark-900 pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-dark-900/50 to-dark-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.06),transparent_50%)]" />
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-32 left-10 w-56 h-56 bg-purple-500/8 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-40 right-1/3 w-40 h-40 bg-blue-400/5 rounded-full blur-2xl animate-pulse" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 text-blue-300 text-xs font-medium mb-5 tracking-wide shadow-lg shadow-blue-500/5">
              <Sparkles className="w-3.5 h-3.5" />
              Our Expertise
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight text-balance glow-text" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {t("services.title")}
            </h1>
            <p className="text-dark-300 text-lg md:text-xl max-w-2xl mx-auto">
              {t("services.subtitle")}
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 via-dark-900/80 to-transparent" />
      </section>

      <section className="relative py-20 md:py-28 bg-dark-900 overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/3 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500/3 rounded-full blur-[100px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {SERVICES.map((service, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="group premium-card rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300"
              >
                <div className="bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 p-8 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.03),transparent_60%)]" />
                  <span className="text-6xl relative group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                    {service.icon}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-dark-400 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-sm text-dark-300 group/item"
                      >
                        <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0 group-hover/item:scale-110 transition-transform" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/booking"
                    className="inline-flex items-center gap-2 text-blue-400 font-medium text-sm hover:text-blue-300 transition-colors group/link"
                  >
                    <span>{t("nav.bookNow")}</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative py-20 bg-dark-800 border-t border-white/[0.04] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/3 to-indigo-500/3 rounded-full blur-[120px]" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight text-balance">
              {t("services.notSure")}
            </h2>
            <p className="text-dark-300 text-lg mb-6">
              {t("services.notSureText")}
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-xl hover:from-blue-700 hover:to-indigo-600 transition-all duration-200 font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-400/30 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{t("services.viewPricing")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
