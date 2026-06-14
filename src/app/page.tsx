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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 } as const,
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      {/* Apple/Stripe Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-b from-blue-600 via-blue-700 to-indigo-900">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.15),transparent_50%)]" />
          <div className="absolute inset-0 hero-grid opacity-30" />
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-1/4 -right-32 w-[30rem] h-[30rem] bg-indigo-400/15 rounded-full blur-3xl animate-float" />
        </div>

        {/* Floating bubbles - Spline inspired */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[15%] left-[10%] w-16 h-16 rounded-full bg-white/[0.03] border border-white/[0.06] animate-float-slow" />
          <div className="absolute top-[30%] right-[15%] w-10 h-10 rounded-full bg-white/[0.02] border border-white/[0.05] animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-[25%] left-[20%] w-20 h-20 rounded-full bg-white/[0.02] border border-white/[0.04] animate-float-delayed" />
          <div className="absolute top-[60%] right-[25%] w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.05] animate-float-slow" style={{ animationDelay: "2s" }} />
          <div className="absolute bottom-[35%] right-[10%] w-14 h-14 rounded-full bg-white/[0.02] border border-white/[0.04] animate-float" style={{ animationDelay: "0.5s" }} />
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm text-blue-100 text-xs font-medium mb-6 tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                India&apos;s Trusted Laundry Service
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6 text-balance">
                {t("home.hero.title")}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200">
                  {t("home.hero.titleHighlight")}
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-blue-100/70 mb-8 max-w-lg leading-relaxed">
                {t("home.hero.subtitle")}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/booking"
                  className="group px-7 py-3.5 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-blue-200/50 flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>{t("home.hero.bookPickup")}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/pricing"
                  className="px-7 py-3.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-sm"
                >
                  {t("home.hero.viewPricing")}
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-12">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-300 to-indigo-400 border-2 border-blue-700 shadow-lg"
                    />
                  ))}
                </div>
                <p className="text-sm text-blue-200/80">
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
              className="hidden lg:block relative h-[400px] xl:h-[500px]"
            >
              <Laundry3D />
            </motion.div>
          </div>
        </div>

        {/* Smooth gradient transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* Service Highlights - Urban Company style */}
      <section className="relative -mt-16 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              className="glass-strong rounded-2xl p-5 text-center card-hover"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center mx-auto mb-3 text-blue-600">
                {item.icon}
              </div>
              <p className="text-sm font-semibold text-gray-900">{item.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features - Stripe style */}
      <section className="py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-medium mb-5 tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              Why Choose Us
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight text-balance">
              {t("home.features.title")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {t("home.features.titleHighlight")}
              </span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              {t("home.features.subtitle")}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {FEATURES.map((feature) => (
              <motion.div
                key={feature.key}
                variants={itemVariants}
                className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 p-8 card-hover overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-500 shadow-sm">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t(`home.feature.${feature.key}.title`)}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {t(`home.feature.${feature.key}.desc`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials - Apple style */}
      <section className="py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-medium mb-5 tracking-wide">
              <Star className="w-3.5 h-3.5" />
              Testimonials
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight text-balance">
              {t("home.testimonials.title")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {t("home.testimonials.titleHighlight")}
              </span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
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

      {/* Service Areas - Vercel style */}
      <section className="py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-medium mb-5 tracking-wide">
              <MapPin className="w-3.5 h-3.5" />
              Service Areas
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight text-balance">
              {t("home.areas.title")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {t("home.areas.titleHighlight")}
              </span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              {t("home.areas.subtitle")}{" "}
              <span className="font-semibold text-gray-700">Alandi</span>.
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
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-base font-semibold text-gray-800">{area}</p>
                <p className="text-xs text-gray-400 mt-1">Free pickup & delivery</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Urban Company style */}
      <section className="relative overflow-hidden py-28 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-indigo-400/10 rounded-full blur-3xl animate-float-delayed" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm text-blue-100 text-xs font-medium mb-5 tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              Get Started Today
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight text-balance">
              {t("home.cta.title")}
            </h2>
            <p className="text-blue-100/80 text-lg sm:text-xl mb-10 max-w-lg mx-auto">
              {t("home.cta.subtitle")}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-14">
              <Link
                href="/booking"
                className="group px-8 py-3.5 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-blue-200/50 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
              >
                <span>{t("home.cta.bookPickup")}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+919545528747"
                className="px-8 py-3.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-sm"
              >
                {t("home.cta.callUs")}
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="glass-dark rounded-2xl p-5 hover:bg-white/[0.12] transition-all duration-300 card-hover">
                <Phone className="w-5 h-5 text-blue-200 mx-auto mb-2" />
                <p className="text-white text-sm font-medium">+91 95455 28747</p>
              </div>
              <div className="glass-dark rounded-2xl p-5 hover:bg-white/[0.12] transition-all duration-300 card-hover">
                <Mail className="w-5 h-5 text-blue-200 mx-auto mb-2" />
                <p className="text-white text-sm font-medium truncate">bhagwatalok72@gmail.com</p>
              </div>
              <div className="glass-dark rounded-2xl p-5 hover:bg-white/[0.12] transition-all duration-300 card-hover">
                <MapPin className="w-5 h-5 text-blue-200 mx-auto mb-2" />
                <p className="text-white text-sm font-medium">Alandi, Pune</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
