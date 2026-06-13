"use client";

import { useState } from "react";
import { PRICING, calculateTotal, getPrice } from "@/lib/pricing";
import { ShoppingCart, Trash2 } from "lucide-react";
import type { ServiceType } from "@/lib/types";
import { useLanguage } from "@/lib/LanguageContext";
import { getItemName } from "@/lib/translations";

export default function PriceCalculator() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [serviceType, setServiceType] = useState<ServiceType>("press");
  const { t, lang } = useLanguage();

  const updateQty = (name: string, val: number) => {
    setQuantities((prev) => {
      const next = { ...prev };
      if (val <= 0) {
        delete next[name];
      } else {
        next[name] = val;
      }
      return next;
    });
  };

  const total = calculateTotal(quantities, serviceType);
  const hasItems = Object.keys(quantities).length > 0;
  const discount = total >= 1000 ? 0.1 : total >= 500 ? 0.05 : 0;
  const discountedTotal = total - total * discount;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
        <div className="flex items-center gap-2.5">
          <ShoppingCart className="w-5 h-5 text-white" />
          <h3 className="text-lg font-bold text-white">{t("calculator.title")}</h3>
        </div>
        <p className="text-blue-100 text-sm mt-1">
          {t("calculator.subtitle")}
        </p>
      </div>

      <div className="p-4 border-b border-gray-100">
        <div className="flex bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setServiceType("press")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              serviceType === "press"
                ? "bg-white text-blue-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t("pricing.press")}
          </button>
          <button
            onClick={() => setServiceType("washPress")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              serviceType === "washPress"
                ? "bg-white text-blue-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t("pricing.washPress")}
          </button>
        </div>
      </div>

      <div className="p-6 space-y-2">
        {PRICING.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{item.icon}</span>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {getItemName(item.name, lang)}
                </p>
                <p className="text-xs text-gray-400">
                  ₹{getPrice(item, serviceType)} {t("calculator.each")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  updateQty(item.name, (quantities[item.name] || 0) - 1)
                }
                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
              >
                -
              </button>
              <span className="w-8 text-center text-sm font-semibold text-gray-800">
                {quantities[item.name] || 0}
              </span>
              <button
                onClick={() =>
                  updateQty(item.name, (quantities[item.name] || 0) + 1)
                }
                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {hasItems && (
        <div className="px-6 pb-6 space-y-3">
          <div className="h-px bg-gray-100" />
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{t("calculator.subtotal")}</span>
              <span className="font-medium text-gray-800">₹{total}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-green-600">
                  {t("calculator.bulkDiscount")} ({discount * 100}%)
                </span>
                <span className="text-green-600">
                  -₹{(total * discount).toFixed(0)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-100">
              <span className="text-gray-900">{t("calculator.total")}</span>
              <span className="text-blue-600">₹{discountedTotal.toFixed(0)}</span>
            </div>
          </div>
          <button
            onClick={() => setQuantities({})}
            className="flex items-center justify-center gap-2 w-full py-2.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            {t("calculator.clearAll")}
          </button>
        </div>
      )}
    </div>
  );
}
