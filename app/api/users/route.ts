import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  let user = await db.collection("users").findOne({
    clerkUserId: userId,
  });

  if (!user) {
    const newUser = {
      clerkUserId: userId,
      createdAt: new Date(),
    };

    const result = await db.collection("users").insertOne(newUser);

    user = {
      _id: result.insertedId,
      ...newUser,
    };
  }

  // 5. RETURN USER
  return NextResponse.json({ user });
}