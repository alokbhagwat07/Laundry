import { NextRequest, NextResponse } from "next/server";
import { getChatResponse } from "@/lib/chat-utils";

const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER || "+14155238886";

function buildTwiML(message: string): string {
  const escaped = message
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${escaped}</Message>
</Response>`;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const body = (formData.get("Body") as string || "").trim();
    const from = formData.get("From") as string || "unknown";

    if (!body) {
      return new NextResponse(buildTwiML("Please send a message."), {
        headers: { "Content-Type": "text/xml" },
      });
    }

    const response = getChatResponse(body);
    const reply = response.text;

    const logEntry = {
      from,
      message: body,
      reply,
      timestamp: new Date().toISOString(),
      action: response.action || "none",
    };

    console.log("[WhatsApp Bot]", JSON.stringify(logEntry));

    return new NextResponse(buildTwiML(reply), {
      headers: { "Content-Type": "text/xml" },
    });
  } catch (error) {
    console.error("[WhatsApp Bot Error]", error);
    return new NextResponse(
      buildTwiML(
        "Sorry, I encountered an error. Please try again or call +91 95455 28747."
      ),
      { headers: { "Content-Type": "text/xml" } }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Mauli Laundry WhatsApp Bot Webhook",
    endpoint: "POST /api/whatsapp",
    setup:
      "Configure this URL as your Twilio WhatsApp webhook (Method: POST)",
  });
}
