export type Language = "en" | "mr";

export const translations: Record<Language, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.pricing": "Pricing",
    "nav.booking": "Booking",
    "nav.tracking": "Tracking",
    "nav.contact": "Contact",
    "nav.bookNow": "Book Now",

    "home.hero.badge": "AI-Powered Laundry Service",
    "home.hero.title": "Fast, Reliable & Affordable",
    "home.hero.titleHighlight": "Laundry Service",
    "home.hero.subtitle":
      "Professional laundry care with free doorstep pickup and delivery. Quality guaranteed, powered by AI for a seamless experience.",
    "home.hero.bookPickup": "Book Pickup",
    "home.hero.viewPricing": "View Pricing",
    "home.hero.happyCustomers": "Happy Customers",

    "home.features.title": "Why Choose",
    "home.features.titleHighlight": "Mauli Laundry",

    "home.features.subtitle":
      "We combine quality service with modern convenience to give you the best laundry experience.",

    "home.feature.pickup.title": "Free Pickup & Delivery",
    "home.feature.pickup.desc":
      "Doorstep service at your convenience. Schedule online and we'll handle the rest.",
    "home.feature.quality.title": "Premium Quality",
    "home.feature.quality.desc":
      "Expert care for all fabrics with premium detergents and professional finishing.",
    "home.feature.delivery.title": "48-Hour Delivery",
    "home.feature.delivery.desc":
      "Standard delivery in 48 hours. Express service available in 24 hours.",
    "home.feature.ai.title": "AI-Powered Support",
    "home.feature.ai.desc":
      "24/7 intelligent chatbot assistance for bookings, queries, and tracking.",
    "home.feature.star.title": "5-Star Service",
    "home.feature.star.desc":
      "Trusted by hundreds of happy customers across the city.",
    "home.feature.comm.title": "Easy Communication",
    "home.feature.comm.desc":
      "Reach us via call, WhatsApp, or chat. We're always available.",

    "home.testimonials.title": "What Our",
    "home.testimonials.titleHighlight": "Customers",
    "home.testimonials.subtitle": "Real reviews from our happy customers.",

    "home.areas.title": "Service",
    "home.areas.titleHighlight": "Coverage",
    "home.areas.subtitle": "We serve in",

    "home.cta.title": "Ready for Fresh, Clean Laundry?",
    "home.cta.subtitle":
      "Schedule a pickup today and experience the best laundry service in town.",
    "home.cta.bookPickup": "Book a Pickup",
    "home.cta.callUs": "Call Us",

    "pricing.title": "Transparent Pricing",
    "pricing.subtitle":
      "No hidden charges. What you see is what you pay. Use our calculator for instant estimates.",
    "pricing.priceList": "Price List",
    "pricing.standardRates": "Standard Rates",
    "pricing.press": "Press",
    "pricing.washPress": "Wash & Press",
    "pricing.bulkDiscounts": "Bulk Discounts Available",
    "pricing.bulkDiscountsText":
      "Orders above ₹500 get 5% off · Orders above ₹1000 get 10% off",

    "calculator.title": "Price Calculator",
    "calculator.subtitle": "Enter quantities to get instant estimates",
    "calculator.each": "each",
    "calculator.subtotal": "Subtotal",
    "calculator.bulkDiscount": "Bulk Discount",
    "calculator.total": "Total",
    "calculator.clearAll": "Clear All",

    "booking.title": "Book a Pickup",
    "booking.subtitle":
      "Schedule your laundry pickup in minutes. Fill in your details and we'll take care of the rest.",
    "booking.personalDetails": "Personal Details",
    "booking.pickupSchedule": "Pickup Schedule",
    "booking.laundryItems": "Laundry Items",
    "booking.fullName": "Full Name",
    "booking.mobileNumber": "Mobile Number",
    "booking.address": "Full Address for Pickup",
    "booking.selectTime": "Select Time",
    "booking.totalItems": "Total Items",
    "booking.subtotal": "Subtotal",
    "booking.discount": "Discount",
    "booking.total": "Total",
    "booking.serviceType": "Service Type",
    "booking.bookPickup": "Book Pickup",

    "booking.whyBookWithUs": "Why Book With Us?",
    "booking.needHelp": "Need Help?",
    "booking.needHelpText":
      "Chat with our AI assistant or call us directly.",

    "booking.confirmed": "Booking Confirmed!",
    "booking.confirmedText":
      "Your laundry pickup has been booked successfully.",
    "booking.yourOrderId": "Your Order ID",
    "booking.saveId": "Save this ID to track your order",
    "booking.trackOrder": "Track Order",
    "booking.bookAnother": "Book Another",

    "tracking.title": "Track Your Order",
    "tracking.subtitle":
      "Enter your Order ID to see real-time status of your laundry.",
    "tracking.howToTrack": "How to Track?",
    "tracking.step1":
      "Find your Order ID in the booking confirmation",
    "tracking.step2": "Enter the ID in the search box",
    "tracking.step3": "View real-time status of your order",
    "tracking.tip":
      "Enter your Order ID from the booking confirmation to track your order.",
    "tracking.bookPickup": "Book a Pickup",

    "contact.title": "Contact Us",
    "contact.subtitle":
      "We're here to help. Reach out to us anytime.",
    "contact.getInTouch": "Get in Touch",
    "contact.getInTouchText":
      "Have a question, feedback, or need assistance? We'd love to hear from you.",
    "contact.phone": "Phone",
    "contact.whatsapp": "WhatsApp",
    "contact.email": "Email",
    "contact.businessHours": "Business Hours",
    "contact.hours": "Monday - Sunday: 8:00 AM - 9:00 PM",
    "contact.openEveryDay": "Open every day including weekends",
    "contact.location": "Location",
    "contact.address": "Alandi, Pune, Maharashtra",
    "contact.findUs": "Find Us",
    "contact.chatWithAI": "Chat With Our AI Assistant",
    "contact.chatWithAIText":
      "Instant answers to your questions, 24/7. Click the chat button to start.",
    "contact.chatSubtext":
      "Available 24/7 · Instant replies · No waiting",

    "services.title": "Our Services",
    "services.subtitle":
      "Comprehensive laundry solutions tailored to your needs. Quality care for every fabric.",
    "services.notSure": "Not Sure Which Service You Need?",
    "services.notSureText":
      "Chat with our AI assistant for personalized recommendations based on your clothing type and requirements.",
    "services.viewPricing": "View Pricing",

    "footer.description":
      "Fast, reliable, and affordable laundry service with free doorstep pickup and delivery. Quality care for all your garments.",
    "footer.quickLinks": "Quick Links",
    "footer.services": "Services",
    "footer.contactUs": "Contact Us",
    "footer.hours": "Hours: 8 AM - 9 PM | All Days",
    "footer.copyright": "All rights reserved.",
    "footer.poweredBy": "Powered by AI Customer Support",
    "footer.bookPickup": "Book a Pickup",
    "footer.trackOrder": "Track Order",

    "item.shirt": "Shirt",
    "item.pant": "Pant",
    "item.tShirt": "T-Shirt",
    "item.jeans": "Jeans",
    "item.blanket": "Blanket",
    "item.saree": "Saree",
    "item.kurta": "Kurta",
    "item.kurti": "Kurti",
    "item.dhoti": "Dhoti",

    "admin.title": "Admin Dashboard",
    "admin.subtitle": "Manage orders, customers, and view statistics",
    "admin.login.title": "Admin Access",
    "admin.login.subtitle": "Enter password to access the dashboard",
    "admin.login.placeholder": "Password",
    "admin.login.incorrect": "Incorrect password",
    "admin.login.login": "Login",
    "admin.tab.orders": "Orders",
    "admin.tab.customers": "Customers",
    "admin.tab.chat": "Chat History",
    "admin.noOrders": "No orders yet",
    "admin.noOrdersText":
      "Orders will appear here once customers book.",
    "admin.search": "Search orders...",
    "admin.tab.contacts": "Contacts",
    "admin.stat.totalOrders": "Total Orders",
    "admin.stat.pendingOrders": "Pending Orders",
    "admin.stat.completedOrders": "Completed Orders",
    "admin.stat.customers": "Customers",

    "contact.sendMessage": "Send Message",
    "contact.sendMessageText": "Have a question or feedback? Fill out the form and we'll get back to you.",
    "contact.formName": "Your Name",
    "contact.formNamePlaceholder": "Enter your name",
    "contact.formEmail": "Email (optional)",
    "contact.formEmailPlaceholder": "your@email.com",
    "contact.formMobile": "Mobile (optional)",
    "contact.formMobilePlaceholder": "Your phone number",
    "contact.formMessage": "Message",
    "contact.formMessagePlaceholder": "How can we help you?",
    "contact.messageSent": "Message Sent!",
    "contact.messageSentText": "Thank you for reaching out. We'll get back to you shortly.",
    "contact.sendAnother": "Send Another",

    "tracking.enterId": "Enter Order ID (e.g., AL001)",
    "tracking.track": "Track",
    "tracking.searching": "Searching your order...",
    "tracking.notFound": "Order not found",
    "tracking.noOrderYet": "Don't have an order yet? Book a pickup now!",
    "tracking.status.orderReceived": "Order Received",
    "tracking.status.pickupScheduled": "Pickup Scheduled",
    "tracking.status.washing": "Washing",
    "tracking.status.ironing": "Ironing",
    "tracking.status.outForDelivery": "Out for Delivery",
    "tracking.status.delivered": "Delivered",
    "tracking.status.inProgress": "In Progress",
    "tracking.orderId": "Order ID",
    "tracking.customer": "Customer",
    "tracking.items": "Items",
    "tracking.pickupDate": "Pickup Date",
    "tracking.amount": "Amount",
    "tracking.error": "Something went wrong. Please try again.",
  },
  mr: {
    "nav.home": "मुख्यपृष्ठ",
    "nav.services": "सेवा",
    "nav.pricing": "किंमत यादी",
    "nav.booking": "बुकिंग",
    "nav.tracking": "ट्रॅकिंग",
    "nav.contact": "संपर्क",
    "nav.bookNow": "आता बुक करा",

    "home.hero.badge": "AI-समर्थित लॉन्ड्री सेवा",
    "home.hero.title": "जलद, विश्वासार्ह आणि परवडणारी",
    "home.hero.titleHighlight": "लॉन्ड्री सेवा",
    "home.hero.subtitle":
      "व्यावसायिक लॉन्ड्री काळजी, मोफत डोअरस्टेप पिकअप आणि डिलिव्हरीसह. गुणवत्ता हमी, AI द्वारा समर्थित.",
    "home.hero.bookPickup": "पिकअप बुक करा",
    "home.hero.viewPricing": "किंमत यादी पहा",
    "home.hero.happyCustomers": "समाधानी ग्राहक",

    "home.features.title": "का निवडाल",
    "home.features.titleHighlight": "मौली लॉन्ड्री",
    "home.features.subtitle":
      "आम्ही दर्जेदार सेवा आणि आधुनिक सुविधा यांचा मेळ घालून तुम्हाला सर्वोत्तम अनुभव देतो.",

    "home.feature.pickup.title": "मोफत पिकअप आणि डिलिव्हरी",
    "home.feature.pickup.desc":
      "तुमच्या सोयीनुसार डोअरस्टेप सेवा. ऑनलाइन शेड्यूल करा, बाकी आम्ही हाताळू.",
    "home.feature.quality.title": "उत्तम गुणवत्ता",
    "home.feature.quality.desc":
      "सर्व फॅब्रिकची तज्ञ काळजी, प्रीमियम डिटर्जंट आणि व्यावसायिक फिनिशिंगसह.",
    "home.feature.delivery.title": "४८ तास डिलिव्हरी",
    "home.feature.delivery.desc":
      "४८ तासांत मानक डिलिव्हरी. २४ तासांत एक्सप्रेस सेवा उपलब्ध.",
    "home.feature.ai.title": "AI समर्थन",
    "home.feature.ai.desc":
      "बुकिंग, प्रश्न आणि ट्रॅकिंगसाठी २४/७ बुद्धिमान चॅटबॉट सहाय्य.",
    "home.feature.star.title": "५-स्टार सेवा",
    "home.feature.star.desc":
      "शहरभरातील शेकडो समाधानी ग्राहकांद्वारे विश्वासार्ह.",
    "home.feature.comm.title": "सोपे संवाद",
    "home.feature.comm.desc":
      "कॉल, WhatsApp किंवा चॅटद्वारे आमच्याशी संपर्क साधा. आम्ही नेहमी उपलब्ध आहोत.",

    "home.testimonials.title": "आमचे",
    "home.testimonials.titleHighlight": "ग्राहक",
    "home.testimonials.subtitle": "आमच्या समाधानी ग्राहकांची वास्तविक पुनरावलोकने.",

    "home.areas.title": "सेवा",
    "home.areas.titleHighlight": "क्षेत्र",
    "home.areas.subtitle": "आम्ही येथे सेवा देतो",

    "home.cta.title": "ताज्या, स्वच्छ कपडे धुण्यासाठी सज्ज आहात?",
    "home.cta.subtitle":
      "आजच पिकअप शेड्यूल करा आणि शहरातील सर्वोत्तम लॉन्ड्री सेवा अनुभवा.",
    "home.cta.bookPickup": "पिकअप बुक करा",
    "home.cta.callUs": "आम्हाला कॉल करा",

    "pricing.title": "पारदर्शक किंमत यादी",
    "pricing.subtitle":
      "लपलेले शुल्क नाही. तुम्ही जे पाहता तेच तुम्ही द्याल. त्वरित अंदाजासाठी आमचे कॅल्क्युलेटर वापरा.",
    "pricing.priceList": "किंमत यादी",
    "pricing.standardRates": "मानक दर",
    "pricing.press": "प्रेस",
    "pricing.washPress": "वॉश आणि प्रेस",
    "pricing.bulkDiscounts": "थोक सवलत उपलब्ध",
    "pricing.bulkDiscountsText":
      "₹५०० वरील ऑर्डरवर ५% सूट · ₹१००० वरील ऑर्डरवर १०% सूट",

    "calculator.title": "किंमत कॅल्क्युलेटर",
    "calculator.subtitle": "त्वरित अंदाजासाठी प्रमाण टाका",
    "calculator.each": "प्रति",
    "calculator.subtotal": "उप-एकूण",
    "calculator.bulkDiscount": "थोक सूट",
    "calculator.total": "एकूण",
    "calculator.clearAll": "सर्व साफ करा",

    "booking.title": "पिकअप बुक करा",
    "booking.subtitle":
      "काही मिनिटांत तुमचा लॉन्ड्री पिकअप शेड्यूल करा. तुमची माहिती भरा, बाकी आम्ही पाहू.",
    "booking.personalDetails": "वैयक्तिक माहिती",
    "booking.pickupSchedule": "पिकअप वेळापत्रक",
    "booking.laundryItems": "लॉन्ड्री आयटम्स",
    "booking.fullName": "पूर्ण नाव",
    "booking.mobileNumber": "मोबाईल नंबर",
    "booking.address": "पिकअपसाठी पूर्ण पत्ता",
    "booking.selectTime": "वेळ निवडा",
    "booking.totalItems": "एकूण आयटम्स",
    "booking.subtotal": "उप-एकूण",
    "booking.discount": "सूट",
    "booking.total": "एकूण",
    "booking.serviceType": "सेवेचा प्रकार",
    "booking.bookPickup": "पिकअप बुक करा",

    "booking.whyBookWithUs": "आमच्याकडे का बुक कराल?",
    "booking.needHelp": "मदत हवी आहे?",
    "booking.needHelpText":
      "आमच्या AI सहाय्यकाशी चॅट करा किंवा थेट कॉल करा.",

    "booking.confirmed": "बुकिंग कन्फर्म!",
    "booking.confirmedText":
      "तुमचा लॉन्ड्री पिकअप यशस्वीरित्या बुक झाला आहे.",
    "booking.yourOrderId": "तुमचा ऑर्डर आयडी",
    "booking.saveId": "ऑर्डर ट्रॅक करण्यासाठी हा आयडी जतन करा",
    "booking.trackOrder": "ऑर्डर ट्रॅक करा",
    "booking.bookAnother": "दुसरे बुक करा",

    "tracking.title": "तुमचे ऑर्डर ट्रॅक करा",
    "tracking.subtitle":
      "तुमच्या लॉन्ड्रीची रिअल-टाइम स्थिती पाहण्यासाठी तुमचा ऑर्डर आयडी टाका.",
    "tracking.howToTrack": "कसे ट्रॅक कराल?",
    "tracking.step1":
      "बुकिंग कन्फर्मेशनमध्ये तुमचा ऑर्डर आयडी शोधा",
    "tracking.step2": "सर्च बॉक्समध्ये आयडी टाका",
    "tracking.step3": "तुमच्या ऑर्डरची रिअल-टाइम स्थिती पहा",
    "tracking.tip":
      "तुमचा ऑर्डर ट्रॅक करण्यासाठी बुकिंग कन्फर्मेशनमधील ऑर्डर आयडी टाका.",
    "tracking.bookPickup": "पिकअप बुक करा",

    "contact.title": "संपर्क करा",
    "contact.subtitle":
      "आम्ही मदतीसाठी आहोत. कधीही आमच्याशी संपर्क साधा.",
    "contact.getInTouch": "संपर्क साधा",
    "contact.getInTouchText":
      "प्रश्न, अभिप्राय किंवा मदत हवी आहे? आम्हाला ऐकायला आवडेल.",
    "contact.phone": "फोन",
    "contact.whatsapp": "WhatsApp",
    "contact.email": "ईमेल",
    "contact.businessHours": "कार्यालयीन वेळ",
    "contact.hours": "सोमवार - रविवार: सकाळी ८ - रात्री ९",
    "contact.openEveryDay": "आठवड्याचे सर्व दिवस खुले",
    "contact.location": "पत्ता",
    "contact.address": "आळंदी, पुणे, महाराष्ट्र",
    "contact.findUs": "आम्हाला शोधा",
    "contact.chatWithAI": "आमच्या AI सहाय्यकाशी चॅट करा",
    "contact.chatWithAIText":
      "तुमच्या प्रश्नांची त्वरित उत्तरे, २४/७. चॅट बटणावर क्लिक करा.",
    "contact.chatSubtext":
      "उपलब्ध २४/७ · त्वरित उत्तरे · प्रतीक्षा नाही",

    "services.title": "आमच्या सेवा",
    "services.subtitle":
      "तुमच्या गरजेनुसार सर्वसमावेशक लॉन्ड्री सोल्यूशन्स. प्रत्येक फॅब्रिकची दर्जेदार काळजी.",
    "services.notSure": "कोणती सेवा हवी हे ठरवू शकत नाही?",
    "services.notSureText":
      "तुमच्या कपड्यांच्या प्रकारानुसार वैयक्तिक शिफारसींसाठी आमच्या AI सहाय्यकाशी चॅट करा.",
    "services.viewPricing": "किंमत यादी पहा",

    "footer.description":
      "जलद, विश्वासार्ह आणि परवडणारी लॉन्ड्री सेवा मोफत पिकअप आणि डिलिव्हरीसह. तुमच्या सर्व कपड्यांची दर्जेदार काळजी.",
    "footer.quickLinks": "द्रुत दुवे",
    "footer.services": "सेवा",
    "footer.contactUs": "संपर्क",
    "footer.hours": "वेळ: सकाळी ८ - रात्री ९ | सर्व दिवस",
    "footer.copyright": "सर्व हक्क राखीव.",
    "footer.poweredBy": "AI ग्राहक समर्थनाद्वारे समर्थित",
    "footer.bookPickup": "पिकअप बुक करा",
    "footer.trackOrder": "ऑर्डर ट्रॅक करा",

    "item.shirt": "शर्ट",
    "item.pant": "पँट",
    "item.tShirt": "टी-शर्ट",
    "item.jeans": "जीन्स",
    "item.blanket": "ब्लँकेट",
    "item.saree": "साडी",
    "item.kurta": "कुर्ता",
    "item.kurti": "कुर्ती",
    "item.dhoti": "धोती",

    "admin.title": "प्रशासन पॅनेल",
    "admin.subtitle": "ऑर्डर्स, ग्राहक आणि आकडेवारी व्यवस्थापित करा",
    "admin.login.title": "प्रशासक प्रवेश",
    "admin.login.subtitle": "डॅशबोर्डमध्ये प्रवेश करण्यासाठी पासवर्ड टाका",
    "admin.login.placeholder": "पासवर्ड",
    "admin.login.incorrect": "चुकीचा पासवर्ड",
    "admin.login.login": "लॉगिन",
    "admin.tab.orders": "ऑर्डर्स",
    "admin.tab.customers": "ग्राहक",
    "admin.tab.chat": "चॅट इतिहास",
    "admin.noOrders": "अद्याप कोणतेही ऑर्डर नाहीत",
    "admin.noOrdersText":
      "ग्राहक बुकिंग केल्यावर ऑर्डर येथे दिसतील.",
    "admin.search": "ऑर्डर शोधा...",
    "admin.tab.contacts": "संपर्क",
    "admin.stat.totalOrders": "एकूण ऑर्डर्स",
    "admin.stat.pendingOrders": "प्रलंबित ऑर्डर्स",
    "admin.stat.completedOrders": "पूर्ण ऑर्डर्स",
    "admin.stat.customers": "ग्राहक",

    "contact.sendMessage": "मेसेज पाठवा",
    "contact.sendMessageText": "प्रश्न किंवा अभिप्राय? फॉर्म भरा आणि आम्ही तुम्हाला परत संपर्क करू.",
    "contact.formName": "तुमचे नाव",
    "contact.formNamePlaceholder": "तुमचे नाव टाका",
    "contact.formEmail": "ईमेल (पर्यायी)",
    "contact.formEmailPlaceholder": "your@email.com",
    "contact.formMobile": "मोबाईल (पर्यायी)",
    "contact.formMobilePlaceholder": "तुमचा फोन नंबर",
    "contact.formMessage": "मेसेज",
    "contact.formMessagePlaceholder": "आम्ही तुम्हाला कशी मदत करू?",
    "contact.messageSent": "मेसेज पाठवला!",
    "contact.messageSentText": "संपर्क केल्याबद्दल धन्यवाद. आम्ही लवकरच तुम्हाला परत संपर्क करू.",
    "contact.sendAnother": "दुसरा पाठवा",

    "tracking.enterId": "ऑर्डर आयडी टाका (उदा., AL001)",
    "tracking.track": "शोधा",
    "tracking.searching": "तुमचे ऑर्डर शोधत आहे...",
    "tracking.notFound": "ऑर्डर सापडला नाही",
    "tracking.noOrderYet": "अद्याप ऑर्डर नाही? आता पिकअप बुक करा!",
    "tracking.status.orderReceived": "ऑर्डर प्राप्त",
    "tracking.status.pickupScheduled": "पिकअप शेड्यूल",
    "tracking.status.washing": "धुणे",
    "tracking.status.ironing": "इस्त्री",
    "tracking.status.outForDelivery": "डिलिव्हरीसाठी बाहेर",
    "tracking.status.delivered": "डिलिव्हर केले",
    "tracking.status.inProgress": "प्रगतीपथावर",
    "tracking.orderId": "ऑर्डर आयडी",
    "tracking.customer": "ग्राहक",
    "tracking.items": "आयटम्स",
    "tracking.pickupDate": "पिकअप तारीख",
    "tracking.amount": "रक्कम",
    "tracking.error": "काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.",
  },
};

export function getItemName(key: string, lang: Language): string {
  const tKey = `item.${key.toLowerCase().replace(/[-\s]/g, "")}`;
  return translations[lang][tKey] || key;
}
