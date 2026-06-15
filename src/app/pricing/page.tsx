"use client";

import { PRICING, getPrice } from "@/lib/pricing";
import PriceCalculator from "@/components/PriceCalculator";
import { IndianRupee, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { getItemName } from "@/lib/translations";
import { motion } from "framer-motion";

export default function PricingPage() {
  const { t, lang } = useLanguage();

  return (
    <>
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-dark-900 pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/60 via-dark-900 to-dark-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_60%)]" />
        <div className="absolute inset-0 hero-grid opacity-10" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-float-slow" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium mb-5 tracking-wide">
              <IndianRupee className="w-3.5 h-3.5" />
              Transparent Pricing
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight text-balance glow-text">
              {t("pricing.title")}
            </h1>
            <p className="text-dark-300 text-lg md:text-xl max-w-2xl mx-auto">
              {t("pricing.subtitle")}
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark-900 to-transparent" />
      </section>

      <section className="py-20 md:py-28 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center">
                    <IndianRupee className="w-5 h-5 text-blue-400" />
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                    {t("pricing.priceList")}
                  </h2>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass-card rounded-2xl overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-purple-600/30 px-6 py-5 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="w-5 h-5 text-blue-300" />
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {t("pricing.standardRates")}
                    </h3>
                  </div>
                </div>
                <div className="divide-y divide-white/[0.04]">
                  <div className="flex items-center px-6 py-3 bg-white/[0.02] text-xs font-semibold text-dark-400 uppercase tracking-wider">
                    <div className="flex-1">{t("pricing.priceList")}</div>
                    <div className="w-24 text-center">{t("pricing.press")}</div>
                    <div className="w-28 text-center">{t("pricing.washPress")}</div>
                  </div>
                  {PRICING.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center px-6 py-4 hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="flex-1 flex items-center gap-3">
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium text-white">
                          {getItemName(item.name, lang)}
                        </span>
                      </div>
                      <div className="w-24 text-center font-bold text-blue-400">
                        ₹{getPrice(item, "press")}
                      </div>
                      <div className="w-28 text-center font-bold text-blue-400">
                        ₹{getPrice(item, "washPress")}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-xl p-5 border border-blue-500/20"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">
                      {t("pricing.bulkDiscounts")}
                    </p>
                    <p className="text-sm text-dark-300">
                      {t("pricing.bulkDiscountsText")}
                    </p>
                  </div>
                </div>
              </motion.div>
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
