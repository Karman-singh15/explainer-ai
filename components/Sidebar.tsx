"use client";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";


export default function Sidebar() {
     const { user, isLoaded } = useUser();

  if (!isLoaded) return null;
    const router = useRouter();

  async function addChat() {
    const res = await fetch("/api/chats", {
      method: "POST",
    });

    const data = await res.json();

    const chatId = data.chatId;

    router.push(`/chat/${chatId}`);
  }

    return (
        <aside className="fixed inset-y-0 left-0 z-50 w-64 -translate-x-full transform bg-zinc-900 p-4 transition-transform duration-300 md:relative md:translate-x-0">
            <div className="flex h-full flex-col">
                {/* New Chat Button */}
                <button className="mb-4 flex items-center justify-start gap-3 rounded-md border border-zinc-700 px-3 py-3 text-sm text-white hover:bg-zinc-800 transition-colors"
                    onClick={addChat}>
                    <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    New chat
                </button>

                {/* History List */}
                <div className="flex-1 overflow-y-auto">

                </div>

                {/* User Profile / Settings (Bottom) */}
                <div className="mt-auto border-t border-zinc-700 pt-3">
                    <button className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-sm hover:bg-zinc-800 transition-colors text-white">
                        <div className="h-8 w-8 rounded-sm bg-green-500 flex items-center justify-center font-bold">U</div>
                        <div className="font-medium">{user?.firstName}</div>
                    </button>
                </div>
            </div>
        </aside>
    );
}
