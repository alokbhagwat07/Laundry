"use client";

import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

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
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 md:p-10 text-center">
        <p className="text-gray-400">No reviews yet. Be the first to share your experience!</p>
      </div>
    );
  }

  const t = reviews[current];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 md:p-10">
      <div className="flex flex-col items-center text-center">
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < t.rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-200"
              }`}
            />
          ))}
        </div>
        <p className="text-gray-600 leading-relaxed text-base mb-6 italic">
          &ldquo;{t.comment}&rdquo;
        </p>
        <p className="font-semibold text-gray-900">{t.customer_name}</p>
        <p className="text-sm text-gray-400">Happy Customer</p>
      </div>

      {reviews.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={prev}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          </button>
          <div className="flex gap-1.5">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? "bg-blue-600 w-6" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      )}
    </div>
  );
}
