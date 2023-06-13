import { auth } from "@/auth/lucia";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { getDB } from "@/db";
import { promptCategoryValuesMapping } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const schema = z.object({
  weight: z.number(),
});

const editSchema = z.object({
  weight: z.number(),
  variation: z.string(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; cvId: string } }
) {
  const authHandler = auth.handleRequest({ cookies });
  const { user } = await authHandler.validateUser();
  const { id, cvId } = params;

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
    // console.log(await request.json());
    const schemaRes = editSchema.safeParse(await request.json());

    if (!schemaRes.success) {
      return NextResponse.json(null, {
        status: 400,
        statusText: "Error occurred",
      });
    }

    const res = await getDB()
      .update(promptCategoryValuesMapping)
      .set({
        weight: schemaRes.data.weight,
        variation: schemaRes.data.variation,
      })
      .where(
        and(
          eq(promptCategoryValuesMapping.promptId, id),
          eq(promptCategoryValuesMapping.categoryValueId, cvId)
        )
      );

    revalidatePath(`/dashboard/prompt/${id}`);

    return NextResponse.json({ ...res, revalidated: true });
  } catch (e) {
    console.log(e);
    return NextResponse.json(null, {
      status: 400,
      statusText: "Error occurred",
    });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; cvId: string } }
) {
  const authHandler = auth.handleRequest({ cookies });
  const { user } = await authHandler.validateUser();
  const { id, cvId } = params;

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
    const schemaRes = schema.safeParse(await request.json());

    if (!schemaRes.success) {
      return NextResponse.json(null, {
        status: 400,
        statusText: "Error occurred",
      });
    }

    const res = await getDB().insert(promptCategoryValuesMapping).values({
      promptId: id,
      weight: schemaRes.data.weight,
      categoryValueId: cvId,
    });

    revalidatePath(`/dashboard/prompt/${id}`);

    return NextResponse.json({ ...res, revalidated: true });
  } catch (e) {
    console.log(e);
    return NextResponse.json(null, {
      status: 400,
      statusText: "Error occurred",
    });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; cvId: string } }
) {
  const authHandler = auth.handleRequest({ cookies });
  const { user } = await authHandler.validateUser();
  const { id, cvId } = params;

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
    // if (!schemaRes.success) {
    //   return NextResponse.json(null, {
    //     status: 400,
    //     statusText: "Error occurred",
    //   });
    // }

    const res = await getDB()
      .delete(promptCategoryValuesMapping)
      .where(
        and(
          eq(promptCategoryValuesMapping.categoryValueId, cvId),
          eq(promptCategoryValuesMapping.promptId, id)
        )
      );

    revalidatePath(`/dashboard/prompt/${id}`);

    return NextResponse.json({
      ...res,
      revalidated: true,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: e },
      {
        status: 400,
        statusText: "Error occurred",
      }
    );
  }
}
