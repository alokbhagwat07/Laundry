import type { Order, Contact, PaymentStatus } from "./types";
import { supabase } from "./supabase";

function rowToOrder(row: Record<string, unknown>): Order {
  return {
    id: row.id as string,
    order_id: row.order_id as string,
    customer_id: (row.customer_id as string) || "",
    customer_name: row.customer_name as string,
    customer_mobile: row.customer_mobile as string,
    customer_address: row.customer_address as string,
    items: typeof row.items === "string" ? JSON.parse(row.items as string) : row.items as Order["items"],
    total_amount: row.total_amount as number,
    pickup_date: row.pickup_date as string,
    pickup_time: row.pickup_time as string,
    status: row.status as Order["status"],
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
    payment_id: (row.payment_id as string) || undefined,
    razorpay_order_id: (row.razorpay_order_id as string) || undefined,
    amount_paid: row.amount_paid ? Number(row.amount_paid) : undefined,
    payment_status: (row.payment_status as PaymentStatus) || "Pending",
    payment_method: (row.payment_method as string) || undefined,
    payment_date: (row.payment_date as string) || undefined,
    payment_mode: (row.payment_mode as "online" | "cod" | "pay_later") || "online",
  };
}

function isTableNotFound(err: unknown): boolean {
  return (
    err != null &&
    typeof err === "object" &&
    "code" in err &&
    (err as Record<string, unknown>).code === "PGRST205"
  );
}

const memOrders: Order[] = [];
const memCustomers: { name: string; mobile: string; address: string; created_at: string }[] = [];
const memContacts: Contact[] = [];
let memOrderIdSeq = 0;

export async function getAllOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (isTableNotFound(error)) return [...memOrders];
  if (error) {
    console.error("Failed to fetch orders:", error);
    return [];
  }
  return (data || []).map(rowToOrder);
}

export async function getOrderByOrderId(orderId: string): Promise<Order | null> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("order_id", orderId)
    .single();

  if (isTableNotFound(error)) return memOrders.find((o) => o.order_id === orderId) || null;
  if (error || !data) return null;
  return rowToOrder(data);
}

export async function createOrder(order: Order): Promise<Order> {
  try {
    const { error } = await supabase.from("orders").insert({
      id: order.id,
      order_id: order.order_id,
      customer_id: order.customer_id || "",
      customer_name: order.customer_name,
      customer_mobile: order.customer_mobile,
      customer_address: order.customer_address,
      items: order.items,
      total_amount: order.total_amount,
      pickup_date: order.pickup_date,
      pickup_time: order.pickup_time,
      service_type: (order as unknown as Record<string, unknown>).service_type as string || "press",
      status: order.status,
      payment_id: order.payment_id || "",
      razorpay_order_id: order.razorpay_order_id || "",
      amount_paid: order.amount_paid || 0,
      payment_status: order.payment_status || "Pending",
      payment_method: order.payment_method || "",
      payment_date: order.payment_date || null,
      payment_mode: order.payment_mode || "online",
      created_at: order.created_at,
      updated_at: order.updated_at,
    });

    if (error) {
      console.error("Supabase createOrder failed, using in-memory:", error.message || error);
      memOrders.push(order);
      return order;
    }
    return order;
  } catch (err) {
    console.error("Supabase connection failed, using in-memory:", err instanceof Error ? err.message : err);
    memOrders.push(order);
    return order;
  }
}

export async function updatePaymentStatus(
  orderId: string,
  paymentData: {
    payment_id: string;
    razorpay_order_id: string;
    amount_paid: number;
    payment_status: PaymentStatus;
    payment_method: string;
    payment_date: string;
  }
): Promise<Order | null> {
  const updatedAt = new Date().toISOString();
  const { error } = await supabase
    .from("orders")
    .update({
      payment_id: paymentData.payment_id,
      razorpay_order_id: paymentData.razorpay_order_id,
      amount_paid: paymentData.amount_paid,
      payment_status: paymentData.payment_status,
      payment_method: paymentData.payment_method,
      payment_date: paymentData.payment_date,
      updated_at: updatedAt,
    })
    .eq("order_id", orderId);

  if (isTableNotFound(error)) {
    const idx = memOrders.findIndex((o) => o.order_id === orderId);
    if (idx === -1) return null;
    memOrders[idx] = {
      ...memOrders[idx],
      ...paymentData,
      updated_at: updatedAt,
    };
    return memOrders[idx];
  }

  if (error) {
    console.error("Failed to update payment status:", error);
    return null;
  }
  return getOrderByOrderId(orderId);
}

