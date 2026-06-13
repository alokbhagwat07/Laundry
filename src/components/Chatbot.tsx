"use client";

import { useState, useRef, useEffect } from "react";
import { getChatResponse } from "@/lib/chat-utils";

interface Message {
  role: "user" | "bot";
  content: string;
}

const WELCOME = {
  role: "bot" as const,
  content:
    "👋 Namaste! Welcome to **Mauli Laundry**!\n\nI'm your AI assistant. I can help you with:\n✅ Pricing & costs\n✅ Booking a pickup\n✅ Order tracking\n✅ Business info\n\nHow can I assist you today?",
};

export default function Chatbot({ onClose }: { onClose?: () => void }) {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [waiting, setWaiting] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, waiting]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const send = (text: string) => {
    if (!text.trim() || waiting) return;
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setWaiting(true);
    setTimeout(() => {
      try {
        const reply = getChatResponse(text);
        setMessages((prev) => [...prev, { role: "bot", content: reply.text }]);
      } catch {
        setMessages((prev) => [...prev, { role: "bot", content: "Sorry, something went wrong. Please try again or call +91 95455 28747." }]);
      }
      setWaiting(false);
    }, 500 + Math.random() * 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <div
      style={{
        background: "white",
        borderRadius: "16px",
        border: "1px solid #e5e7eb",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
        maxHeight: "520px",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              background: "rgba(255,255,255,0.2)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
            }}
          >
            🤖
          </div>
          <div>
            <div style={{ color: "white", fontWeight: 600, fontSize: "14px", lineHeight: 1.3 }}>
              Mauli Laundry AI
            </div>
            <div style={{ color: "#bfdbfe", fontSize: "11px" }}>Online</div>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              padding: "4px 8px",
              borderRadius: "8px",
              fontSize: "18px",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        )}
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "12px",
          background: "#f9fafb",
          minHeight: "280px",
          maxHeight: "340px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: "8px",
              flexDirection: msg.role === "user" ? "row-reverse" : "row",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: "14px",
                background: msg.role === "user" ? "#dbeafe" : "#2563eb",
                color: msg.role === "user" ? "#1d4ed8" : "white",
              }}
            >
              {msg.role === "user" ? "👤" : "🤖"}
            </div>
            <div
              style={{
                maxWidth: "85%",
                borderRadius: "14px",
                padding: "8px 14px",
                fontSize: "14px",
                lineHeight: 1.5,
                background: msg.role === "user" ? "#2563eb" : "white",
                color: msg.role === "user" ? "white" : "#1f2937",
                border: msg.role === "user" ? "none" : "1px solid #e5e7eb",
                borderTopLeftRadius: msg.role === "bot" ? "4px" : "14px",
                borderTopRightRadius: msg.role === "user" ? "4px" : "14px",
              }}
            >
              <RenderText content={msg.content} white={msg.role === "user"} />
            </div>
          </div>
        ))}

        {waiting && (
          <div style={{ display: "flex", gap: "8px" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#2563eb",
                color: "white",
                fontSize: "14px",
              }}
            >
              🤖
            </div>
            <div
              style={{
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "14px",
                borderTopLeftRadius: "4px",
                padding: "10px 14px",
              }}
            >
              <span style={{ color: "#9ca3af", fontSize: "14px" }}>typing...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          padding: "12px",
          borderTop: "1px solid #e5e7eb",
          background: "white",
          display: "flex",
          gap: "8px",
          flexShrink: 0,
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: "10px 14px",
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            fontSize: "14px",
            outline: "none",
            background: "#f9fafb",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
          onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
        />
        <button
          type="submit"
          disabled={!input.trim() || waiting}
          style={{
            padding: "10px 18px",
            borderRadius: "10px",
            border: "none",
            background: !input.trim() || waiting ? "#93c5fd" : "#2563eb",
            color: "white",
            fontWeight: 600,
            fontSize: "14px",
            cursor: !input.trim() || waiting ? "not-allowed" : "pointer",
            transition: "background 0.2s",
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}

function RenderText({ content, white }: { content: string; white: boolean }) {
  const lines = content.split("\n");
  return (
    <div>
      {lines.map((line, li) => {
        if (!line.trim()) return <div key={li} style={{ height: "4px" }} />;
        const parts = line.split(/(\*\*.*?\*\*)/g);
        return (
          <div key={li} style={{ lineHeight: 1.5 }}>
            {parts.map((part, pi) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return (
                  <strong key={pi} style={{ color: white ? "white" : "#111827" }}>
                    {part.slice(2, -2)}
                  </strong>
                );
              }
              return <span key={pi}>{part}</span>;
            })}
          </div>
        );
      })}
    </div>
  );
}
