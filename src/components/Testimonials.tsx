"use client";

import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Loader2, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Review {
  id: number;
  customer_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const prev = () =>
    setCurrent((c) => (c === 0 ? Math.max(reviews.length - 1, 0) : c - 1));
  const next = () =>
    setCurrent((c) => (c >= reviews.length - 1 ? 0 : c + 1));

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
          <span className="text-sm text-gray-400">Loading reviews...</span>
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="glass rounded-2xl shadow-xl p-12 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Quote className="w-7 h-7 text-blue-400" />
        </div>
        <p className="text-gray-400">No reviews yet. Be the first to share your experience!</p>
      </div>
    );
  }

  const t = reviews[current];

  return (
    <div className="glass rounded-2xl shadow-xl p-8 md:p-10 card-hover">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center mb-5 shadow-lg shadow-blue-200/50 ring-4 ring-white">
            <span className="text-white font-bold text-xl">
              {t.customer_name.charAt(0).toUpperCase()}
            </span>
          </div>

          {/* Stars */}
          <div className="flex gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < t.rating
                    ? "text-yellow-400 fill-yellow-400 drop-shadow-sm"
                    : "text-gray-200"
                }`}
              />
            ))}
          </div>

          {/* Quote */}
          <p className="text-gray-600 leading-relaxed text-base mb-5 italic max-w-md">
            &ldquo;{t.comment}&rdquo;
          </p>

          {/* Author */}
          <p className="font-semibold text-gray-900">{t.customer_name}</p>
          <p className="text-sm text-gray-400">Happy Customer</p>
        </motion.div>
      </AnimatePresence>

      {reviews.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="p-2.5 rounded-xl hover:bg-white/60 transition-all duration-200 border border-gray-100 hover:border-gray-200"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-4 h-4 text-gray-500" />
          </button>
          <div className="flex gap-1.5">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "w-6 bg-gradient-to-r from-blue-600 to-indigo-500" : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="p-2.5 rounded-xl hover:bg-white/60 transition-all duration-200 border border-gray-100 hover:border-gray-200"
            aria-label="Next review"
          >
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      )}
    </div>
  );
}
