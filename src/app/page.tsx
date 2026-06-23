"use client";

import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Clock,
  Star,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Sparkles,
  Shirt,
  Wind,
  Droplets,
  RefreshCw,
  ChevronRight,
} from "lucide-react";
import Testimonials from "@/components/Testimonials";
import ReviewForm from "@/components/ReviewForm";
import Laundry3D from "@/components/Laundry3D";
import { useLanguage } from "@/lib/LanguageContext";
import { motion } from "framer-motion";

const FEATURES = [
  { key: "pickup", icon: <Truck className="w-6 h-6" /> },
  { key: "quality", icon: <ShieldCheck className="w-6 h-6" /> },
  { key: "delivery", icon: <Clock className="w-6 h-6" /> },
  { key: "star", icon: <Star className="w-6 h-6" /> },
  { key: "comm", icon: <MessageCircle className="w-6 h-6" /> },
];

const SERVICE_HIGHLIGHTS = [
  { icon: <Shirt className="w-5 h-5" />, label: "Premium Wash", desc: "Gentle care for all fabrics" },
  { icon: <Wind className="w-5 h-5" />, label: "Steam Iron", desc: "Crisp, wrinkle-free finish" },
  { icon: <Droplets className="w-5 h-5" />, label: "Dry Cleaning", desc: "Professional solvent cleaning" },
  { icon: <RefreshCw className="w-5 h-5" />, label: "Express 24h", desc: "Same-day turnaround" },
];

