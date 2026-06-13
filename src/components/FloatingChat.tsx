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
          background: "#2563eb",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 16px rgba(37, 99, 235, 0.4)",
          transition: "transform 0.2s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
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
