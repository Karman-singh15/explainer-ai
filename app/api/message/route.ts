import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { connectDB } from "@/lib/mongoose";
import Message from "@/models/messages";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { chatId, text } = await req.json();

        if (!chatId || !text) {
            return NextResponse.json(
                { error: "Missing chatId or text" },
                { status: 400 }
            );
        }

        // 1. Save User Message
        const userMessage = await Message.create({
            chatId,
            role: "user",
            text,
        });

        // 2. Generate AI Response
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // Optional: Load history for context if needed, for now just sending the prompt
        // In a real app, you'd fetch previous messages from DB and format them.
        const result = await model.generateContent(text);
        const response = await result.response;
        const aiText = response.text();

        // 3. Save AI Message
        const aiMessage = await Message.create({
            chatId,
            role: "ai",
            text: aiText,
        });

        return NextResponse.json({
            userMessage,
            aiMessage
        });

    } catch (error) {
        console.error("Error in chat API:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const chatId = searchParams.get('chatId');

        if (!chatId) {
            return NextResponse.json({ error: "Missing chatId" }, { status: 400 });
        }

        const messages = await Message.find({ chatId }).sort({ createdAt: 1 });
        return NextResponse.json(messages);

    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
