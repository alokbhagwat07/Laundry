"use client";

import Link from "next/link";
import OrderTracker from "@/components/OrderTracker";
import { Truck } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function TrackingPage() {
  const { t } = useLanguage();

  return (
    <>
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("tracking.title")}
          </h1>
          <p className="text-blue-100 text-lg max-w-xl mx-auto">
            {t("tracking.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            <div className="flex-1 w-full">
              <OrderTracker />
            </div>
            <div className="lg:w-80 space-y-4">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <Truck className="w-6 h-6" />
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

              <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
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
                  className="mt-3 inline-flex px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  {t("tracking.bookPickup")}
                </Link>
              </div>

              <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4">
                <p className="text-xs text-gray-500">
                  💡 {t("tracking.tip")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
