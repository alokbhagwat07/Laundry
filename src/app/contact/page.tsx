"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { motion } from "framer-motion";

const contactMethods = [
  {
    icon: <Phone className="w-5 h-5" />,
    titleKey: "contact.phone",
    value: "+91 95455 28747",
    href: "tel:+919545528747",
    gradient: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: <Phone className="w-5 h-5" />,
    title: "Alt Phone",
    value: "+91 73857 07654",
    href: "tel:+917385707654",
    gradient: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    titleKey: "contact.whatsapp",
    value: "+91 95455 28747",
    href: "https://wa.me/919545528747",
    gradient: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    titleKey: "contact.email",
    value: "bhagwatalok72@gmail.com",
    href: "mailto:bhagwatalok72@gmail.com",
    gradient: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    titleKey: "contact.businessHours",
    gradient: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-400",
    extra: true,
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    titleKey: "contact.location",
    gradient: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-400",
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
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-dark-900 pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-dark-900/50 to-dark-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.06),transparent_50%)]" />
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-56 h-56 bg-purple-500/8 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-40 left-1/3 w-40 h-40 bg-blue-400/5 rounded-full blur-2xl animate-pulse" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 text-blue-300 text-xs font-medium mb-5 tracking-wide shadow-lg shadow-blue-500/5">
              <MessageCircle className="w-3.5 h-3.5" />
              Get in Touch
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight text-balance glow-text" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {t("contact.title")}
            </h1>
            <p className="text-dark-300 text-lg md:text-xl max-w-2xl mx-auto">
              {t("contact.subtitle")}
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 via-dark-900/80 to-transparent" />
      </section>

      <section className="relative py-20 md:py-28 bg-dark-900 overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/3 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/3 rounded-full blur-[100px]" />
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
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium mb-4 tracking-wide">
                  <Sparkles className="w-3.5 h-3.5" />
                  Contact Information
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2 tracking-tight">
                  {t("contact.getInTouch")}
                </h2>
                <p className="text-dark-400 text-lg">
                  {t("contact.getInTouchText")}
                </p>
              </div>

              <div className="space-y-3">
                {contactMethods.map((method, i) => (
                  <div
                    key={i}
                    className="premium-card rounded-2xl p-5 flex items-center gap-4 group hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${method.gradient} rounded-xl flex items-center justify-center shrink-0 ${method.iconColor} group-hover:scale-105 transition-transform`}>
                      {method.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-white mb-0.5 text-sm">
                        {method.titleKey ? t(method.titleKey) : method.title}
                      </h3>
                      {method.href ? (
                        <a
                          href={method.href}
                          className={`text-sm ${method.iconColor} hover:underline`}
                        >
                          {method.value}
                        </a>
                      ) : method.extra ? (
                        <p className="text-sm text-dark-400">
                          {t("contact.hours")}
                        </p>
                      ) : method.address ? (
                        <p className="text-sm text-dark-400">
                          Annapurna Mata Nagar, Wadgoan Road, Alandi Dewachi
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
            >
              <div className="premium-card rounded-2xl p-6 md:p-8">
                <h3 className="text-lg font-bold text-white mb-1">
                  {t("contact.sendMessage")}
                </h3>
                <p className="text-dark-400 text-sm mb-6">
                  {t("contact.sendMessageText")}
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-400" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">
                      {t("contact.thankYou")}
                    </h4>
                    <p className="text-dark-400">{t("contact.thankYouText")}</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      placeholder={t("contact.fullName")}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-dark-500 text-white"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="email"
                        placeholder={t("contact.emailAddress")}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-dark-500 text-white"
                      />
                      <input
                        type="tel"
                        placeholder={t("contact.mobileNumber")}
                        value={form.mobile}
                        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-dark-500 text-white"
                      />
                    </div>
                    <textarea
                      placeholder={t("contact.yourMessage")}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-dark-500 resize-none text-white"
                    />

                    {error && (
                      <p className="text-sm text-red-400 bg-red-500/10 rounded-xl px-4 py-2 border border-red-500/20">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
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
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
