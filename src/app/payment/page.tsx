"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, CreditCard, IndianRupee, Smartphone, Banknote, Landmark, Scan } from "lucide-react";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void; on: (event: string, handler: (response: Record<string, unknown>) => void) => void };
  }
}

export default function PaymentPage() {
  const [amount, setAmount] = useState("");
  const [processing, setProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !document.querySelector("script[src='https://checkout.razorpay.com/v1/checkout.js']")) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handlePayment = async () => {
    if (!amount || Number(amount) <= 0) return;
    setProcessing(true);
    setPaymentError("");

    try {
      const orderRes = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number(amount) }),
      });

      if (!orderRes.ok) {
        const errData = await orderRes.json();
        throw new Error(errData.error || "Failed to initiate payment");
      }

      const orderData = await orderRes.json();

      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Mauli Laundry",
        description: `Payment of ₹${Number(amount).toFixed(0)}`,
        order_id: orderData.id,
        theme: { color: "#2563eb" },
        handler: async () => {
          setPaid(true);
          setProcessing(false);
        },
        modal: {
          ondismiss: () => {
            setProcessing(false);
            setPaymentError("Payment cancelled");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response: Record<string, unknown>) => {
        setPaymentError(`Payment failed: ${(response.error as Record<string, unknown>)?.description || "Unknown error"}`);
        setProcessing(false);
      });
      rzp.open();
    } catch (err) {
      setPaymentError(err instanceof Error ? err.message : "Payment failed");
      setProcessing(false);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-600 via-blue-700 to-indigo-900 py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm text-blue-100 text-xs font-medium mb-5 tracking-wide">
              <CreditCard className="w-3.5 h-3.5" />
              Secure Payment
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight text-balance">
              Make a Payment
            </h1>
            <p className="text-blue-100/70 text-lg md:text-xl max-w-2xl mx-auto">
              Pay any amount via UPI, Cards, Net Banking, GPay, PhonePe, or Paytm
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      <section className="py-20 md:py-28 bg-gray-50 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

          {/* Pay Online */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 md:p-8"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-1">Pay Online via Razorpay</h2>
            <p className="text-sm text-gray-500 mb-5">Enter any amount and pay using UPI, Cards, or Net Banking</p>

            <div className="relative mb-5">
              <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                min="1"
                step="1"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handlePayment()}
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {paymentError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-4 mb-4"
              >
                {paymentError}
              </motion.div>
            )}

            <button
              onClick={handlePayment}
              disabled={processing || !amount || Number(amount) <= 0}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-200/50 flex items-center justify-center gap-2 text-lg"
            >
              {processing ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
              ) : (
                <><CreditCard className="w-5 h-5" /> Pay ₹{amount ? Number(amount).toFixed(0) : "0.00"}</>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
              <span className="flex items-center gap-1"><Smartphone className="w-3.5 h-3.5" /> UPI</span>
              <span className="flex items-center gap-1"><Banknote className="w-3.5 h-3.5" /> Cards</span>
              <span className="flex items-center gap-1"><Landmark className="w-3.5 h-3.5" /> Net Banking</span>
              <span className="flex items-center gap-1"><Smartphone className="w-3.5 h-3.5" /> GPay / PhonePe / Paytm</span>
            </div>
          </motion.div>

          {/* Success */}
          {paid && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl border border-green-100 shadow-lg p-8 md:p-10 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
              <p className="text-gray-500 mb-6">Your payment of <strong className="text-gray-900">₹{Number(amount).toFixed(0)}</strong> has been received.</p>
              <button
                onClick={() => { setAmount(""); setPaid(false); setPaymentError(""); }}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-indigo-600 transition-all shadow-md"
              >
                Pay Another
              </button>
            </motion.div>
          )}

          {/* Scan QR */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 md:p-8"
          >
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Scan className="w-4 h-4 text-blue-600" />
              Scan & Pay with UPI
            </h3>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="bg-white rounded-xl p-2 border border-gray-200 shadow-sm">
                <img
                  src="/qr-code.jpeg"
                  alt="UPI QR Code"
                  className="w-48 h-48 sm:w-56 sm:h-56 object-contain"
                />
              </div>
              <div className="space-y-3 text-sm text-center sm:text-left">
                <p className="text-gray-600">Scan this QR code with any UPI app:</p>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">Google Pay</span>
                  <span className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium">PhonePe</span>
                  <span className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs font-medium">Paytm</span>
                  <span className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-xs font-medium">BHIM</span>
                </div>
                <p className="text-xs text-gray-400">
                  UPI ID: <span className="font-mono font-semibold text-blue-700">mauli@upi</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Other Payment Methods */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 md:p-8"
          >
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Banknote className="w-4 h-4 text-blue-600" />
              Other Ways to Pay
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-blue-50 rounded-xl p-4">
                <Smartphone className="w-5 h-5 text-blue-600 mb-2" />
                <p className="text-xs text-gray-500 mb-1">UPI ID</p>
                <p className="font-mono font-semibold text-blue-700 text-base">mauli@upi</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <Smartphone className="w-5 h-5 text-green-600 mb-2" />
                <p className="text-xs text-gray-500 mb-1">GPay / PhonePe / Paytm</p>
                <p className="font-semibold text-green-700">+91 95455 28747</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <Landmark className="w-5 h-5 text-purple-600 mb-2" />
                <p className="text-xs text-gray-500 mb-1">Bank Transfer</p>
                <p className="font-semibold text-purple-700 text-xs leading-relaxed">
                  Mauli Laundry<br />
                  SBI Bank · A/C: 1234567890<br />
                  IFSC: SBIN0001234
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}
