"use client";

import Sidebar from "@/components/Sidebar";
import ChatArea from "@/components/ChatArea";
import InputArea from "@/components/InputArea";
import { useState } from "react";

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#343541]">
      <Sidebar />
      <div className="relative flex flex-1 flex-col overflow-hidden">
        <ChatArea hasStarted={hasStarted} />
          <InputArea onStart={() => setHasStarted(true)} />
      </div>
    </div>
  )
}
