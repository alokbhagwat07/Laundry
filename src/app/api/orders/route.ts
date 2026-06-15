import { NextResponse } from "next/server";
import { getAllOrders, createOrder, upsertCustomer } from "@/lib/store";
import type { Order } from "@/lib/types";
import twilio from "twilio";
import { Resend } from "resend";
import { sendTelegramMessage } from "@/lib/telegram";

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

function getResendClient() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
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
    const businessNumber = process.env.BUSINESS_WHATSAPP_NUMBER || "+919545528747";
    const itemsSummary = order.items.map((i) => `${i.quantity}x ${i.name}`).join(", ");

    const msgToBusiness = `🚨 *New Laundry Order Received*\n\nOrder ID: ${order.order_id}\nCustomer: ${order.customer_name}\nMobile: ${order.customer_mobile}\nAddress: ${order.customer_address}\nPickup Date: ${order.pickup_date}\nPickup Time: ${order.pickup_time}\nTotal Amount: ₹${order.total_amount}`;

    await client.messages.create({
      body: msgToBusiness,
      from: `whatsapp:${from}`,
      to: `whatsapp:${businessNumber}`,
    });
    console.log("Business WhatsApp notification sent");

    const customerPhone = formatPhone(order.customer_mobile);
    const msgToCustomer = `✅ *Order Confirmed!*\n\nHi ${order.customer_name}, your laundry pickup has been booked successfully.\n\n📋 Order ID: ${order.order_id}\n📅 Pickup: ${order.pickup_date} at ${order.pickup_time}\n🧺 Items: ${itemsSummary}\n💰 Total: ₹${order.total_amount}\n\nTrack: https://maulilaundry.vercel.app/tracking\n\n*Note:* Reply with JOIN to receive WhatsApp updates from Mauli Laundry. 🙏`;

    await client.messages.create({
      body: msgToCustomer,
      from: `whatsapp:${from}`,
      to: `whatsapp:${customerPhone}`,
    });
    console.log("Customer WhatsApp sent");
  } catch (err) {
    console.error("WhatsApp notification failed:", err instanceof Error ? err.message : err);
  }
}

async function sendEmailNotification(order: Order) {
  try {
    const resend = getResendClient();
    if (!resend) {
      console.warn("Resend not configured — skipping email");
      return;
    }

    const businessEmail = process.env.BUSINESS_EMAIL;
    if (!businessEmail) {
      console.warn("BUSINESS_EMAIL not set — skipping email");
      return;
    }

    const itemsHtml = order.items
      .map((i) => `<tr><td style="padding:4px 12px">${i.quantity}x ${i.name}</td><td style="padding:4px 12px">₹${i.price}</td></tr>`)
      .join("");

    await resend.emails.send({
      from: "Mauli Laundry <notifications@maulilaundry.com>",
      to: businessEmail,
      subject: `🚨 New Laundry Order Received - ${order.order_id}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#2563eb;padding:20px;text-align:center">
            <h1 style="color:#fff;margin:0;font-size:20px">🚨 New Laundry Order Received</h1>
          </div>
          <div style="padding:20px;background:#f9fafb">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#6b7280;font-size:14px">Order ID</td><td style="padding:8px 0;font-weight:600">${order.order_id}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;font-size:14px">Customer</td><td style="padding:8px 0;font-weight:600">${order.customer_name}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;font-size:14px">Mobile</td><td style="padding:8px 0;font-weight:600">${order.customer_mobile}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;font-size:14px">Address</td><td style="padding:8px 0;font-weight:600">${order.customer_address}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;font-size:14px">Pickup Date</td><td style="padding:8px 0;font-weight:600">${order.pickup_date}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;font-size:14px">Pickup Time</td><td style="padding:8px 0;font-weight:600">${order.pickup_time}</td></tr>
            </table>
            <h3 style="margin:16px 0 8px;font-size:16px">Items</h3>
            <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:8px">
              <thead><tr style="background:#f3f4f6"><th style="padding:8px 12px;text-align:left;font-size:13px">Item</th><th style="padding:8px 12px;text-align:left;font-size:13px">Price</th></tr></thead>
              <tbody>${itemsHtml}</tbody>
            </table>
            <p style="font-size:18px;font-weight:700;margin:16px 0 0">Total: ₹${order.total_amount}</p>
          </div>
          <div style="padding:12px;text-align:center;color:#9ca3af;font-size:12px">
            <p>Mauli Laundry — <a href="https://maulilaundry.vercel.app/admin" style="color:#2563eb">Admin Dashboard</a></p>
          </div>
        </div>
      `,
    });
    console.log("Email notification sent");
  } catch (err) {
    console.error("Email notification failed:", err instanceof Error ? err.message : err);
  }
}

export async function GET(request: Request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const orders = await getAllOrders();
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const now = new Date().toISOString();
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
      created_at: now,
      updated_at: now,
      payment_id: body.payment_id || undefined,
      razorpay_order_id: body.razorpay_order_id || undefined,
      amount_paid: body.amount_paid || undefined,
      payment_status: body.payment_status || "Pending",
      payment_method: body.payment_method || undefined,
      payment_date: body.payment_date || undefined,
      payment_mode: body.payment_mode || "online",
    };
    (order as unknown as Record<string, unknown>).service_type = body.service_type || "press";

    const created = await createOrder(order);

    upsertCustomer({
      name: body.customer_name,
      mobile: body.customer_mobile,
      address: body.customer_address,
    });

    const serviceType = body.service_type || "press";
    const serviceLabel = serviceType === "washPress" ? "Wash & Press" : "Press";

    const telegramText =
      `🧺 NEW LAUNDRY ORDER\n\n` +
      `Order ID: ${order.order_id}\n` +
      `Customer: ${order.customer_name}\n` +
      `Mobile: ${order.customer_mobile}\n` +
      `Address: ${order.customer_address}\n` +
      `Service: ${serviceLabel}\n` +
      `Pickup Date: ${order.pickup_date}\n` +
      `Pickup Time: ${order.pickup_time}\n` +
      `Total Amount: ₹${order.total_amount}`;

    await sendTelegramMessage(telegramText);

    sendWhatsAppNotifications(order);
    sendEmailNotification(order);

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
