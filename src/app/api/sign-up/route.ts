import { auth } from "@/auth/lucia";
import { z } from "zod";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const schema = z.object({ email: z.string().email(), password: z.string() });

export async function POST(request: Request) {
  try {
    const requestOrigin = request.headers.get("origin");
    const url = new URL(request.url);
    const isValidRequest = !!requestOrigin && requestOrigin === url.origin;
    if (!isValidRequest) {
      return new Response(null, {
        status: 403,
      });
    }

    const { email, password } = schema.parse(await request.json());

    try {
      const user = await auth.createUser({
        primaryKey: {
          providerId: "username",
          providerUserId: email,
          password,
        },
        attributes: {
          email,
          username: email,
        },
      });
      const session = await auth.createSession(user.userId);
      const authRequest = auth.handleRequest({ request, cookies });
      authRequest.setSession(session); // set session cookie
      // redirect on successful attempt
      new Response(null, {
        status: 302,
        headers: {
          location: "/dashboard",
        },
      });
    } catch (e) {
      // username already in use
      console.log(e);
      return NextResponse.json(
        { error: "Something went wrong 1" },
        {
          status: 400,
        }
      );
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Something went wrong 2" },
      {
        status: 400,
      }
    );
  }
}
