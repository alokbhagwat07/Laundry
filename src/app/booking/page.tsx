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
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-dark-900 pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-dark-900/50 to-dark-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.06),transparent_50%)]" />
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-32 left-10 w-48 h-48 bg-purple-500/8 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-40 left-1/3 w-32 h-32 bg-blue-400/5 rounded-full blur-2xl animate-pulse" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 text-blue-300 text-xs font-medium mb-5 tracking-wide shadow-lg shadow-blue-500/5">
              <Sparkles className="w-3.5 h-3.5" />
              Easy Booking
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight text-balance glow-text" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {t("booking.title")}
            </h1>
            <p className="text-dark-300 text-lg md:text-xl max-w-2xl mx-auto">
              {t("booking.subtitle")}
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 via-dark-900/80 to-transparent" />
      </section>

      <section className="relative py-20 md:py-28 bg-dark-900 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/3 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/3 rounded-full blur-[100px]" />
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
              <div className="premium-card rounded-2xl p-6 group hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  {t("booking.whyBookWithUs")}
                </h3>
                <ul className="space-y-3 text-sm text-dark-300">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 group/item">
                      <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mt-2 shrink-0 group-hover/item:scale-125 transition-transform" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative overflow-hidden bg-gradient-to-br from-blue-600/20 via-indigo-600/20 to-purple-600/20 rounded-2xl p-6 text-white border border-white/[0.06] group hover:border-white/[0.10] transition-all duration-300">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/[0.03] rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="relative">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <HeadphonesIcon className="w-5 h-5" />
                    {t("booking.needHelp")}
                  </h3>
                  <p className="text-dark-300 text-sm mb-4">
                    {t("booking.needHelpText")}
                  </p>
                  <a
                    href="tel:+919545528747"
                    className="block w-full py-2 bg-white/10 backdrop-blur-sm rounded-xl text-center text-sm font-medium hover:bg-white/20 transition-colors"
                  >
                    +91 95455 28747
                  </a>
                  <a
                    href="tel:+917385707654"
                    className="block w-full py-2 bg-white/10 backdrop-blur-sm rounded-xl text-center text-sm font-medium hover:bg-white/20 transition-colors"
                  >
                    +91 73857 07654
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
