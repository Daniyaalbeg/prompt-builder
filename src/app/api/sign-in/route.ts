import { auth } from "@/auth/lucia";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";

const schema = z.object({ email: z.string(), password: z.string() });

export async function POST(request: NextRequest) {
  try {
    const { email, password } = schema.parse(await request.json());
    // const headers = new Headers();

    const authRequest = auth.handleRequest({ request, cookies });
    const key = await auth.useKey("username", email, password);

    const session = await auth.createSession(key.userId);
    authRequest.setSession(session);
    return new Response(null, {
      status: 302,
      headers: {
        location: "/dashboard",
      },
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Incorrect password", e: e },
      {
        status: 400,
      }
    );
  }
}
