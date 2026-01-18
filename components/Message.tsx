import React, { useState, useEffect } from 'react';

interface MessageProps {
    message: {
        role: "user" | "ai";
        text: string;
    }
}

export default function Message({ message }: MessageProps) {
    const isUser = message.role === "user";
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        if (!isUser) {
            let i = 0;
            const intervalId = setInterval(() => {
                setDisplayedText((prev) => message.text.slice(0, i + 1));
                i++;
                if (i > message.text.length) {
                    clearInterval(intervalId);
                }
            }, 20); // Adjust speed here (lower is faster)
            return () => clearInterval(intervalId);
        } else {
            setDisplayedText(message.text);
        }
    }, [message.text, isUser]);

    return (
        <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} py-2 px-4`}>
            <div className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-3 shadow-sm ${isUser
                ? 'bg-blue-600 text-white rounded-br-none'
                : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none border border-gray-200 dark:border-gray-600'
                }`}>
                <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap leading-relaxed break-words text-sm md:text-base">
                    {displayedText}
                    {!isUser && displayedText.length < message.text.length && (
                        <span className="inline-block w-1.5 h-4 ml-1 bg-gray-400 align-middle animate-pulse"></span>
                    )}
                </div>
            </div>
        </div>
    )
}
