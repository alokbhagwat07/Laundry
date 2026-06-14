import { NextResponse } from "next/server";
import { getContacts, createContact } from "@/lib/store";
import { sendTelegramMessage } from "@/lib/telegram";

function isAdmin(request: Request): boolean {
  const password = request.headers.get("x-admin-password");
  const adminPassword = process.env.ADMIN_PASSWORD || "alok123";
  return password === adminPassword;
}

export async function GET(request: Request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const contacts = await getContacts();
  return NextResponse.json(contacts);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.message) {
      return NextResponse.json({ error: "Name and message are required" }, { status: 400 });
    }
    const contact = await createContact({
      name: body.name,
      email: body.email || "",
      mobile: body.mobile || "",
      message: body.message,
    });
    sendTelegramMessage(
      `📩 NEW CONTACT REQUEST\n\n` +
      `Name: ${body.name}\n` +
      `Mobile: ${body.mobile || "N/A"}\n` +
      `Email: ${body.email || "N/A"}\n` +
      `Message: ${body.message}`
    );
    return NextResponse.json(contact, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
