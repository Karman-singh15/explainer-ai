
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Chat from "@/models/chats";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ chatId: string }> }
) {
    const { userId } = await auth();
    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const { chatId } = await params;
    const { name } = await request.json();

    if (!name) {
        return new NextResponse("Name is required", { status: 400 });
    }

    await connectDB();

    const chat = await Chat.findOneAndUpdate(
        { chatId, userId },
        { name },
        { new: true }
    );

    if (!chat) {
        return new NextResponse("Chat not found", { status: 404 });
    }

    return NextResponse.json(chat);
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ chatId: string }> }
) {
    const { userId } = await auth();
    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const { chatId } = await params;

    await connectDB();

    const chat = await Chat.findOneAndDelete({
        chatId,
        userId,
    });

    if (!chat) {
        return new NextResponse("Chat not found", { status: 404 });
    }

    return new NextResponse("Chat deleted", { status: 200 });
}
