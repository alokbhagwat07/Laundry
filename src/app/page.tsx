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
} from "lucide-react";
import Testimonials from "@/components/Testimonials";
import ReviewForm from "@/components/ReviewForm";
import { useLanguage } from "@/lib/LanguageContext";

const FEATURES = [
  {
    key: "pickup",
    icon: <Truck className="w-6 h-6" />,
  },
  {
    key: "quality",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    key: "delivery",
    icon: <Clock className="w-6 h-6" />,
  },
  {
    key: "star",
    icon: <Star className="w-6 h-6" />,
  },
  {
    key: "comm",
    icon: <MessageCircle className="w-6 h-6" />,
  },
];

const AREAS = ["Alandi"];

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl">

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-5">
              {t("home.hero.title")}
              <span className="text-blue-200"> {t("home.hero.titleHighlight")}</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-xl leading-relaxed">
              {t("home.hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/booking"
                className="px-7 py-3.5 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-xl flex items-center gap-2"
              >
                {t("home.hero.bookPickup")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                className="px-7 py-3.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-200 border border-white/20 flex items-center gap-2"
              >
                {t("home.hero.viewPricing")}
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-10">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-white/20 border-2 border-blue-700"
                  />
                ))}
              </div>
              <p className="text-sm text-blue-200">
                <span className="text-white font-semibold">500+</span>{" "}
                {t("home.hero.happyCustomers")}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t("home.features.title")} <span className="text-blue-600">{t("home.features.titleHighlight")}</span>?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              {t("home.features.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature) => (
              <div
                key={feature.key}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6"
              >
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {t(`home.feature.${feature.key}.title`)}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {t(`home.feature.${feature.key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t("home.testimonials.title")} <span className="text-blue-600">{t("home.testimonials.titleHighlight")}</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              {t("home.testimonials.subtitle")}
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <Testimonials />
          </div>
          <div className="max-w-lg mx-auto mt-10">
            <ReviewForm />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t("home.areas.title")} <span className="text-blue-600">{t("home.areas.titleHighlight")}</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              {t("home.areas.subtitle")} <strong>Alandi</strong>.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {AREAS.map((area) => (
              <div
                key={area}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <MapPin className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-800">{area}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("home.cta.title")}
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-lg mx-auto">
            {t("home.cta.subtitle")}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <Link
              href="/booking"
              className="px-8 py-3.5 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-all shadow-xl"
            >
              {t("home.cta.bookPickup")}
            </Link>
            <a
              href="tel:+919545528747"
              className="px-8 py-3.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/20"
            >
              {t("home.cta.callUs")}
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Phone className="w-5 h-5 text-blue-200 mx-auto mb-2" />
              <p className="text-white text-sm font-medium">+91 95455 28747</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Mail className="w-5 h-5 text-blue-200 mx-auto mb-2" />
              <p className="text-white text-sm font-medium">
                bhagwatalok72@gmail.com
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <MapPin className="w-5 h-5 text-blue-200 mx-auto mb-2" />
              <p className="text-white text-sm font-medium">Alandi, Pune</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
