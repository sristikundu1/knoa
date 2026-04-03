import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

const AIChat = ({ isOpen, setIsOpen }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! How can I help you today?" },
  ]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Sorry, I'm having trouble connecting." },
      ]);
    }
  };

  if (!isOpen) return null; // Don't render anything if closed

  return (
    <div className="fixed bottom-6 right-6 w-80 h-96 bg-white shadow-2xl rounded-2xl border border-blue-50 flex flex-col z-50 overflow-hidden">
      {/* Header */}
      <div className="bg-[#39B8AD] p-4 text-white flex justify-between items-center">
        <span className="font-bold">AI Support</span>
        <button onClick={() => setIsOpen(false)}>
          <IoClose size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] p-2 rounded-xl text-sm ${
                m.role === "user"
                  ? "bg-[#7F81C8] text-white"
                  : "bg-white text-slate-700 shadow-sm border border-slate-100"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-3 border-t flex gap-2 bg-white">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask anything..."
          className="flex-1 bg-slate-100 border-none rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[#39B8AD]"
        />
        <button
          onClick={handleSend}
          className="text-[#39B8AD] hover:scale-110 transition-transform"
        >
          <BsSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default AIChat;
