import type { Order, Contact } from "./types";
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
  };
}

export async function getAllOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

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

  if (error || !data) return null;
  return rowToOrder(data);
}

export async function createOrder(order: Order): Promise<Order> {
  const { error } = await supabase.from("orders").insert({
    id: order.id,
    order_id: order.order_id,
    customer_id: order.customer_id || "",
    customer_name: order.customer_name,
    customer_mobile: order.customer_mobile,
    customer_address: order.customer_address,
    items: JSON.stringify(order.items),
    total_amount: order.total_amount,
    pickup_date: order.pickup_date,
    pickup_time: order.pickup_time,
    service_type: "service_type" in order ? (order as Record<string, unknown>).service_type as string : "press",
    status: order.status,
    created_at: order.created_at,
    updated_at: order.updated_at,
  });

  if (error) {
    console.error("Failed to create order:", error);
    throw new Error("Failed to create order");
  }
  return order;
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

export async function getAllReviews(): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

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

  if (error) {
    console.error("Failed to delete review:", error);
    return false;
  }
  return true;
}

export async function createReview(review: Omit<Review, "id" | "created_at">): Promise<Review> {
  const createdAt = new Date().toISOString();
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
    console.error("Failed to create review:", error);
    throw new Error("Failed to create review");
  }
  return data as Review;
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

  if (error) {
    console.error("Failed to upsert customer:", error);
  }
}

export async function getCustomers(): Promise<{ name: string; mobile: string; address: string; created_at: string }[]> {
  const { data, error } = await supabase
    .from("customers")
    .select("name, mobile, address, created_at")
    .order("created_at", { ascending: false });

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

  if (error) {
    console.error("Failed to fetch contacts:", error);
    return [];
  }
  return (data || []) as Contact[];
}

export async function createContact(contact: Omit<Contact, "id" | "created_at">): Promise<Contact> {
  const createdAt = new Date().toISOString();
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
    console.error("Failed to create contact:", error);
    throw new Error("Failed to submit contact form");
  }
  return data as Contact;
}
