"use client";

import { useState } from "react";
import { Search, CheckCircle2, Package, Truck, Sparkles, Sun, Loader2 } from "lucide-react";
import type { OrderStatus, Order } from "@/lib/types";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

const STEPS: { status: OrderStatus; icon: React.ReactNode }[] = [
  { status: "Order Received", icon: <CheckCircle2 className="w-5 h-5" /> },
  { status: "Pickup Scheduled", icon: <Package className="w-5 h-5" /> },
  { status: "Washing", icon: <Sparkles className="w-5 h-5" /> },
  { status: "Ironing", icon: <Sun className="w-5 h-5" /> },
  { status: "Out for Delivery", icon: <Truck className="w-5 h-5" /> },
  { status: "Delivered", icon: <CheckCircle2 className="w-5 h-5" /> },
];

const STATUS_TRANSLATION_KEY: Record<string, string> = {
  "Order Received": "tracking.status.orderReceived",
  "Pickup Scheduled": "tracking.status.pickupScheduled",
  "Washing": "tracking.status.washing",
  "Ironing": "tracking.status.ironing",
  "Out for Delivery": "tracking.status.outForDelivery",
  "Delivered": "tracking.status.delivered",
};

export default function OrderTracker() {
  const { t } = useLanguage();
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    if (!orderId.trim()) return;
    setSearched(true);
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/orders/${orderId.trim().toUpperCase()}`);
      if (res.ok) {
        const data = await res.json();
        setOrder(data);
      } else {
        setOrder(null);
        setError(t("tracking.notFound"));
      }
    } catch {
      setOrder(null);
      setError(t("tracking.error"));
    }
    setLoading(false);
  };

  const currentIdx = order
    ? STEPS.findIndex((s) => s.status === order.status)
    : -1;

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex gap-3 mb-8">
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleTrack()}
          placeholder={t("tracking.enterId")}
          className="flex-1 px-5 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleTrack}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          {t("tracking.track")}
        </button>
      </div>

      {loading && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 text-center">
          <Loader2 className="w-10 h-10 text-blue-600 mx-auto mb-3 animate-spin" />
          <p className="text-gray-600">{t("tracking.searching")}</p>
        </div>
      )}

      {searched && !loading && !order && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 text-center">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600 font-medium">{error || t("tracking.notFound")}</p>
          <p className="text-sm text-gray-400 mt-1 mb-4">
            {t("tracking.noOrderYet")}
          </p>
          <Link
            href="/booking"
            className="inline-flex px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            {t("tracking.bookPickup")}
          </Link>
        </div>
      )}

      {order && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <p className="text-blue-100 text-sm">{t("tracking.orderId")}</p>
            <p className="text-white text-xl font-bold">{order.order_id}</p>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{t("tracking.customer")}</span>
              <span className="font-medium text-gray-800">
                {order.customer_name}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{t("tracking.items")}</span>
              <span className="font-medium text-gray-800">
                {order.items.map((i) => `${i.quantity}x ${i.name}`).join(", ")}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{t("tracking.pickupDate")}</span>
              <span className="font-medium text-gray-800">
                {order.pickup_date}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{t("tracking.amount")}</span>
              <span className="font-bold text-blue-600">
                ₹{order.total_amount}
              </span>
            </div>

            <div className="h-px bg-gray-100" />

            <div className="space-y-0">
              {STEPS.map((step, i) => {
                const isComplete = i <= currentIdx;
                const isCurrent = i === currentIdx;
                return (
                  <div key={step.status} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          isComplete
                            ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                            : "bg-gray-100 text-gray-300"
                        } ${isCurrent ? "ring-4 ring-blue-100" : ""}`}
                      >
                        {step.icon}
                      </div>
                      {i < STEPS.length - 1 && (
                        <div
                          className={`w-0.5 h-8 ${
                            i < currentIdx ? "bg-blue-600" : "bg-gray-200"
                          }`}
                        />
                      )}
                    </div>
                    <div className="pb-6 pt-1.5">
                      <p
                        className={`text-sm font-medium ${
                          isComplete
                            ? "text-gray-900"
                            : "text-gray-400"
                        }`}
                      >
                        {t(STATUS_TRANSLATION_KEY[step.status] || step.status)}
                      </p>
                      {isCurrent && (
                        <p className="text-xs text-blue-600 mt-0.5">
                          {t("tracking.status.inProgress")}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
