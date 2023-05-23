import { auth } from "@/auth/lucia";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/db/db";
import { prompt } from "@/db/schema";
import { randomUUID } from "crypto";

export const POST = async (request: NextRequest) => {
  const authRequest = auth.handleRequest({ request, cookies });
  const { user } = await authRequest.validateUser();

  if (!user) {
    return new Response("Not Authorised", {
      status: 302,
      headers: {
        location: "/sign-in",
      },
    });
  }

  const uuid = randomUUID();

  const res = await db.insert(prompt).values({
    id: uuid,
    subject: "",
    userId: user.userId,
    generatedPrompt: "",
    title: "Untitled Prompt",
  });

  return NextResponse.json({ id: uuid });
};
