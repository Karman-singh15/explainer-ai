"use client";
import Message from "./Message";

interface ChatAreaProps {
    hasStarted: boolean;
    chatId: string;
    messages: any[];
    isLoading?: boolean;
}

export default function ChatArea({ hasStarted, messages, isLoading }: ChatAreaProps) {
    return (
        <div className="flex-1 overflow-y-auto bg-white dark:bg-[#343541] pb-40">
            <div className="flex flex-col items-center text-sm dark:bg-[#343541]">
                {/* Placeholder Welcome Screen */}
                <div className="flex h-full w-full flex-col gap-8 px-4 py-20 lg:py-32 md:max-w-2xl lg:max-w-3xl md:px-0 text-center">
                    <div className="flex-1 p-4 w-full">
                        {!hasStarted ? (
                            <h1 className="text-4xl font-semibold text-gray-800 dark:text-gray-100 mb-8">
                                Explainer AI
                            </h1>
                        ) : (
                            <div className="space-y-4 w-full">
                                {messages.map((m) => (
                                    <Message key={m._id || m.id} message={m} />
                                ))}
                                {isLoading && (
                                    <div className="flex w-full justify-start py-2 px-4">
                                        <div className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-2xl rounded-bl-none border border-gray-200 dark:border-gray-600 px-5 py-3 shadow-sm">
                                            <div className="flex items-center gap-1">
                                                <span className="text-sm font-medium mr-2">Generating</span>
                                                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