export async function updateOrderStatus(
  orderId: string,
  status: Order["status"]
): Promise<Order | null> {
  const updatedAt = new Date().toISOString();
  const { error } = await supabase
    .from("orders")
    .update({ status, updated_at: updatedAt })
    .eq("order_id", orderId);

  if (isTableNotFound(error)) {
    const idx = memOrders.findIndex((o) => o.order_id === orderId);
    if (idx === -1) return null;
    memOrders[idx] = { ...memOrders[idx], status, updated_at: updatedAt };
    return memOrders[idx];
  }

  if (error) {
    console.error("Failed to update order status:", error);
    return null;
  }
  return getOrderByOrderId(orderId);
}

export interface Review {
  id: number;
  customer_name: string;
  rating: number;
  comment: string;
  order_id: string;
  created_at: string;
}

const memReviews: Review[] = [];

export async function getAllReviews(): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

  if (isTableNotFound(error)) {
    console.warn("Supabase reviews table not found — using in-memory storage (data will NOT persist after server restart)");
    return [...memReviews];
  }
  if (error) {
    console.error("Failed to fetch reviews:", error);
    return [];
  }
  return (data || []) as Review[];
}

export async function deleteReview(id: number): Promise<boolean> {
  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", id);

  if (isTableNotFound(error)) {
    const idx = memReviews.findIndex((r) => r.id === id);
    if (idx !== -1) memReviews.splice(idx, 1);
    return true;
  }

  if (error) {
    console.error("Failed to delete review:", error);
    return false;
  }
  return true;
}

export async function createReview(review: Omit<Review, "id" | "created_at">): Promise<Review> {
  const createdAt = new Date().toISOString();

  const newReview: Review = {
    id: memReviews.length + 1,
    customer_name: review.customer_name,
    rating: review.rating,
    comment: review.comment,
    order_id: review.order_id || "",
    created_at: createdAt,
  };

  try {
    const { data, error } = await supabase
      .from("reviews")
      .insert({
        customer_name: review.customer_name,
        rating: review.rating,
        comment: review.comment,
        order_id: review.order_id || "",
        created_at: createdAt,
      })
      .select()
      .single();

    if (error) {
      console.warn("Supabase createReview failed, using in-memory:", error.message || error);
      memReviews.push(newReview);
      return newReview;
    }
    return data as Review;
  } catch (err) {
    console.warn("Supabase connection failed for review, using in-memory:", err instanceof Error ? err.message : err);
    memReviews.push(newReview);
    return newReview;
  }
}

export async function upsertCustomer(customer: {
  name: string;
  mobile: string;
  address: string;
}): Promise<void> {
  const { error } = await supabase.from("customers").upsert(
    {
      name: customer.name,
      mobile: customer.mobile,
      address: customer.address,
    },
    { onConflict: "mobile", ignoreDuplicates: false }
  );

  if (isTableNotFound(error)) {
    memCustomers.push({ ...customer, created_at: new Date().toISOString() });
    return;
  }

  if (error) {
    console.error("Failed to upsert customer:", error);
  }
}

export async function getCustomers(): Promise<{ name: string; mobile: string; address: string; created_at: string }[]> {
  const { data, error } = await supabase
    .from("customers")
    .select("name, mobile, address, created_at")
    .order("created_at", { ascending: false });

  if (isTableNotFound(error)) return [...memCustomers];
  if (error) {
    console.error("Failed to fetch customers:", error);
    return [];
  }
  return (data || []) as { name: string; mobile: string; address: string; created_at: string }[];
}

export async function getContacts(): Promise<Contact[]> {
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  if (isTableNotFound(error)) return [...memContacts];
  if (error) {
    console.error("Failed to fetch contacts:", error);
    return [];
  }
  return (data || []) as Contact[];
}

export async function createContact(contact: Omit<Contact, "id" | "created_at">): Promise<Contact> {
  const createdAt = new Date().toISOString();

  const newContact: Contact = {
    id: memContacts.length + 1,
    name: contact.name,
    email: contact.email || "",
    mobile: contact.mobile,
    message: contact.message,
    created_at: createdAt,
  };

  try {
    const { data, error } = await supabase
      .from("contacts")
      .insert({
        name: contact.name,
        email: contact.email || "",
        mobile: contact.mobile,
        message: contact.message,
        created_at: createdAt,
      })
      .select()
      .single();

    if (error) {
      console.warn("Supabase createContact failed, using in-memory:", error.message || error);
      memContacts.push(newContact);
      return newContact;
    }
    return data as Contact;
  } catch (err) {
    console.warn("Supabase connection failed for contact, using in-memory:", err instanceof Error ? err.message : err);
    memContacts.push(newContact);
    return newContact;
  }
}
