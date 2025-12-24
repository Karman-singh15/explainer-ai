"use client";

import ChatArea from "@/components/ChatArea";
import Sidebar from "@/components/Sidebar";
import InputArea from "@/components/InputArea";

export default function ChatPage({
  params,
}: {
  params: { chatId: string };
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#343541]">
          <Sidebar />
          <div className="relative flex flex-1 flex-col overflow-hidden">
            <ChatArea hasStarted={true} chatId={params.chatId} />
              <InputArea onStart={() => {}} started={true}/>
          </div>
        </div>
  );
}
