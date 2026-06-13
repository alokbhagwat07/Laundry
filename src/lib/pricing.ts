import type { PriceItem, ServiceType } from "./types";

export const PRICING: PriceItem[] = [
  { name: "Shirt", pressPrice: 15, washPressPrice: 45, icon: "👔" },
  { name: "T-Shirt", pressPrice: 15, washPressPrice: 45, icon: "👕" },
  { name: "Pant", pressPrice: 15, washPressPrice: 45, icon: "👖" },
  { name: "Jeans", pressPrice: 15, washPressPrice: 45, icon: "👖" },
  { name: "Blanket", pressPrice: 120, washPressPrice: 150, icon: "🧣" },
  { name: "Saree", pressPrice: 60, washPressPrice: 90, icon: "👗" },
  { name: "Kurta", pressPrice: 40, washPressPrice: 70, icon: "👘" },
  { name: "Kurti", pressPrice: 20, washPressPrice: 50, icon: "👘" },
  { name: "Dhoti", pressPrice: 50, washPressPrice: 80, icon: "👘" },
];

export function getPrice(item: PriceItem, serviceType: ServiceType): number {
  return serviceType === "washPress" ? item.washPressPrice : item.pressPrice;
}

export function calculateTotal(
  quantities: Record<string, number>,
  serviceType: ServiceType = "press"
): number {
  return PRICING.reduce((total, item) => {
    const price = getPrice(item, serviceType);
    return total + (quantities[item.name] || 0) * price;
  }, 0);
}

export function generateOrderId(): string {
  const prefix = "AL";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}${timestamp}${random}`;
}

export const SERVICES = [
  {
    title: "Wash & Fold",
    description:
      "Perfect for everyday clothes. We wash, dry, and fold your garments with care using premium detergents.",
    icon: "🧺",
    features: [
      "Machine wash with premium detergent",
      "Gentle drying process",
      "Neat folding",
      "48-hour delivery",
    ],
  },
  {
    title: "Wash & Iron",
    description:
      "Get your clothes washed and professionally ironed. Crisp and fresh, ready to wear.",
    icon: "👔",
    features: [
      "Thorough washing",
      "Professional steam ironing",
      "Starch available on request",
      "48-hour delivery",
    ],
  },
  {
    title: "Dry Cleaning",
    description:
      "For your delicate and premium fabrics. Expert dry cleaning with solvent-based technology.",
    icon: "🧥",
    features: [
      "Solvent-based cleaning",
      "Stain treatment",
      "Premium fabric care",
      "72-hour delivery",
    ],
  },
  {
    title: "Express Delivery",
    description:
      "Need it urgently? Get your laundry done in 24 hours without compromising on quality.",
    icon: "⚡",
    features: [
      "Priority processing",
      "Same-day service option",
      "Express washing & ironing",
      "24-hour delivery",
    ],
  },
  {
    title: "Pickup & Delivery",
    description:
      "Doorstep pickup and delivery. Schedule at your convenience and we'll take care of the rest.",
    icon: "🚚",
    features: [
      "Free doorstep pickup",
      "Flexible scheduling",
      "Real-time tracking",
      "Contactless delivery",
    ],
  },
];
