import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { auth } from "@/auth/lucia";
import { db } from "@/db/db";
import { categoryValue } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authHandler = auth.handleRequest({ cookies });
  const { user } = await authHandler.validateUser();

  if (!user) {
    return new Response("Not Authorised", {
      status: 401,
      statusText: "Not Authorised",
      headers: {
        "Content-Type": "application/json",
        location: "/sign-in",
      },
    });
  }

  const { id } = params;

  try {
    const res = await db
      .select()
      .from(categoryValue)
      .where(eq(categoryValue.categoryId, id));

    return NextResponse.json(res);
  } catch (e) {
    console.log(e);
    return new Response("Error occurred", {
      status: 400,
      statusText: "Error occurred",
    });
  }
}
