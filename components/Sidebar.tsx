"use client";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { SignOutButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Link from "next/link"; // Import Link
import { Pencil, Check, X } from "lucide-react"; // Start using Lucide icons for better UI

interface Chat {
    chatId: string;
    name: string;
}

export default function Sidebar() {
    const { user, isLoaded } = useUser();
    const router = useRouter();
    const [chats, setChats] = useState<Chat[]>([]);
    const [editingChatId, setEditingChatId] = useState<string | null>(null);
    const [newChatName, setNewChatName] = useState("");

    // Sync user and fetch chats
    useEffect(() => {
        if (isLoaded && user) {
            fetch("/api/users");
            fetchChats();
        }
    }, [isLoaded, user]);

    const fetchChats = async () => {
        try {
            const res = await fetch("/api/chats");
            if (res.ok) {
                const data = await res.json();
                setChats(data);
            }
        } catch (error) {
            console.error("Failed to fetch chats", error);
        }
    };

    async function addChat() {
        try {
            const res = await fetch("/api/chats", {
                method: "POST",
            });
            const data = await res.json();
            const chatId = data.chatId;

            // Refresh chats list to include the new one
            await fetchChats();

            router.push(`/chat/${chatId}`);
        } catch (error) {
            console.error("Failed to create chat", error);
        }
    }

    const startEditing = (chat: Chat) => {
        setEditingChatId(chat.chatId);
        setNewChatName(chat.name);
    };

    const cancelEditing = () => {
        setEditingChatId(null);
        setNewChatName("");
    };

    const saveChatName = async (chatId: string) => {
        if (!newChatName.trim()) return;

        try {
            const res = await fetch(`/api/chats/${chatId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: newChatName }),
            });

            if (res.ok) {
                setChats((prev) =>
                    prev.map((c) =>
                        c.chatId === chatId ? { ...c, name: newChatName } : c
                    )
                );
                setEditingChatId(null);
            }
        } catch (error) {
            console.error("Failed to rename chat", error);
        }
    };

    return (
        <aside className="fixed inset-y-0 left-0 z-50 w-64 -translate-x-full transform bg-zinc-900 p-4 transition-transform duration-300 md:relative md:translate-x-0">
            <div className="flex h-full flex-col">
                {/* New Chat Button */}
                <button
                    className="mb-4 flex items-center justify-start gap-3 rounded-md border border-zinc-700 px-3 py-3 text-sm text-white hover:bg-zinc-800 transition-colors"
                    onClick={addChat}
                >
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
                <div className="flex-1 overflow-y-auto space-y-2">
                    {chats.map((chat) => (
                        <div
                            key={chat.chatId}
                            className="group flex items-center justify-between rounded-md px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors cursor-pointer"
                        >
                            {editingChatId === chat.chatId ? (
                                <div className="flex w-full items-center gap-2">
                                    <input
                                        type="text"
                                        value={newChatName}
                                        onChange={(e) => setNewChatName(e.target.value)}
                                        className="w-full rounded bg-zinc-700 px-2 py-1 text-white focus:outline-none"
                                        autoFocus
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") saveChatName(chat.chatId);
                                            if (e.key === "Escape") cancelEditing();
                                        }}
                                        onClick={(e) => e.stopPropagation()} // Prevent navigation
                                    />
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            saveChatName(chat.chatId);
                                        }}
                                        className="text-green-500 hover:text-green-400"
                                    >
                                        <Check size={14} />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            cancelEditing();
                                        }}
                                        className="text-red-500 hover:text-red-400"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Link
                                        href={`/chat/${chat.chatId}`}
                                        className="flex-1 truncate"
                                    >
                                        {chat.name}
                                    </Link>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            startEditing(chat);
                                        }}
                                        className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-white transition-opacity"
                                    >
                                        <Pencil size={14} />
                                    </button>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                {/* User Profile / Settings (Bottom) */}
                <div className="mt-auto border-t border-zinc-700 pt-3 flex">
                    <button className="flex w-4/5 items-center gap-3 rounded-md px-3 py-3 text-sm hover:bg-zinc-800 transition-colors text-white">
                        <div className="h-8 w-8 rounded-sm bg-green-500 flex items-center justify-center font-bold">
                            {user?.firstName?.charAt(0) || "U"}
                        </div>
                        <div className="font-medium">{user?.firstName}</div>
                    </button>
                    <SignOutButton>
                        <button className="flex w-1/5 items-center gap-3 rounded-md px-3 py-3 text-sm hover:bg-zinc-800 transition-colors text-white">
                            <img src="/logout.png" alt="signout" />
                        </button>
                    </SignOutButton>
                </div>
            </div>
        </aside>
    );
}
