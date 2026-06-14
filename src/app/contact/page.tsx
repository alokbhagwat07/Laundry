"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2, Loader2, Sparkles, HeadphonesIcon } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { motion } from "framer-motion";

const contactMethods = [
  {
    icon: <Phone className="w-5 h-5" />,
    titleKey: "contact.phone",
    value: "+91 95455 28747",
    href: "tel:+919545528747",
    gradient: "from-blue-50 to-indigo-50",
    iconColor: "text-blue-600",
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    titleKey: "contact.whatsapp",
    value: "+91 95455 28747",
    href: "https://wa.me/919545528747",
    gradient: "from-green-50 to-emerald-50",
    iconColor: "text-green-600",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    titleKey: "contact.email",
    value: "bhagwatalok72@gmail.com",
    href: "mailto:bhagwatalok72@gmail.com",
    gradient: "from-blue-50 to-indigo-50",
    iconColor: "text-blue-600",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    titleKey: "contact.businessHours",
    gradient: "from-blue-50 to-indigo-50",
    iconColor: "text-blue-600",
    extra: true,
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    titleKey: "contact.location",
    gradient: "from-blue-50 to-indigo-50",
    iconColor: "text-blue-600",
    address: true,
  },
];

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
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-600 via-blue-700 to-indigo-900 py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl animate-float" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm text-blue-100 text-xs font-medium mb-5 tracking-wide">
              <MessageCircle className="w-3.5 h-3.5" />
              Get in Touch
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight text-balance">
              {t("contact.title")}
            </h1>
            <p className="text-blue-100/70 text-lg md:text-xl max-w-2xl mx-auto">
              {t("contact.subtitle")}
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-medium mb-4 tracking-wide">
                  <Sparkles className="w-3.5 h-3.5" />
                  Contact Information
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
                  {t("contact.getInTouch")}
                </h2>
                <p className="text-gray-500 text-lg">
                  {t("contact.getInTouchText")}
                </p>
              </div>

              <div className="space-y-3">
                {contactMethods.map((method, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-start gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 card-hover"
                  >
                    <div className={`w-11 h-11 bg-gradient-to-br ${method.gradient} rounded-xl flex items-center justify-center shrink-0`}>
                      <div className={method.iconColor}>{method.icon}</div>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-0.5 text-sm">
                        {t(method.titleKey)}
                      </h3>
                      {method.href ? (
                        <a
                          href={method.href}
                          target={method.href.startsWith("http") ? "_blank" : undefined}
                          rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-gray-500 text-sm hover:text-blue-600 transition-colors"
                        >
                          {method.value}
                        </a>
                      ) : method.extra ? (
                        <div>
                          <p className="text-gray-500 text-sm">
                            {t("contact.hours")}
                          </p>
                          <p className="text-gray-400 text-xs mt-0.5">
                            {t("contact.openEveryDay")}
                          </p>
                        </div>
                      ) : method.address ? (
                        <p className="text-gray-500 text-sm">
                          {t("contact.address")}
                        </p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-medium mb-4 tracking-wide">
                  <Send className="w-3.5 h-3.5" />
                  Send a Message
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
                  {t("contact.sendMessage")}
                </h2>
                <p className="text-gray-500 text-lg">
                  {t("contact.sendMessageText")}
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {t("contact.messageSent")}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    {t("contact.messageSentText")}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-indigo-600 transition-all shadow-md"
                  >
                    {t("contact.sendAnother")}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 md:p-8 space-y-4 card-hover">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t("contact.formName")} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
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
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
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
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
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
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none placeholder:text-gray-400"
                      placeholder={t("contact.formMessagePlaceholder")}
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2 border border-red-100">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-600 disabled:opacity-50 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-200/50 active:scale-[0.98]"
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

              <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl p-6 text-white">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/[0.03] rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="relative">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <HeadphonesIcon className="w-5 h-5" />
                    {t("contact.chatWithAI")}
                  </h3>
                  <p className="text-blue-100/80 text-sm mb-4">
                    {t("contact.chatWithAIText")}
                  </p>
                  <p className="text-blue-200/60 text-xs">
                    {t("contact.chatSubtext")}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
