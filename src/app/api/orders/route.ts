import { NextResponse } from "next/server";
import { getAllOrders, createOrder } from "@/lib/store";
import type { Order } from "@/lib/types";
import twilio from "twilio";

const OWNER_WHATSAPP = "+919545528747";

function isAdmin(request: Request): boolean {
  const password = request.headers.get("x-admin-password");
  const adminPassword = process.env.ADMIN_PASSWORD || "alok123";
  return password === adminPassword;
}

function getTwilioClient() {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (!sid || !token) return null;
  return twilio(sid, token);
}

function formatPhone(num: string): string {
  const cleaned = num.replace(/[^0-9]/g, "");
  if (cleaned.startsWith("0")) return "+91" + cleaned.slice(1);
  if (cleaned.length === 10) return "+91" + cleaned;
  if (cleaned.startsWith("91") && cleaned.length === 12) return "+" + cleaned;
  if (cleaned.startsWith("+")) return num;
  return "+" + cleaned;
}

async function sendWhatsAppNotifications(order: Order) {
  try {
    const client = getTwilioClient();
    if (!client) {
      console.warn("Twilio not configured — skipping WhatsApp");
      return;
    }

    const from = process.env.TWILIO_WHATSAPP_NUMBER || "+14155238886";

    const itemsSummary = order.items
      .map((i) => `${i.quantity}x ${i.name}`)
      .join(", ");

    const msgToOwner = `🆕 *New Order Received!*\n\n📋 Order: ${order.order_id}\n👤 Name: ${order.customer_name}\n📱 Phone: ${order.customer_mobile}\n📍 Address: ${order.customer_address}\n📅 Pickup: ${order.pickup_date} at ${order.pickup_time}\n🧺 Items: ${itemsSummary}\n💰 Total: ₹${order.total_amount}\n\nLogin: https://maulilaundry.vercel.app/admin`;

    const ownerMsg = await client.messages.create({
      body: msgToOwner,
      from: `whatsapp:${from}`,
      to: `whatsapp:${OWNER_WHATSAPP}`,
    });
    console.log("Owner WhatsApp sent:", ownerMsg.sid);

    const customerPhone = formatPhone(order.customer_mobile);
    const msgToCustomer = `✅ *Order Confirmed!*\n\nHi ${order.customer_name}, your laundry pickup has been booked successfully.\n\n📋 Order ID: ${order.order_id}\n📅 Pickup: ${order.pickup_date} at ${order.pickup_time}\n🧺 Items: ${itemsSummary}\n💰 Total: ₹${order.total_amount}\n\nTrack: https://maulilaundry.vercel.app/tracking\n\n*Note:* Reply with JOIN to receive WhatsApp updates from Mauli Laundry. 🙏`;

    const customerMsg = await client.messages.create({
      body: msgToCustomer,
      from: `whatsapp:${from}`,
      to: `whatsapp:${customerPhone}`,
    });
    console.log("Customer WhatsApp sent:", customerMsg.sid);
  } catch (err: any) {
    console.error("WhatsApp notification failed:", err.message, err.code, err.moreInfo);
  }
}

export async function GET(request: Request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const orders = getAllOrders();
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const order: Order = {
      id: body.order_id,
      order_id: body.order_id,
      customer_id: body.customer_id || "",
      customer_name: body.customer_name,
      customer_mobile: body.customer_mobile,
      customer_address: body.customer_address,
      items: body.items,
      total_amount: body.total_amount,
      pickup_date: body.pickup_date,
      pickup_time: body.pickup_time,
      status: "Order Received",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const created = createOrder(order);

    sendWhatsAppNotifications(order);

    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
