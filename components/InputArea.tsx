"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface InputAreaProps {
    onStart: () => void;
    started: boolean;
}

export default function InputArea({ onStart, started }: InputAreaProps) {
    const [input, setInput] = useState("");
    const router = useRouter();
    
    async function addChat() {
        const res = await fetch("/api/chats", {
            method: "POST",
        });
    
        const data = await res.json();
    
        const chatId = data.chatId;
    
        router.push(`/chat/${chatId}`);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onStart();
            if (!started) {
                addChat();
            }
            setInput("");
        }
    };

    return (
        <div className="absolute bottom-0 left-0 w-full from-zinc-900 to-transparent pt-10 pb-6 md:bg-gradient-to-t">
            <div className="mx-auto w-full max-w-3xl px-4 md:px-0 lg:max-w-2xl xl:max-w-3xl">
                <div className="relative flex w-full items-center gap-3 rounded-[26px] bg-[#202123] px-3 py-3 shadow-lg ring-1 ring-white/10 focus-within:ring-white/20">
                    {/* Plus Icon */}
                    <button className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>

                    {/* Text Input */}
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask anything"
                        rows={1}
                        className="flex-1 resize-none bg-transparent py-2 text-white placeholder-zinc-500 focus:outline-none max-h-[200px] overflow-y-hidden"
                        style={{ minHeight: "24px" }}
                    />

                    {/* Right Actions */}
                    <div className="flex items-center gap-2">
                        {/* Mic Icon */}
                        <button className="p-2 text-zinc-400 hover:text-zinc-200 transition-colors">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-5 w-5"
                            >
                                <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
                                <path d="M6 10.5a.75.75 0 01.75.75 v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
                            </svg>
                        </button>

                        {/* Send Button (White Circle) */}
                        <button
                            onClick={() => {
                                onStart();
                                console.log("Sending:", input);
                                setInput("");
                            }}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
                        >
                            {/* Using an arrow icon instead of the wave icon to indicate 'Send' clearly as per user request */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-5 w-5 ml-0.5" // Slight offset for visual centering of arrow
                            >
                                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}