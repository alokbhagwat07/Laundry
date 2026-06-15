import { NextResponse } from "next/server";
import crypto from "crypto";
import { updatePaymentStatus } from "@/lib/store";

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_id, amount } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing payment verification details" },
        { status: 400 }
      );
    }

    if (!RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { error: "Razorpay not configured" },
        { status: 500 }
      );
    }

    const generatedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    if (order_id) {
      await updatePaymentStatus(order_id, {
        payment_id: razorpay_payment_id,
        razorpay_order_id,
        amount_paid: amount || 0,
        payment_status: "Paid",
        payment_method: "Online",
        payment_date: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      verified: true,
      razorpay_order_id,
      razorpay_payment_id,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Payment verification failed";
    console.error("Payment verify error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
