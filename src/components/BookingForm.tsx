"use client";

import { useState } from "react";
import { PRICING, calculateTotal, generateOrderId, getPrice } from "@/lib/pricing";
import { Calendar, Clock, User, Phone, MapPin, Package, CheckCircle2, Sparkles } from "lucide-react";
import type { ServiceType } from "@/lib/types";
import { useLanguage } from "@/lib/LanguageContext";
import { getItemName } from "@/lib/translations";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  mobile: string;
  address: string;
  pickupDate: string;
  pickupTime: string;
  items: Record<string, number>;
}

export default function BookingForm() {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState<FormData>({
    name: "",
    mobile: "",
    address: "",
    pickupDate: "",
    pickupTime: "",
    items: {},
  });
  const [serviceType, setServiceType] = useState<ServiceType>("press");
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState("");

  const updateItem = (name: string, qty: number) => {
    setForm((prev) => {
      const items = { ...prev.items };
      if (qty <= 0) delete items[name];
      else items[name] = qty;
      return { ...prev, items };
    });
  };

  const updateField = (field: keyof Omit<FormData, "items">, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = generateOrderId();
    setOrderId(id);
    const itemsArr = Object.entries(form.items)
      .filter(([, qty]) => qty > 0)
      .map(([name, quantity]) => {
        const pricingItem = PRICING.find((p) => p.name === name);
        return { name, quantity, price: pricingItem ? getPrice(pricingItem, serviceType) : 0 };
      });
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: id,
          customer_name: form.name,
          customer_mobile: form.mobile,
          customer_address: form.address,
          items: itemsArr,
          total_amount: Math.round(discountedTotal),
          pickup_date: form.pickupDate,
          pickup_time: form.pickupTime,
          service_type: serviceType,
          payment_mode: "cod",
          payment_status: "Pending",
        }),
      });
      if (!res.ok) {
        const errData = await res.json();
        console.error("Order API error:", errData.error);
        alert("Failed to place order: " + (errData.error || "Server error"));
        return;
      }
    } catch (err) {
      console.error("Failed to save order", err);
      alert("Network error: Could not reach server. Please try again.");
      return;
    }
    setSubmitted(true);
  };

  const totalItems = Object.values(form.items).reduce((a, b) => a + b, 0);
  const totalAmount = calculateTotal(form.items, serviceType);
  const discount = totalAmount >= 1000 ? 0.1 : totalAmount >= 500 ? 0.05 : 0;
  const discountedTotal = totalAmount - totalAmount * discount;

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card rounded-2xl shadow-xl p-8 md:p-10 text-center max-w-lg mx-auto"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          {t("booking.confirmed")}
        </h3>
        <p className="text-dark-400 mb-4">
          {t("booking.confirmedText")}
        </p>
        <div className="bg-blue-500/10 rounded-xl p-5 mb-6 border border-blue-500/20">
          <p className="text-sm text-dark-400 mb-1">{t("booking.yourOrderId")}</p>
          <p className="text-2xl font-bold text-blue-400 font-mono tracking-wider">
            {orderId}
          </p>
          <p className="text-xs text-dark-500 mt-1">
            {t("booking.saveId")}
          </p>
        </div>
        <div className="space-y-2 text-sm bg-white/[0.03] rounded-xl p-4 mb-6 border border-white/[0.06]">
          <p><span className="text-dark-400">{t("booking.fullName")}:</span> <span className="font-medium text-white">{form.name}</span></p>
          <p><span className="text-dark-400">{t("booking.mobileNumber")}:</span> <span className="font-medium text-white">{form.mobile}</span></p>
          <p><span className="text-dark-400">{t("booking.pickupSchedule")}:</span> <span className="font-medium text-white">{form.pickupDate} at {form.pickupTime}</span></p>
          <p><span className="text-dark-400">{t("booking.totalItems")}:</span> <span className="font-medium text-white">{totalItems} items</span></p>
          <p><span className="text-dark-400">{t("booking.total")}:</span> <span className="font-bold text-blue-400">₹{discountedTotal.toFixed(0)}</span></p>
        </div>
        <div className="flex gap-3 justify-center">
          <a
            href={`/tracking`}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-indigo-600 transition-all shadow-md"
          >
            {t("booking.trackOrder")}
          </a>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({
                name: "",
                mobile: "",
                address: "",
                pickupDate: "",
                pickupTime: "",
                items: {},
              });
            }}
            className="px-6 py-2.5 border border-white/[0.08] text-dark-300 rounded-xl text-sm font-medium hover:bg-white/[0.04] transition-colors"
          >
            {t("booking.bookAnother")}
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div className="glass-card rounded-2xl p-6 md:p-8 space-y-5">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-lg flex items-center justify-center">
            <User className="w-4 h-4 text-blue-400" />
          </div>
          {t("booking.personalDetails")}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
            <input
              type="text"
              placeholder={t("booking.fullName")}
              required
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-dark-500 text-white"
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
            <input
              type="tel"
              placeholder={t("booking.mobileNumber")}
              required
              value={form.mobile}
              onChange={(e) => updateField("mobile", e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-dark-500 text-white"
            />
          </div>
        </div>

        <div className="relative">
          <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-dark-400" />
          <textarea
            placeholder={t("booking.address")}
            required
            value={form.address}
            onChange={(e) => updateField("address", e.target.value)}
            rows={2}
            className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-dark-500 text-white"
          />
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 md:p-8 space-y-5">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-lg flex items-center justify-center">
            <Calendar className="w-4 h-4 text-blue-400" />
          </div>
          {t("booking.pickupSchedule")}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
            <input
              type="date"
              required
              value={form.pickupDate}
              onChange={(e) => updateField("pickupDate", e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white"
            />
          </div>
          <div className="relative">
            <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
            <select
              required
              value={form.pickupTime}
              onChange={(e) => updateField("pickupTime", e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none text-white"
            >
              <option value="" className="bg-dark-800">{t("booking.selectTime")}</option>
              <option value="8:00 AM - 10:00 AM" className="bg-dark-800">8:00 AM - 10:00 AM</option>
              <option value="10:00 AM - 12:00 PM" className="bg-dark-800">10:00 AM - 12:00 PM</option>
              <option value="12:00 PM - 2:00 PM" className="bg-dark-800">12:00 PM - 2:00 PM</option>
              <option value="2:00 PM - 4:00 PM" className="bg-dark-800">2:00 PM - 4:00 PM</option>
              <option value="4:00 PM - 6:00 PM" className="bg-dark-800">4:00 PM - 6:00 PM</option>
              <option value="6:00 PM - 8:00 PM" className="bg-dark-800">6:00 PM - 8:00 PM</option>
            </select>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 md:p-8 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-lg flex items-center justify-center">
            <Package className="w-4 h-4 text-blue-400" />
          </div>
          {t("booking.laundryItems")}
        </h3>

        <div className="flex bg-white/[0.04] rounded-xl p-1">
          <button
            type="button"
            onClick={() => setServiceType("press")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              serviceType === "press"
                ? "bg-blue-500/20 text-blue-300 shadow-sm"
                : "text-dark-400 hover:text-dark-200"
            }`}
          >
            {t("pricing.press")}
          </button>
          <button
            type="button"
            onClick={() => setServiceType("washPress")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              serviceType === "washPress"
                ? "bg-blue-500/20 text-blue-300 shadow-sm"
                : "text-dark-400 hover:text-dark-200"
            }`}
          >
            {t("pricing.washPress")}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PRICING.map((item) => (
            <div
              key={item.name}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-200 ${
                (form.items[item.name] || 0) > 0
                  ? "border-blue-500/30 bg-blue-500/10"
                  : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-lg">{item.icon}</span>
                <div>
                  <p className="text-sm font-medium text-white">
                    {getItemName(item.name, lang)}
                  </p>
                  <p className="text-xs text-dark-400">
                    ₹{getPrice(item, serviceType)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    updateItem(item.name, (form.items[item.name] || 0) - 1)
                  }
                  className="w-7 h-7 rounded-lg border border-white/[0.08] flex items-center justify-center text-dark-300 hover:bg-white/[0.06] transition-colors text-sm"
                >
                  -
                </button>
                <span className="w-7 text-center text-sm font-semibold text-white">
                  {form.items[item.name] || 0}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    updateItem(item.name, (form.items[item.name] || 0) + 1)
                  }
                  className="w-7 h-7 rounded-lg border border-white/[0.08] flex items-center justify-center text-dark-300 hover:bg-white/[0.06] transition-colors text-sm"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {totalItems > 0 && (
          <div className="bg-white/[0.03] rounded-xl p-4 space-y-1.5 border border-white/[0.06]">
            <div className="flex justify-between text-sm">
              <span className="text-dark-400">{t("booking.totalItems")}</span>
              <span className="font-medium text-white">{totalItems}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-dark-400">{t("booking.subtotal")}</span>
              <span className="font-medium text-white">₹{totalAmount}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-green-400">
                  {t("booking.discount")} ({discount * 100}%)
                </span>
                <span className="text-green-400">
                  -₹{(totalAmount * discount).toFixed(0)}
                </span>
              </div>
            )}
            <div className="flex justify-between font-bold pt-2 border-t border-white/[0.08]">
              <span className="text-white">{t("booking.total")}</span>
              <span className="text-blue-400">
                ₹{discountedTotal.toFixed(0)}
              </span>
            </div>
          </div>
        )}
      </div>

      <motion.button
        type="submit"
        disabled={totalItems === 0}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-400/30"
      >
        {t("booking.bookPickup")} — ₹{totalItems > 0 ? discountedTotal.toFixed(0) : "0.00"}
      </motion.button>
    </form>
  );
}
