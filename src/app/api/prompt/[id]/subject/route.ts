import { auth } from "@/auth/lucia";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { db } from "@/db/db";
import { prompt } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const schema = z.object({ subject: z.string() });

export async function PUT(
  request: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
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

  if (!request.body)
    return NextResponse.json({ error: "No body provided" }, { status: 400 });

  try {
    const parsedData = schema.safeParse(await request.json());
    if (!parsedData.success) {
      console.log(parsedData.error);
      return NextResponse.json("Not valid data", { status: 400 });
    }

    const res = await db
      .update(prompt)
      .set({
        subject: parsedData.data.subject,
      })
      .where(and(eq(prompt.userId, user.userId), eq(prompt.id, params.id)));

    const path = request.nextUrl.searchParams.get("path") || "/";
    revalidatePath(path);

    if (res.rowsAffected !== 1) {
      // Wrong insert?
      return NextResponse.json(
        { revalidated: true },
        {
          status: 400,
          statusText: "Error occurred",
        }
      );
    }

    return NextResponse.json({});
  } catch (e) {
    return NextResponse.json(null, {
      status: 400,
      statusText: "Error occurred",
    });
  }
}
