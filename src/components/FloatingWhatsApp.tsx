"use client";

import { useState, useRef, useEffect } from "react";
import { getChatResponse } from "@/lib/chat-utils";
import { X, Send, MessageCircle, Check } from "lucide-react";

interface Message {
  role: "user" | "bot";
  content: string;
}

const WELCOME: Message = {
  role: "bot",
  content: "👋 Namaste! Welcome to **Mauli Laundry**!\n\nI'm your WhatsApp bot. Try asking:\n• \"Price of 3 shirts\"\n• \"I need a pickup\"\n• \"Working hours?\"\n• \"Talk to agent\"",
};

const SUGGESTIONS = [
  "Price of 3 shirts",
  "I need a pickup",
  "Working hours?",
  "Talk to agent",
];

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [waiting, setWaiting] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = () => setOpen(false);
    window.addEventListener("close-whatsapp", handler);
    return () => window.removeEventListener("close-whatsapp", handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, waiting]);

  const send = (text: string) => {
    if (!text.trim() || waiting) return;
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setWaiting(true);
    setTimeout(() => {
      try {
        const reply = getChatResponse(text);
        setMessages((prev) => [...prev, { role: "bot" as const, content: reply.text }]);
      } catch {
        setMessages((prev) => [...prev, { role: "bot" as const, content: "Sorry, something went wrong. Please try again." }]);
      }
      setWaiting(false);
    }, 500 + Math.random() * 500);
  };

  return (
    <>
      {open && (
        <div
          className="fixed bottom-44 right-6 z-[9999] w-[380px] max-w-[calc(100vw-32px)]"
          style={{ maxHeight: "560px" }}
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col">
            {/* WhatsApp Header */}
            <div className="bg-[#075e54] px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 bg-[#25d366] rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">Mauli Laundry</p>
                <p className="text-[#25d366] text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#25d366] rounded-full" />
                  Online
                </p>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="bg-[#e5ddd5] bg-[image:url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')]">
              <div className="h-[320px] overflow-y-auto p-3 space-y-2">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[88%] rounded-lg px-3.5 py-2 text-sm leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-[#dcf8c6] rounded-br-sm text-gray-800"
                        : "bg-white rounded-bl-sm text-gray-800"
                    }`}>
                      <Render content={msg.content} />
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-[9px] text-gray-400">
                          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {msg.role === "user" && <Check className="w-3 h-3 text-gray-400" />}
                      </div>
                    </div>
                  </div>
                ))}

                {waiting && (
                  <div className="flex justify-start">
                    <div className="bg-white rounded-lg rounded-bl-sm px-4 py-3 shadow-sm">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            </div>

            {/* Suggestions */}
            <div className="bg-gray-50 px-3 pt-3 border-t border-gray-100">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    disabled={waiting}
                    className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-[#25d366] hover:text-[#075e54] transition-colors disabled:opacity-50"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="bg-white px-3 py-2.5 border-t border-gray-100">
              <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#25d366] focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || waiting}
                  className="w-10 h-10 bg-[#075e54] rounded-full flex items-center justify-center hover:bg-[#0b7a6e] disabled:opacity-40 transition-colors shrink-0"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => {
          const next = !open;
          setOpen(next);
          if (next) window.dispatchEvent(new CustomEvent("close-chat"));
        }}
        className="fixed bottom-24 right-6 z-[10001] w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-300 hover:bg-green-600 hover:scale-110 active:scale-95 transition-all duration-200"
        aria-label="WhatsApp Chat"
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <div className="relative">
            <MessageCircle className="w-7 h-7 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
          </div>
        )}
      </button>
    </>
  );
}

function Render({ content }: { content: string }) {
  const lines = content.split("\n");
  return (
    <div>
      {lines.map((line, li) => {
        if (!line.trim()) return <div key={li} className="h-1" />;
        const parts = line.split(/(\*\*.*?\*\*)/g);
        return (
          <p key={li} className="leading-relaxed">
            {parts.map((part, pi) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return <strong key={pi} className="text-gray-900">{part.slice(2, -2)}</strong>;
              }
              return <span key={pi}>{part}</span>;
            })}
          </p>
        );
      })}
    </div>
  );
}
