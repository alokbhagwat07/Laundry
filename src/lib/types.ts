export interface Customer {
  id: string;
  name: string;
  mobile: string;
  address: string;
  created_at: string;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  order_id: string;
  customer_id: string;
  customer_name: string;
  customer_mobile: string;
  customer_address: string;
  items: OrderItem[];
  total_amount: number;
  pickup_date: string;
  pickup_time: string;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
  payment_id?: string;
  razorpay_order_id?: string;
  amount_paid?: number;
  payment_status?: PaymentStatus;
  payment_method?: string;
  payment_date?: string;
  payment_mode?: PaymentMode;
}

export type OrderStatus =
  | "Order Received"
  | "Pickup Scheduled"
  | "Washing"
  | "Ironing"
  | "Out for Delivery"
  | "Delivered";

export type PaymentStatus = "Pending" | "Paid" | "Failed" | "Refunded";
export type PaymentMode = "online" | "cod" | "pay_later";

export interface ChatMessage {
  id: string;
  session_id: string;
  role: "user" | "bot" | "agent";
  content: string;
  created_at: string;
}

export interface ChatSession {
  id: string;
  customer_name?: string;
  customer_mobile?: string;
  status: "active" | "resolved" | "escalated";
  created_at: string;
  updated_at: string;
}

export type ServiceType = "press" | "washPress";

export interface PriceItem {
  name: string;
  pressPrice: number;
  washPressPrice: number;
  icon: string;
}

export interface Testimonial {
  name: string;
  text: string;
  rating: number;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  mobile: string;
  message: string;
  created_at: string;
}
