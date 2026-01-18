"use client";

import Sidebar from "@/components/Sidebar";
import ChatArea from "@/components/ChatArea";
import InputArea from "@/components/InputArea";
import { useState } from "react";

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = (text: string) => {
    // 1. Add User Message
    const userMessage = { role: "user", text, id: Date.now().toString() };
    setMessages((prev) => [...prev, userMessage]);
    setHasStarted(true);

    // 2. Set Loading
    setIsLoading(true);

    // 3. Simulate AI Response (replace with actual API call later)
    setTimeout(() => {
      const aiMessage = {
        role: "ai",
        text: "This is a simulated response to demonstrate the typing effect and UI changes. I am generating this text character by character.",
        id: (Date.now() + 1).toString()
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 2000); // 2 second delay to show "Generating..." animation
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#343541]">
      <Sidebar />
      <div className="relative flex flex-1 flex-col overflow-hidden">
        <ChatArea hasStarted={hasStarted} chatId={""} messages={messages} isLoading={isLoading} />
        <InputArea onStart={() => setHasStarted(true)} started={hasStarted} onSendMessage={handleSendMessage} />
      </div>
    </div>
  )
}
