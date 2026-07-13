"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { FormEvent, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm Dhrubo's portfolio assistant. Ask me anything about his work, stack, availability, or projects." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const content = input.trim();
    if (!content || loading) return;
    const nextMessages: Message[] = [...messages, { role: "user", content }];
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-8) }),
      });
      if (!response.ok || !response.body) throw new Error("Chat request failed");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistant = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistant += decoder.decode(value, { stream: true });
        setMessages([...nextMessages, { role: "assistant", content: assistant }]);
      }
    } catch {
      setMessages([...nextMessages, { role: "assistant", content: "I couldn't reach the assistant service right now. Dhrubo is available at dhrubo@dhrubo.shop or WhatsApp +91 82408 01921." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="chat-widget">
      <AnimatePresence>
        {open && (
          <motion.div className="chat-panel" initial={{ opacity: 0, y: 18, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.96 }}>
            <div className="chat-head">
              <div>
                <span className="online-dot" /> Ask Dhrubo&apos;s AI
              </div>
              <button aria-label="Close chat" onClick={() => setOpen(false)}><X size={18} /></button>
            </div>
            <div className="chat-log">
              {messages.map((message, index) => (
                <div key={index} className={`chat-message ${message.role}`}>
                  {message.content || (loading ? "Thinking..." : "")}
                </div>
              ))}
            </div>
            <form className="chat-form" onSubmit={submit}>
              <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about projects, stack, availability..." />
              <button aria-label="Send message" disabled={loading}><Send size={17} /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <button className="chat-button" onClick={() => setOpen((value) => !value)} aria-label="Talk to Dhrubo">
        <span><span className="online-dot" /> Talk to Dhrubo</span>
        <MessageCircle size={19} />
      </button>
    </div>
  );
}
