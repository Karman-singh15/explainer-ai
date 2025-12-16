import Message from "./Message";

interface ChatAreaProps {
    hasStarted: boolean;
}

export default function ChatArea({ hasStarted }: ChatAreaProps) {
    return (
        <div className="flex-1 overflow-y-auto bg-white dark:bg-[#343541] pb-40">
            <div className="flex flex-col items-center text-sm dark:bg-[#343541]">
                {/* Placeholder Welcome Screen */}
                <div className="flex h-full w-full flex-col gap-8 px-4 py-20 lg:py-32 md:max-w-2xl lg:max-w-3xl md:px-0 text-center">
                    <div className="flex-1 overflow-y-auto p-4">
                        {!hasStarted ? (
                            <h1 className="text-4xl font-semibold text-gray-800 dark:text-gray-100 mb-8">
                                Explainer AI
                            </h1>
                        ) : (
                            <div className="space-y-4">
                                {/* TODO: Render messages here */}
                                {/* {messages.map((m) => (
                                    <MessageItem
                                        key={m.id}
                                        msg={m}
                                        messages={messages}
                                        setMessages={setMessages}
                                    />
                                ))} */}
                                <div className="text-gray-500">Messages will appear here</div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
