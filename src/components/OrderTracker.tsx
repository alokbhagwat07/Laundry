"use client";

import { useState } from "react";
import { Search, CheckCircle2, Package, Truck, Sparkles, Sun, Loader2 } from "lucide-react";
import type { OrderStatus, Order } from "@/lib/types";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

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
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleTrack()}
            placeholder={t("tracking.enterId")}
            className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder:text-dark-500"
          />
        </div>
        <button
          onClick={handleTrack}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-xl hover:from-blue-700 hover:to-indigo-600 transition-all duration-200 flex items-center gap-2 shadow-lg shadow-blue-500/20"
        >
          <Search className="w-4 h-4" />
          {t("tracking.track")}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass-card rounded-2xl shadow-xl p-8 text-center"
          >
            <Loader2 className="w-10 h-10 text-blue-400 mx-auto mb-3 animate-spin" />
            <p className="text-dark-300">{t("tracking.searching")}</p>
          </motion.div>
        )}

        {searched && !loading && !order && (
          <motion.div
            key="notfound"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card rounded-2xl shadow-xl p-8 text-center"
          >
            <Package className="w-12 h-12 text-dark-500 mx-auto mb-3" />
            <p className="text-dark-300 font-medium">{error || t("tracking.notFound")}</p>
            <p className="text-sm text-dark-400 mt-1 mb-4">
              {t("tracking.noOrderYet")}
            </p>
            <Link
              href="/booking"
              className="inline-flex px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-indigo-600 transition-all shadow-md"
            >
              {t("tracking.bookPickup")}
            </Link>
          </motion.div>
        )}

        {order && (
          <motion.div
            key="order"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card rounded-2xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-purple-600/30 px-6 py-5 border-b border-white/[0.06]">
              <p className="text-dark-300 text-sm">{t("tracking.orderId")}</p>
              <p className="text-white text-xl font-bold tracking-wider">{order.order_id}</p>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/[0.03] rounded-xl p-3">
                  <p className="text-xs text-dark-400 mb-0.5">{t("tracking.customer")}</p>
                  <p className="font-medium text-white text-sm">{order.customer_name}</p>
                </div>
                <div className="bg-white/[0.03] rounded-xl p-3">
                  <p className="text-xs text-dark-400 mb-0.5">{t("tracking.amount")}</p>
                  <p className="font-bold text-blue-400 text-sm">₹{order.total_amount}</p>
                </div>
                <div className="bg-white/[0.03] rounded-xl p-3">
                  <p className="text-xs text-dark-400 mb-0.5">{t("tracking.pickupDate")}</p>
                  <p className="font-medium text-white text-sm">{order.pickup_date}</p>
                </div>
                <div className="bg-white/[0.03] rounded-xl p-3">
                  <p className="text-xs text-dark-400 mb-0.5">{t("tracking.items")}</p>
                  <p className="font-medium text-white text-sm truncate" title={order.items.map((i) => `${i.quantity}x ${i.name}`).join(", ")}>
                    {order.items.map((i) => `${i.quantity}x ${i.name}`).join(", ")}
                  </p>
                </div>
              </div>

              <div className="h-px bg-white/[0.06]" />

              <div className="space-y-0">
                {STEPS.map((step, i) => {
                  const isComplete = i <= currentIdx;
                  const isCurrent = i === currentIdx;
                  return (
                    <div key={step.status} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <motion.div
                          initial={false}
                          animate={{ scale: isCurrent ? 1.1 : 1 }}
                          transition={{ duration: 0.3 }}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isComplete
                              ? "bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-md shadow-blue-500/20"
                              : "bg-white/[0.04] text-dark-500"
                          } ${isCurrent ? "ring-4 ring-blue-500/20" : ""}`}
                        >
                          {step.icon}
                        </motion.div>
                        {i < STEPS.length - 1 && (
                          <div
                            className={`w-0.5 h-8 transition-colors duration-300 ${
                              i < currentIdx ? "bg-blue-500" : "bg-white/[0.06]"
                            }`}
                          />
                        )}
                      </div>
                      <div className="pb-6 pt-1.5">
                        <p
                          className={`text-sm font-medium transition-colors duration-300 ${
                            isComplete ? "text-white" : "text-dark-500"
                          }`}
                        >
                          {t(STATUS_TRANSLATION_KEY[step.status] || step.status)}
                        </p>
                        {isCurrent && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs text-blue-400 mt-0.5"
                          >
                            {t("tracking.status.inProgress")}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
