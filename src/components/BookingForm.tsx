"use client";

import { useState } from "react";
import { PRICING, calculateTotal, generateOrderId, getPrice } from "@/lib/pricing";
import { Calendar, Clock, User, Phone, MapPin, Package, CheckCircle2 } from "lucide-react";
import type { ServiceType } from "@/lib/types";
import { useLanguage } from "@/lib/LanguageContext";
import { getItemName } from "@/lib/translations";

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
      await fetch("/api/orders", {
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
        }),
      });
    } catch (err) {
      console.error("Failed to save order", err);
    }
    setSubmitted(true);
  };

  const totalItems = Object.values(form.items).reduce((a, b) => a + b, 0);
  const totalAmount = calculateTotal(form.items, serviceType);
  const discount = totalAmount >= 1000 ? 0.1 : totalAmount >= 500 ? 0.05 : 0;
  const discountedTotal = totalAmount - totalAmount * discount;

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 md:p-10 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {t("booking.confirmed")} 🎉
        </h3>
        <p className="text-gray-500 mb-4">
          {t("booking.confirmedText")}
        </p>
        <div className="bg-blue-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-500 mb-1">{t("booking.yourOrderId")}</p>
          <p className="text-2xl font-bold text-blue-700 font-mono">
            {orderId}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {t("booking.saveId")}
          </p>
        </div>
        <div className="space-y-2 text-sm text-left bg-gray-50 rounded-xl p-4 mb-6">
          <p><span className="text-gray-500">{t("booking.fullName")}:</span> <span className="font-medium">{form.name}</span></p>
          <p><span className="text-gray-500">{t("booking.mobileNumber")}:</span> <span className="font-medium">{form.mobile}</span></p>
          <p><span className="text-gray-500">{t("booking.pickupSchedule")}:</span> <span className="font-medium">{form.pickupDate} at {form.pickupTime}</span></p>
          <p><span className="text-gray-500">{t("booking.totalItems")}:</span> <span className="font-medium">{totalItems} items</span></p>
          <p><span className="text-gray-500">{t("booking.total")}:</span> <span className="font-bold text-blue-600">₹{discountedTotal.toFixed(0)}</span></p>
        </div>
        <div className="flex gap-3 justify-center">
          <a
            href={`/tracking`}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
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
            className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            {t("booking.bookAnother")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 md:p-8 space-y-5">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          {t("booking.personalDetails")}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t("booking.fullName")}
              required
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="tel"
              placeholder={t("booking.mobileNumber")}
              required
              value={form.mobile}
              onChange={(e) => updateField("mobile", e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
            />
          </div>
        </div>

        <div className="relative">
          <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
          <textarea
            placeholder={t("booking.address")}
            required
            value={form.address}
            onChange={(e) => updateField("address", e.target.value)}
            rows={2}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 md:p-8 space-y-5">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          {t("booking.pickupSchedule")}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="date"
              required
              value={form.pickupDate}
              onChange={(e) => updateField("pickupDate", e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
            />
          </div>
          <div className="relative">
            <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              required
              value={form.pickupTime}
              onChange={(e) => updateField("pickupTime", e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors appearance-none"
            >
              <option value="">{t("booking.selectTime")}</option>
              <option value="8:00 AM - 10:00 AM">8:00 AM - 10:00 AM</option>
              <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
              <option value="12:00 PM - 2:00 PM">12:00 PM - 2:00 PM</option>
              <option value="2:00 PM - 4:00 PM">2:00 PM - 4:00 PM</option>
              <option value="4:00 PM - 6:00 PM">4:00 PM - 6:00 PM</option>
              <option value="6:00 PM - 8:00 PM">6:00 PM - 8:00 PM</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 md:p-8 space-y-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Package className="w-5 h-5 text-blue-600" />
          {t("booking.laundryItems")}
        </h3>

        <div className="flex bg-gray-100 rounded-xl p-1">
          <button
            type="button"
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
            type="button"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PRICING.map((item) => (
            <div
              key={item.name}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                (form.items[item.name] || 0) > 0
                  ? "border-blue-200 bg-blue-50"
                  : "border-gray-100 bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-lg">{item.icon}</span>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {getItemName(item.name, lang)}
                  </p>
                  <p className="text-xs text-gray-400">
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
                  className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-white transition-colors text-sm"
                >
                  -
                </button>
                <span className="w-7 text-center text-sm font-semibold text-gray-800">
                  {form.items[item.name] || 0}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    updateItem(item.name, (form.items[item.name] || 0) + 1)
                  }
                  className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-white transition-colors text-sm"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {totalItems > 0 && (
          <div className="bg-gray-50 rounded-xl p-4 space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{t("booking.totalItems")}</span>
              <span className="font-medium text-gray-800">{totalItems}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{t("booking.subtotal")}</span>
              <span className="font-medium">₹{totalAmount}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-green-600">
                  {t("booking.discount")} ({discount * 100}%)
                </span>
                <span className="text-green-600">
                  -₹{(totalAmount * discount).toFixed(0)}
                </span>
              </div>
            )}
            <div className="flex justify-between font-bold pt-2 border-t border-gray-200">
              <span className="text-gray-900">{t("booking.total")}</span>
              <span className="text-blue-600">
                ₹{discountedTotal.toFixed(0)}
              </span>
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={totalItems === 0}
        className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-200"
      >
        {t("booking.bookPickup")} — ₹{totalItems > 0 ? discountedTotal.toFixed(0) : "0.00"}
      </button>
    </form>
  );
}
