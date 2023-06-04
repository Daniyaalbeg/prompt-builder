import { auth } from "@/auth/lucia";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { db } from "@/db/db";
import { prompt } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const schema = z.object({ title: z.string() });

export async function PUT(
  request: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const authRequest = auth.handleRequest({ request, cookies });
  const { user } = await authRequest.validateUser();

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
      .set({ title: parsedData.data.title, updatedAt: new Date() })
      .where(and(eq(prompt.id, params.id), eq(prompt.userId, user.userId)));

    const path = request.nextUrl.searchParams.get("path") || "/";
    revalidatePath(`/dashboard/create/${params.id}`);

    return NextResponse.json({ revalidated: true }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json("Error occurred", { status: 500 });
  }
}
