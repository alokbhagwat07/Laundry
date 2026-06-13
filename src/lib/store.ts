import type { Order } from "./types";
import { getDb } from "./database";

export function getAllOrders(): Order[] {
  const rows = getDb()
    .prepare("SELECT * FROM orders ORDER BY created_at DESC")
    .all() as Record<string, unknown>[];
  return rows.map(rowToOrder);
}

export function getOrderByOrderId(orderId: string): Order | undefined {
  const row = getDb()
    .prepare("SELECT * FROM orders WHERE order_id = ?")
    .get(orderId) as Record<string, unknown> | undefined;
  return row ? rowToOrder(row) : undefined;
}

export function createOrder(order: Order): Order {
  getDb()
    .prepare(
      `INSERT INTO orders (id, order_id, customer_id, customer_name, customer_mobile, customer_address, items, total_amount, pickup_date, pickup_time, service_type, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      order.id,
      order.order_id,
      order.customer_id || "",
      order.customer_name,
      order.customer_mobile,
      order.customer_address,
      JSON.stringify(order.items),
      order.total_amount,
      order.pickup_date,
      order.pickup_time,
      (order as any).service_type || "press",
      order.status,
      order.created_at,
      order.updated_at
    );
  return order;
}

export function updateOrderStatus(
  orderId: string,
  status: Order["status"]
): Order | undefined {
  const updatedAt = new Date().toISOString();
  const result = getDb()
    .prepare(
      "UPDATE orders SET status = ?, updated_at = ? WHERE order_id = ?"
    )
    .run(status, updatedAt, orderId);
  if (result.changes === 0) return undefined;
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

export function getAllReviews(): Review[] {
  return getDb()
    .prepare("SELECT * FROM reviews ORDER BY created_at DESC")
    .all() as unknown as Review[];
}

export function deleteReview(id: number): boolean {
  const result = getDb().prepare("DELETE FROM reviews WHERE id = ?").run(id);
  return result.changes > 0;
}

export function createReview(review: Omit<Review, "id" | "created_at">): Review {
  const createdAt = new Date().toISOString();
  const result = getDb()
    .prepare(
      "INSERT INTO reviews (customer_name, rating, comment, order_id, created_at) VALUES (?, ?, ?, ?, ?)"
    )
    .run(review.customer_name, review.rating, review.comment, review.order_id || "", createdAt);
  return {
    id: result.lastInsertRowid as number,
    ...review,
    order_id: review.order_id || "",
    created_at: createdAt,
  };
}

function rowToOrder(row: Record<string, unknown>): Order {
  return {
    id: row.id as string,
    order_id: row.order_id as string,
    customer_id: (row.customer_id as string) || "",
    customer_name: row.customer_name as string,
    customer_mobile: row.customer_mobile as string,
    customer_address: row.customer_address as string,
    items: JSON.parse(row.items as string),
    total_amount: row.total_amount as number,
    pickup_date: row.pickup_date as string,
    pickup_time: row.pickup_time as string,
    status: row.status as Order["status"],
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  };
}
