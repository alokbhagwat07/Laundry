"use client";

import { useState, useRef, useEffect } from "react";
import { getChatResponse } from "@/lib/chat-utils";
import { Sparkles, Send, X } from "lucide-react";

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
    <div className="premium-card rounded-2xl flex flex-col overflow-hidden shadow-2xl shadow-black/30" style={{ maxHeight: "520px" }}>
      <div className="bg-gradient-to-r from-blue-600 to-indigo-500 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm leading-tight">Mauli Laundry AI</div>
            <div className="text-blue-200 text-[11px]">Online</div>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-3 bg-dark-900/50" style={{ minHeight: "280px", maxHeight: "340px" }}>
        <div className="flex flex-col gap-2.5">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs ${
                msg.role === "user" ? "bg-blue-500/20 text-blue-300" : "bg-blue-600 text-white"
              }`}>
                {msg.role === "user" ? "👤" : "🤖"}
              </div>
              <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-tr-sm"
                  : "bg-dark-700 text-dark-100 border border-white/[0.06] rounded-tl-sm"
              }`}>
                <RenderText content={msg.content} white={msg.role === "user"} />
              </div>
            </div>
          ))}

          {waiting && (
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs">🤖</div>
              <div className="bg-dark-700 border border-white/[0.06] rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-dark-400 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-dark-400 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                  <span className="w-1.5 h-1.5 bg-dark-400 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-3 border-t border-white/[0.06] bg-dark-800 flex gap-2 flex-shrink-0">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder:text-dark-500"
        />
        <button
          type="submit"
          disabled={!input.trim() || waiting}
          className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-xl font-medium text-sm hover:from-blue-700 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1.5"
        >
          <Send className="w-3.5 h-3.5" />
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
                  <strong key={pi} style={{ color: white ? "white" : "#f1f5f9" }}>
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
