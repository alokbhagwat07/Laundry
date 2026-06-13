import { NextResponse } from "next/server";
import { getAllReviews, createReview } from "@/lib/store";

export async function GET() {
  const reviews = getAllReviews();
  return NextResponse.json(reviews);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.customer_name || !body.rating || !body.comment) {
      return NextResponse.json({ error: "Name, rating, and comment are required" }, { status: 400 });
    }
    const rating = parseInt(body.rating);
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
    }
    const review = createReview({
      customer_name: body.customer_name,
      rating,
      comment: body.comment,
      order_id: body.order_id || "",
    });
    return NextResponse.json(review, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
