import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Chat from "@/models/chats";
import { generateChatId } from "@/lib/utils";

export async function POST() {
  await connectDB();

  const chatId = generateChatId();

  const chat = await Chat.create({
    chatId,
    userId: "temp-user", 
  });

  return NextResponse.json({ chatId: chat.chatId });
}
