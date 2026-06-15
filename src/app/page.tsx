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

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      {/* Futuristic Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-dark-900">
        {/* Animated background layers */}
        <div className="absolute inset-0">
          {/* Deep gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-dark-900 to-dark-900" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(59,130,246,0.12),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(99,102,241,0.08),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(139,92,246,0.04),transparent_50%)]" />
          {/* Grid */}
          <div className="absolute inset-0 hero-grid opacity-20" />
          {/* Gradient orbs */}
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-1/4 -right-32 w-[30rem] h-[30rem] bg-indigo-500/8 rounded-full blur-3xl animate-float" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-purple-500/5 rounded-full blur-3xl animate-float-delayed" />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-2 h-2 bg-blue-400/40 rounded-full animate-particle" />
          <div className="absolute top-[25%] right-[10%] w-1.5 h-1.5 bg-indigo-400/30 rounded-full animate-particle" style={{ animationDelay: "1s" }} />
          <div className="absolute top-[40%] left-[15%] w-2.5 h-2.5 bg-blue-300/20 rounded-full animate-particle" style={{ animationDelay: "2s" }} />
          <div className="absolute top-[55%] right-[5%] w-1 h-1 bg-purple-400/30 rounded-full animate-particle" style={{ animationDelay: "0.5s" }} />
          <div className="absolute top-[70%] left-[8%] w-2 h-2 bg-indigo-300/20 rounded-full animate-particle" style={{ animationDelay: "1.5s" }} />
          <div className="absolute top-[85%] right-[15%] w-1.5 h-1.5 bg-blue-400/20 rounded-full animate-particle" style={{ animationDelay: "3s" }} />
        </div>

        {/* Floating bubbles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[15%] left-[10%] w-16 h-16 rounded-full bg-white/[0.02] border border-white/[0.06] animate-float-slow" />
          <div className="absolute top-[30%] right-[15%] w-10 h-10 rounded-full bg-white/[0.02] border border-white/[0.04] animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-[25%] left-[20%] w-20 h-20 rounded-full bg-white/[0.01] border border-white/[0.04] animate-float-delayed" />
          <div className="absolute top-[60%] right-[25%] w-8 h-8 rounded-full bg-white/[0.02] border border-white/[0.04] animate-float-slow" style={{ animationDelay: "2s" }} />
          <div className="absolute bottom-[35%] right-[10%] w-14 h-14 rounded-full bg-white/[0.02] border border-white/[0.03] animate-float" style={{ animationDelay: "0.5s" }} />
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-40">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6 text-balance glow-text">
                {t("home.hero.title")}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                  {t("home.hero.titleHighlight")}
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-dark-300 mb-8 max-w-lg leading-relaxed">
                {t("home.hero.subtitle")}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/booking"
                  className="group px-7 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-600 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-400/30 flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>{t("home.hero.bookPickup")}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/pricing"
                  className="px-7 py-3.5 bg-white/[0.04] text-dark-200 font-semibold rounded-xl hover:bg-white/[0.08] transition-all duration-300 border border-white/[0.08] flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-sm"
                >
                  {t("home.hero.viewPricing")}
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-12">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 border-2 border-dark-800 shadow-lg"
                    />
                  ))}
                </div>
                <p className="text-sm text-dark-400">
                  <span className="text-white font-bold">500+</span>{" "}
                  {t("home.hero.happyCustomers")}
                </p>
              </div>
            </motion.div>

            {/* Right: 3D Visual */}
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

        {/* Gradient transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent" />
      </section>

      {/* Service Highlights */}
      <section className="relative bg-dark-900">
        <div className="relative -mt-20 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {SERVICE_HIGHLIGHTS.map((item, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl p-5 text-center"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center mx-auto mb-3 text-blue-400">
                  {item.icon}
                </div>
                <p className="text-sm font-semibold text-white">{item.label}</p>
                <p className="text-xs text-dark-400 mt-0.5">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-28 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium mb-5 tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              Why Choose Us
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight text-balance">
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
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {FEATURES.map((feature) => (
              <motion.div
                key={feature.key}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                }}
                className="group glass-card rounded-2xl p-8 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:from-blue-500/30 group-hover:to-indigo-500/30 transition-all duration-500 shadow-sm">
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

      {/* Testimonials */}
      <section className="py-28 bg-dark-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium mb-5 tracking-wide">
              <Star className="w-3.5 h-3.5" />
              Testimonials
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight text-balance">
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
            <Testimonials />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-lg mx-auto mt-12"
          >
            <ReviewForm />
          </motion.div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-28 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium mb-5 tracking-wide">
              <MapPin className="w-3.5 h-3.5" />
              Service Areas
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight text-balance">
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

          <div className="max-w-sm mx-auto">
            {AREAS.map((area) => (
              <motion.div
                key={area}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-6 h-6 text-blue-400" />
                </div>
                <p className="text-base font-semibold text-white">{area}</p>
                <p className="text-xs text-dark-400 mt-1">Free pickup & delivery</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-28 bg-dark-800 border-t border-white/[0.04]">
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium mb-5 tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              Get Started Today
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight text-balance glow-text">
              {t("home.cta.title")}
            </h2>
            <p className="text-dark-300 text-lg sm:text-xl mb-10 max-w-lg mx-auto">
              {t("home.cta.subtitle")}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-14">
              <Link
                href="/booking"
                className="group px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-600 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-400/30 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
              >
                <span>{t("home.cta.bookPickup")}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+919545528747"
                className="px-8 py-3.5 bg-white/[0.04] text-dark-200 font-semibold rounded-xl hover:bg-white/[0.08] transition-all duration-300 border border-white/[0.08] hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-sm"
              >
                {t("home.cta.callUs")}
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="glass-card rounded-2xl p-5">
                <Phone className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                <p className="text-white text-sm font-medium">+91 95455 28747</p>
              </div>
              <div className="glass-card rounded-2xl p-5">
                <Mail className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                <p className="text-white text-sm font-medium truncate">bhagwatalok72@gmail.com</p>
              </div>
              <div className="glass-card rounded-2xl p-5">
                <MapPin className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                <p className="text-white text-sm font-medium">Alandi, Pune</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
