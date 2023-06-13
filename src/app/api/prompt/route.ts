import { auth } from "@/auth/lucia";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDB } from "@/db";
import { prompt } from "@/db/schema";
import { randomUUID } from "crypto";

export const POST = async (request: NextRequest) => {
  const authRequest = auth.handleRequest({ cookies });
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

  const res = await getDB().insert(prompt).values({
    id: uuid,
    subject: "",
    userId: user.userId,
    createdAt: new Date(),
    updatedAt: new Date(),
    generatedPrompt: "",
    title: "Untitled Prompt",
  });

  return NextResponse.json({ id: uuid });
};
