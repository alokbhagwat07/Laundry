import { NextResponse } from "next/server";
import { deleteReview } from "@/lib/store";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const password = request.headers.get("x-admin-password");
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: idStr } = await params;
  const id = parseInt(idStr);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid review ID" }, { status: 400 });
  }

  const deleted = await deleteReview(id);
  if (!deleted) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
