"use client";

import { useState } from "react";
import { Star, Send, CheckCircle2 } from "lucide-react";

export default function ReviewForm({ orderId }: { orderId?: string }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || rating === 0 || !comment.trim()) return;
    setSending(true);
    try {
      await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: name,
          rating,
          comment,
          order_id: orderId || "",
        }),
      });
      setSubmitted(true);
    } catch {
      alert("Failed to submit review. Please try again.");
    }
    setSending(false);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-500">Your review helps us serve you better. 🙏</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 md:p-8">
      <h3 className="text-lg font-bold text-gray-900 mb-1">Leave a Review</h3>
      <p className="text-sm text-gray-400 mb-5">Share your experience with us</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="p-0.5 transition-transform hover:scale-110"
            >
              <Star
                className={`w-6 h-6 ${
                  star <= (hover || rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>

        <textarea
          placeholder="Tell us about your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          rows={3}
          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

        <button
          type="submit"
          disabled={!name.trim() || rating === 0 || !comment.trim() || sending}
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {sending ? "Submitting..." : <>Submit Review <Send className="w-3.5 h-3.5" /></>}
        </button>
      </form>
    </div>
  );
}
