"use client";

import { useState, useEffect } from "react";
import Chatbot from "./Chatbot";

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
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 10001,
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(37, 99, 235, 0.4)",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        className="hover:scale-110 active:scale-95 animate-pulse-glow"
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 6px 28px rgba(37, 99, 235, 0.5)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(37, 99, 235, 0.4)";
        }}
        aria-label="Chat"
      >
        {open ? (
          <span style={{ fontSize: "24px", color: "white", lineHeight: 1 }}>✕</span>
        ) : (
          <span style={{ fontSize: "28px", color: "white", lineHeight: 1 }}>💬</span>
        )}
      </button>
    </>
  );
}
