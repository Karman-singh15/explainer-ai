import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Chat from "@/models/chats";
import { generateChatId } from "@/lib/utils";

import { auth } from "@clerk/nextjs/server";

export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await connectDB();

  const chatId = generateChatId();

  const chat = await Chat.create({
    chatId,
    userId,
  });

  return NextResponse.json({ chatId: chat.chatId, name: chat.name });
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await connectDB();

  const chats = await Chat.find({ userId }).sort({ createdAt: -1 });

  return NextResponse.json(chats);
}
