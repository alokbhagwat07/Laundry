"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2, Loader2 } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", mobile: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", mobile: "", message: "" });
      } else {
        const data = await res.json();
        setError(data.error || "Failed to submit");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <>
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("contact.title")}
          </h1>
          <p className="text-blue-100 text-lg max-w-xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t("contact.getInTouch")}
              </h2>
              <p className="text-gray-500">
                {t("contact.getInTouchText")}
              </p>

              <div className="space-y-4">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
                  <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-0.5">
                      {t("contact.phone")}
                    </h3>
                    <a
                      href="tel:+919545528747"
                      className="text-gray-500 text-sm hover:text-blue-600 transition-colors"
                    >
                      +91 95455 28747
                    </a>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
                  <div className="w-11 h-11 bg-green-50 text-green-600 rounded-xl flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-0.5">
                      {t("contact.whatsapp")}
                    </h3>
                    <a
                      href="https://wa.me/919545528747"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 text-sm hover:text-green-600 transition-colors"
                    >
                      +91 95455 28747
                    </a>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
                  <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-0.5">
                      {t("contact.email")}
                    </h3>
                    <a
                      href="mailto:bhagwatalok72@gmail.com"
                      className="text-gray-500 text-sm hover:text-blue-600 transition-colors"
                    >
                      bhagwatalok72@gmail.com
                    </a>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
                  <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-0.5">
                      {t("contact.businessHours")}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {t("contact.hours")}
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {t("contact.openEveryDay")}
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
                  <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-0.5">
                      {t("contact.location")}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {t("contact.address")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t("contact.sendMessage")}
              </h2>
              <p className="text-gray-500">
                {t("contact.sendMessageText")}
              </p>

              {submitted ? (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {t("contact.messageSent")}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    {t("contact.messageSentText")}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    {t("contact.sendAnother")}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 md:p-8 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t("contact.formName")} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                      placeholder={t("contact.formNamePlaceholder")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t("contact.formEmail")}
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                      placeholder={t("contact.formEmailPlaceholder")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t("contact.formMobile")}
                    </label>
                    <input
                      type="tel"
                      value={form.mobile}
                      onChange={(e) => setForm((p) => ({ ...p, mobile: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                      placeholder={t("contact.formMobilePlaceholder")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t("contact.formMessage")} <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                      placeholder={t("contact.formMessagePlaceholder")}
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    {t("contact.sendMessage")}
                  </button>
                </form>
              )}

              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">
                  💬 {t("contact.chatWithAI")}
                </h3>
                <p className="text-blue-100 text-sm mb-4">
                  {t("contact.chatWithAIText")}
                </p>
                <p className="text-blue-200 text-xs">
                  {t("contact.chatSubtext")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
