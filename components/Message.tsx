
interface MessageProps {
    role: "user" | "assistant";
    content: string;
}

export default function Message({ role, content }: MessageProps) {
    return (
        <div
            className={`group w-full text-gray-800 dark:text-gray-100 ${role === "assistant"
                    ? "bg-gray-50 dark:bg-[#444654]"
                    : "bg-white dark:bg-[#343541]"
                }`}
        >
            <div className="m-auto flex gap-4 p-4 text-base md:max-w-2xl md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl">
                <div className="relative flex h-8 w-8 flex-col items-center justify-center rounded-sm text-sm">
                    {role === "user" ? (
                        <div className="flex h-full w-full items-center justify-center rounded-sm bg-green-500 text-white font-semibold">
                            U
                        </div>
                    ) : (
                        <div className="flex h-full w-full items-center justify-center rounded-sm bg-[#19c37d] text-white">
                            <svg
                                stroke="currentColor"
                                fill="none"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-6 w-6"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
                                <path d="M12 12a10 10 0 0 1 10-10"></path>
                                <path d="M22 12h-10"></path>
                            </svg>
                        </div>
                    )}
                </div>
                <div className="relative flex-1 overflow-hidden break-words">
                    <div className="prose prose-invert whitespace-pre-wrap leading-7">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
}
