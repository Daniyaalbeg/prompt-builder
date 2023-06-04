import { auth } from "@/auth/lucia";
import { db } from "@/db/db";
import { prompt } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

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

  try {
    const { id } = params;

    const res = await db.query.prompt.findFirst({
      where: eq(prompt.id, id),
      with: {
        promptToCategoryValuesMapping: { with: { categoryValue: true } },
      },
    });

    return NextResponse.json(res || []);
  } catch (e) {
    console.log(e);
    return NextResponse.json(null, {
      status: 400,
      statusText: "Error occurred",
    });
  }
}