const AREAS = ["Alandi"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden bg-dark-900 aurora-bg">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/60 via-dark-900 to-dark-900" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(59,130,246,0.12),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(99,102,241,0.08),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(139,92,246,0.04),transparent_50%)]" />
          <div className="absolute inset-0 hero-grid opacity-20" />
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-1/4 -right-32 w-[30rem] h-[30rem] bg-indigo-500/8 rounded-full blur-3xl animate-float" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-purple-500/5 rounded-full blur-3xl animate-float-delayed" />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-blue-400/30 rounded-full"
              style={{
                top: `${5 + (i * 17 + 3) % 90}%`,
                left: `${5 + (i * 23 + 7) % 90}%`,
                animation: `particle-drift ${6 + (i % 6)}s ease-out infinite`,
                animationDelay: `${(i * 0.37) % 4}s`,
                opacity: 0.2 + ((i * 13) % 40) / 100,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/[0.02] border border-white/[0.04]"
              style={{
                top: `${10 + (i * 29 + 5) % 80}%`,
                left: `${5 + (i * 13 + 11) % 90}%`,
                width: `${30 + (i * 7 + 3) % 60}px`,
                height: `${30 + (i * 11 + 5) % 60}px`,
                animation: `float ${5 + (i % 4)}s ease-in-out infinite`,
                animationDelay: `${(i * 0.53) % 3}s`,
              }}
            />
          ))}
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-40">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-6 flex justify-center">
                <img src="/logolaundry.png" alt="Mauli Laundry" className="h-28 w-auto" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6 text-balance drop-shadow-2xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", textShadow: "0 2px 40px rgba(0,0,0,0.5), 0 0 80px rgba(0,0,0,0.3)" }}>
                {t("home.hero.title")}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 drop-shadow-lg" style={{ textShadow: "0 0 40px rgba(59,130,246,0.4), 0 0 80px rgba(59,130,246,0.2)" }}>
                  {t("home.hero.titleHighlight")}
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-dark-300 mb-10 max-w-lg leading-relaxed">
                {t("home.hero.subtitle")}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/booking"
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-600 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-400/30 flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
                >
                  <span className="relative z-10">{t("home.hero.bookPickup")}</span>
                  <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </Link>
                <Link
                  href="/pricing"
                  className="group px-8 py-4 bg-white/[0.04] text-dark-200 font-semibold rounded-xl hover:bg-white/[0.08] transition-all duration-300 border border-white/[0.08] flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-sm"
                >
                  {t("home.hero.viewPricing")}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center gap-6 mt-12"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 border-2 border-dark-800 shadow-lg ring-2 ring-dark-800"
                    />
                  ))}
                </div>
                <p className="text-sm text-dark-400">
                  <span className="text-white font-bold text-lg">500+</span>{" "}
                  {t("home.hero.happyCustomers")}
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block relative h-[450px] xl:h-[550px]"
            >
              <Laundry3D />
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dark-900 to-transparent" />
      </section>

      <section className="relative bg-dark-900">
        <div className="relative -mt-24 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {SERVICE_HIGHLIGHTS.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="premium-card rounded-2xl p-6 text-center cursor-default"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center mx-auto mb-3 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <p className="text-sm font-semibold text-white">{item.label}</p>
                <p className="text-xs text-dark-400 mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-28 md:py-36 bg-dark-900 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid-subtle opacity-30" />
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-indigo-500/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <div className="section-badge">
              <Sparkles className="w-3.5 h-3.5" />
              Why Choose Us
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 tracking-tight text-balance" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {t("home.features.title")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                {t("home.features.titleHighlight")}
              </span>
            </h2>
            <p className="text-dark-400 max-w-2xl mx-auto text-lg">
              {t("home.features.subtitle")}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {FEATURES.map((feature) => (
              <motion.div
                key={feature.key}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group premium-card rounded-2xl p-8 overflow-hidden cursor-default"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-500/8 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:from-blue-500/30 group-hover:to-indigo-500/30 transition-all duration-500 shadow-sm">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {t(`home.feature.${feature.key}.title`)}
                  </h3>
                  <p className="text-sm text-dark-400 leading-relaxed">
                    {t(`home.feature.${feature.key}.desc`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-28 md:py-36 bg-dark-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-800 via-dark-900/50 to-dark-800" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <div className="section-badge">
              <Star className="w-3.5 h-3.5" />
              Testimonials
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 tracking-tight text-balance" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {t("home.testimonials.title")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                {t("home.testimonials.titleHighlight")}
              </span>
            </h2>
            <p className="text-dark-400 max-w-2xl mx-auto text-lg">
              {t("home.testimonials.subtitle")}
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Testimonials />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-lg mx-auto mt-16"
          >
            <ReviewForm />
          </motion.div>
        </div>
      </section>

      <section className="py-28 md:py-36 bg-dark-900 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid-subtle opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="section-badge">
              <MapPin className="w-3.5 h-3.5" />
              Service Areas
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 tracking-tight text-balance" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {t("home.areas.title")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                {t("home.areas.titleHighlight")}
              </span>
            </h2>
            <p className="text-dark-400 max-w-2xl mx-auto text-lg">
              {t("home.areas.subtitle")}{" "}
              <span className="font-semibold text-white">Alandi</span>.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-sm mx-auto"
          >
            {AREAS.map((area) => (
              <motion.div
                key={area}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="premium-card rounded-2xl p-8 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-7 h-7 text-blue-400" />
                </div>
                <p className="text-lg font-semibold text-white">{area}</p>
                <p className="text-sm text-dark-400 mt-2">Free pickup & delivery</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden py-28 md:py-36 bg-dark-800 border-t border-white/[0.04]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.08),transparent_50%)]" />
        <div className="absolute inset-0 hero-grid opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-indigo-500/8 rounded-full blur-3xl animate-float-delayed" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-badge justify-center">
              <Sparkles className="w-3.5 h-3.5" />
              Get Started Today
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 tracking-tight text-balance glow-text" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {t("home.cta.title")}
            </h2>
            <p className="text-dark-300 text-lg sm:text-xl mb-12 max-w-lg mx-auto">
              {t("home.cta.subtitle")}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Link
                href="/booking"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-600 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-400/30 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 overflow-hidden"
              >
                <span className="relative z-10">{t("home.cta.bookPickup")}</span>
                <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>
              <a
                href="tel:+919545528747"
                className="group px-8 py-4 bg-white/[0.04] text-dark-200 font-semibold rounded-xl hover:bg-white/[0.08] transition-all duration-300 border border-white/[0.08] hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-sm flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                {t("home.cta.callUs")}
              </a>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
            >
              {[
                { icon: <Phone className="w-5 h-5 text-blue-400" />, label: "+91 95455 28747" },
                { icon: <Mail className="w-5 h-5 text-blue-400" />, label: "bhagwatalok72@gmail.com", truncate: true },
                { icon: <MapPin className="w-5 h-5 text-blue-400" />, label: "Alandi, Pune" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="premium-card rounded-2xl p-5 cursor-default"
                >
                  <div className="flex justify-center mb-2">{item.icon}</div>
                  <p className={`text-white text-sm font-medium ${item.truncate ? "truncate" : ""}`}>{item.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
