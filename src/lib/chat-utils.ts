import { PRICING, calculateTotal, getPrice } from "./pricing";
import type { ServiceType } from "./types";

interface ChatResponse {
  text: string;
  collectedInfo?: Record<string, string>;
  action?: "escalate" | "booking" | "none";
}

const FAQ: Record<string, string> = {
  "working hours":
    "We operate from **8 AM to 9 PM** every day, including Sundays.",
  hours: "We operate from **8 AM to 9 PM** every day, including Sundays.",
  "service area":
    "We currently serve **Alandi** and nearby areas. Enter your pincode to check if we deliver to your location.",
  "delivery time":
    "Standard delivery takes **48 hours**. Express delivery is available within **24 hours** at an additional charge.",
  "pickup timing":
    "Our pickup service runs from **8 AM to 8 PM**. You can schedule a specific time slot that works for you.",
  "payment method":
    "We accept **Cash**, **UPI (Google Pay, PhonePe, Paytm)**, and **Bank Transfer**. Payment is collected on delivery.",
  payment:
    "We accept **Cash**, **UPI (Google Pay, PhonePe, Paytm)**, and **Bank Transfer**. Payment is collected on delivery.",
  pickup:
    "Yes, we provide **free doorstep pickup and delivery**. Schedule a pickup and we'll be at your door.",
  "dry cleaning":
    "Yes, we offer professional dry cleaning for delicate and premium fabrics.",
  "bulk discount":
    "Yes! We offer discounts on bulk orders. Orders above **₹500 get 5% off**, and above **₹1000 get 10% off**.",
  discount:
    "Yes! We offer discounts on bulk orders. Orders above **₹500 get 5% off**, and above **₹1000 get 10% off**.",
};

function extractItems(text: string): { name: string; quantity: number }[] {
  const items: { name: string; quantity: number }[] = [];
  const lower = text.toLowerCase();

  for (const item of PRICING) {
    const nameLower = item.name.toLowerCase();
    if (lower.includes(nameLower)) {
      const regex = new RegExp(
        `(\\d+)\\s*${nameLower}|${nameLower}\\s*(\\d+)|(\\d+)\\s*${nameLower}s`,
        "i"
      );
      const match = text.match(regex);
      if (match) {
        const qty = parseInt(match[1] || match[2] || match[3] || "1");
        items.push({ name: item.name, quantity: qty });
      }
    }
  }
  return items;
}

function handlePricing(text: string): ChatResponse | null {
  const lower = text.toLowerCase();

  if (
    lower.includes("price") ||
    lower.includes("cost") ||
    lower.includes("rate") ||
    lower.includes("how much")
  ) {
    const items = extractItems(text);

    if (items.length > 0) {
      let response = "Here's your estimated cost (Press):\n\n";
      let total = 0;
      for (const item of items) {
        const priceItem = PRICING.find(
          (p) => p.name.toLowerCase() === item.name.toLowerCase()
        );
        if (priceItem) {
          const cost = item.quantity * getPrice(priceItem, "press");
          response += `• ${item.quantity}x ${item.name} = ₹${cost}\n`;
          total += cost;
        }
      }
      response += `\n**Total (Press): ₹${total}**`;

      const washTotal = calculateTotal(
        items.reduce((acc, i) => ({ ...acc, [i.name]: i.quantity }), {}),
        "washPress"
      );
      response += `\n**Total (Wash & Press): ₹${washTotal}**`;

      if (total >= 1000) {
        response += "\n\n🎉 You qualify for a **10% bulk discount**!";
      } else if (total >= 500) {
        response += "\n\n🎉 You qualify for a **5% bulk discount**!";
      }

      return { text: response };
    }

    if (lower.includes("all") || lower.includes("list") || lower.includes("full")) {
      let response = "📋 **Our Price List:**\n\n";
      for (const item of PRICING) {
        response += `${item.icon} **${item.name}**\n   Press: ₹${item.pressPrice} | Wash & Press: ₹${item.washPressPrice}\n`;
      }
      response +=
        "\n💡 *Bulk discounts available on orders above ₹500!*";
      return { text: response };
    }

    return {
      text: "📋 **Our Price List:**\n\n👔 Shirt - Press: ₹15 | Wash & Press: ₹45\n👕 T-Shirt - Press: ₹15 | Wash & Press: ₹45\n👖 Pant - Press: ₹15 | Wash & Press: ₹45\n👖 Jeans - Press: ₹15 | Wash & Press: ₹45\n🧣 Blanket - Press: ₹120 | Wash & Press: ₹150\n👗 Saree - Press: ₹60 | Wash & Press: ₹90\n👘 Kurta - Press: ₹40 | Wash & Press: ₹70\n👘 Kurti - Press: ₹20 | Wash & Press: ₹50\n👘 Dhoti - Press: ₹50 | Wash & Press: ₹80\n\nWhich items would you like to know about?",
    };
  }

  return null;
}

