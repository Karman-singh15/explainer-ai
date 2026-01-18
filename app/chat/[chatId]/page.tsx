"use client";

import ChatArea from "@/components/ChatArea";
import Sidebar from "@/components/Sidebar";
import InputArea from "@/components/InputArea";
import { useEffect, useState, use } from "react";
import axios from "axios";

export default function ChatPage({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) {
  const { chatId } = use(params);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    // Fetch initial messages
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/api/message?chatId=${chatId}`);
        setMessages(res.data);
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    }
    fetchMessages();
  }, [chatId]);

  const handleSendMessage = async (text: string) => {
    // Optimistically add user message
    const optimisitcUserMsg = { role: "user", text, _id: Date.now().toString() };
    setMessages(prev => [...prev, optimisitcUserMsg]);

    try {
      const res = await axios.post("/api/message", {
        chatId: chatId,
        text
      });

      // Update with actual response (replace optimistic or just add AI response? 
      // The API returns both. Let's filter out the optimistic one or just append the AI one if we trust the order.
      // Better: Just append the AI response and maybe update the User message with real ID if needed.
      // For simplicity, let's just append the AI message.

      const { userMessage, aiMessage } = res.data;

      // Replace the optimistic message with the real one to get key/ID right, and add AI message
      setMessages(prev => {
        const withoutOptimistic = prev.filter(m => m._id !== optimisitcUserMsg._id);
        return [...withoutOptimistic, userMessage, aiMessage];
      });

    } catch (error) {
      console.error("Failed to send message", error);
      // TODO: Show error state
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#343541]">
      <Sidebar />
      <div className="relative flex flex-1 flex-col overflow-hidden">
        <ChatArea hasStarted={true} chatId={chatId} messages={messages} />
        <InputArea onStart={() => { }} started={true} onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
