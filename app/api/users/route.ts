import { connectDB } from "@/lib/mongoose";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  await connectDB();

  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses[0]?.emailAddress;
  const name = [clerkUser?.firstName, clerkUser?.lastName].filter(Boolean).join(" ");

  // UPSERT: Update if exists, Insert if not
  const user = await User.findOneAndUpdate(
    { clerkUserId: userId },
    {
      $set: {
        clerkUserId: userId,
        email: email,
        name: name,
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return NextResponse.json({ user });
}