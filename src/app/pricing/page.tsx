"use client";

import { PRICING, getPrice } from "@/lib/pricing";
import PriceCalculator from "@/components/PriceCalculator";
import { IndianRupee, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { getItemName } from "@/lib/translations";

export default function PricingPage() {
  const { t, lang } = useLanguage();

  return (
    <>
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("pricing.title")}
          </h1>
          <p className="text-blue-100 text-lg max-w-xl mx-auto">
            {t("pricing.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t("pricing.priceList")}
              </h2>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="w-5 h-5 text-white" />
                    <h3 className="text-lg font-bold text-white">
                      {t("pricing.standardRates")}
                    </h3>
                  </div>
                </div>
                <div className="divide-y divide-gray-50">
                  <div className="flex items-center px-6 py-3 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <div className="flex-1">{t("pricing.priceList")}</div>
                    <div className="w-24 text-center">{t("pricing.press")}</div>
                    <div className="w-28 text-center">{t("pricing.washPress")}</div>
                  </div>
                  {PRICING.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1 flex items-center gap-3">
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium text-gray-800">
                          {getItemName(item.name, lang)}
                        </span>
                      </div>
                      <div className="w-24 text-center font-bold text-blue-600">
                        ₹{getPrice(item, "press")}
                      </div>
                      <div className="w-28 text-center font-bold text-blue-600">
                        ₹{getPrice(item, "washPress")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 bg-blue-50 rounded-xl p-5 border border-blue-100">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      {t("pricing.bulkDiscounts")}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t("pricing.bulkDiscountsText")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <PriceCalculator />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
