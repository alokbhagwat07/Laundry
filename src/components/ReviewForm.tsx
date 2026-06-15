"use client";

import { useState } from "react";
import { Star, Send, CheckCircle2, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ReviewForm({ orderId }: { orderId?: string }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || rating === 0 || !comment.trim()) return;
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: name,
          rating,
          comment,
          order_id: orderId || "",
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to submit review");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
    setSending(false);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="premium-card rounded-2xl shadow-xl p-8 text-center"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
        <p className="text-dark-400">Your review helps us serve you better.</p>
      </motion.div>
    );
  }

  return (
    <div className="premium-card rounded-2xl shadow-xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Leave a Review</h3>
          <p className="text-sm text-dark-400">Share your experience with us</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-dark-500 text-white"
        />

        <div>
          <p className="text-xs text-dark-400 mb-2 font-medium">Your Rating</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="p-0.5 transition-all hover:scale-110 active:scale-95"
              >
                <Star
                  className={`w-7 h-7 ${
                    star <= (hover || rating)
                      ? "text-yellow-400 fill-yellow-400 drop-shadow-sm"
                      : "text-dark-600"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <textarea
          placeholder="Tell us about your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          rows={3}
          className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none placeholder:text-dark-500 text-white"
        />

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="text-sm text-red-400 bg-red-500/10 rounded-xl px-4 py-2 border border-red-500/20"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={!name.trim() || rating === 0 || !comment.trim() || sending}
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-400/30 active:scale-[0.98]"
        >
          {sending ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Submitting...
            </span>
          ) : (
            <>
              Submit Review
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
