import { NextResponse } from "next/server";
import { getCustomers } from "@/lib/store";

function isAdmin(request: Request): boolean {
  const password = request.headers.get("x-admin-password");
  const adminPassword = process.env.ADMIN_PASSWORD || "alok123";
  return password === adminPassword;
}

export async function GET(request: Request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const customers = await getCustomers();
  return NextResponse.json(customers);
}
