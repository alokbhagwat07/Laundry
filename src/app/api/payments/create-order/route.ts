import { NextResponse } from "next/server";

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

export async function POST(request: Request) {
  try {
    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { error: "Razorpay not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const amount = body.amount as number;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64");

    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100),
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Razorpay order creation failed:", data);
      return NextResponse.json(
        { error: data.error?.description || "Failed to create payment order" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      id: data.id,
      amount: data.amount,
      currency: data.currency,
      key_id: RAZORPAY_KEY_ID,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create payment order";
    console.error("Razorpay create-order error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
