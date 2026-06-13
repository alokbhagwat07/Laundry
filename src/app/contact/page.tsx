"use client";

import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();

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
                {t("contact.findUs")}
              </h2>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
                <div className="aspect-video bg-gray-200 relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.0703190915358!2d73.89996257589269!3d18.53637608256767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c3f3c3c3c3c3%3A0x3c3c3c3c3c3c3c3c!2sAlandi%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0, position: "absolute", inset: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mauli Laundry Location"
                  />
                </div>
              </div>

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