function handleBooking(text: string): ChatResponse | null {
  const lower = text.toLowerCase();

  if (
    lower.includes("book") ||
    lower.includes("pickup") ||
    lower.includes("schedule") ||
    lower.includes("order") ||
    lower.includes("laundry")
  ) {
    if (
      lower.includes("name") &&
      lower.includes("address") &&
      (lower.includes("date") || lower.includes("day"))
    ) {
      return {
        text: "Thank you! Let me create a booking for you. Please visit our **Booking page** to confirm your order, or tell me your mobile number to proceed.",
        action: "booking",
      };
    }

    return {
      text: "I'd be happy to help you book a laundry pickup! 📋\n\nPlease provide:\n1️⃣ Your **Name**\n2️⃣ **Mobile Number**\n3️⃣ **Address** for pickup\n4️⃣ Preferred **Pickup Date**\n5️⃣ **Items** and quantities\n\nYou can also visit our **Booking page** to place the order directly!",
      collectedInfo: { intent: "booking" },
    };
  }

  return null;
}

function handleOrderStatus(text: string): ChatResponse | null {
  const lower = text.toLowerCase();

  if (
    lower.includes("where is my order") ||
    lower.includes("order status") ||
    lower.includes("track") ||
    lower.includes("status of my") ||
    lower.includes("order id")
  ) {
    const orderIdMatch = text.match(
      /[A-Za-z0-9]{6,}/g
    );
    if (orderIdMatch) {
      return {
        text: `Let me check the status of **${orderIdMatch[0]}** for you. Please visit our **Tracking page** and enter your Order ID to see real-time updates.`,
        action: "none",
      };
    }

    return {
      text: "I'd be happy to check your order status! 🔍\n\nPlease provide your **Order ID** (e.g., AL...), and I'll look it up for you.",
      collectedInfo: { intent: "tracking" },
    };
  }

  return null;
}

function handleGreeting(text: string): ChatResponse | null {
  const lower = text.toLowerCase().trim();

  const greetings = ["hi", "hello", "hey", "namaste", "good morning", "good evening", "good afternoon"];

  if (greetings.some((g) => lower.startsWith(g) || lower === g)) {
    return {
      text: "👋 **Namaste!** Welcome to **Mauli Laundry**!\n\nI'm your AI assistant. I can help you with:\n✅ Pricing & costs\n✅ Booking a pickup\n✅ Order tracking\n✅ Business info\n\nHow can I assist you today?",
    };
  }

  return null;
}

function handleThanks(text: string): ChatResponse | null {
  const lower = text.toLowerCase().trim();
  if (["thanks", "thank you", "thank you so much", "thanks a lot", "dhanyavaad"].includes(lower)) {
    return {
      text: "You're welcome! 😊 Is there anything else I can help you with?",
    };
  }
  return null;
}

function handleFAQ(text: string): ChatResponse | null {
  const lower = text.toLowerCase();

  for (const [keyword, answer] of Object.entries(FAQ)) {
    if (
      lower.includes(keyword) ||
      lower.includes(`${keyword}s`) ||
      lower.includes(`${keyword}ing`)
    ) {
      return { text: answer };
    }
  }

  return null;
}

function handleHuman(text: string): ChatResponse | null {
  const lower = text.toLowerCase();
  if (
    lower.includes("human") ||
    lower.includes("agent") ||
    lower.includes("real person") ||
    lower.includes("speak to") ||
    lower.includes("talk to") ||
    lower.includes("customer care") ||
    lower.includes("help")
  ) {
    return {
      text: "I understand you'd like to speak with a human agent. Let me transfer you. 📞\n\nIn the meantime, you can also reach us at:\n📱 **+91 95455 28747**\n💬 **WhatsApp**: +91 95455 28747",
      action: "escalate",
    };
  }
  return null;
}

export function getChatResponse(text: string): ChatResponse {
  const handlers = [
    handleGreeting,
    handleThanks,
    handlePricing,
    handleBooking,
    handleOrderStatus,
    handleFAQ,
    handleHuman,
  ];

  for (const handler of handlers) {
    const response = handler(text);
    if (response) return response;
  }

  return {
    text: "I'm not sure I understood that. Could you please rephrase?\n\nHere's what I can help with:\n💰 **Pricing** - Check laundry costs\n📅 **Booking** - Schedule a pickup\n🔍 **Order Status** - Track your order\nℹ️ **General Info** - Business hours, services\n\nOr type **'agent'** to speak with a human.",
  };
}
