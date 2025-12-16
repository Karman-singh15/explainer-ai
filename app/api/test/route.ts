import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    await client.db().admin().ping();
    return NextResponse.json({ status: "connected" });
  } catch (error) {
    return NextResponse.json({ error: "connection failed" });
  }
}
