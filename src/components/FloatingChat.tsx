"use client";

import { useState, useEffect } from "react";
import Chatbot from "./Chatbot";
import { Sparkles } from "lucide-react";

export default function FloatingChat() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(false);
    window.addEventListener("close-chat", handler);
    return () => window.removeEventListener("close-chat", handler);
  }, []);

  return (
    <>
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "180px",
            right: "20px",
            zIndex: 9999,
            width: "380px",
            maxWidth: "calc(100vw - 32px)",
          }}
          className="animate-scale-in"
        >
          <Chatbot onClose={() => setOpen(false)} />
        </div>
      )}

      <button
        onClick={() => {
          const next = !open;
          setOpen(next);
          if (next) window.dispatchEvent(new CustomEvent("close-whatsapp"));
        }}
        className="fixed bottom-6 right-6 z-[10001] w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 hover:shadow-blue-400/40 hover:scale-110 active:scale-95 transition-all duration-200 animate-card-glow ring-2 ring-blue-400/20 hover:ring-blue-400/40"
        aria-label="AI Chat"
      >
        {open ? (
          <span className="text-2xl text-white" style={{ lineHeight: 1 }}>✕</span>
        ) : (
          <Sparkles className="w-7 h-7 text-white" />
        )}
      </button>
    </>
  );
}
