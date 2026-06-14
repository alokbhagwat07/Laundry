import { NextResponse } from "next/server";
import { getOrderByOrderId, updateOrderStatus } from "@/lib/store";
import type { Order } from "@/lib/types";

function isAdmin(request: Request): boolean {
  const password = request.headers.get("x-admin-password");
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  return password === adminPassword;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const order = await getOrderByOrderId(id);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }
  return NextResponse.json(order);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const status = body.status as Order["status"];
    const updated = await updateOrderStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
