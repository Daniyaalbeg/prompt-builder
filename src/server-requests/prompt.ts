"use server";
import "server-only";
import { getDB } from "@/db";
import { prompt } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";
import { auth } from "@/auth/lucia";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const getPrompt = async (userId: string) => {
  return await getDB()
    .select()
    .from(prompt)
    .where(eq(prompt.userId, userId))
    .orderBy(desc(prompt.updatedAt));
};

export const deletePrompt = async (promptId: string) => {
  const authHandler = auth.handleRequest({ cookies });
  const { user } = await authHandler.validateUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  try {
    const res = await getDB()
      .delete(prompt)
      .where(and(eq(prompt.id, promptId), eq(prompt.userId, user?.userId)));
    revalidatePath("/dashboard");
  } catch (e) {
    console.log(e);
  }
};

export const getPromptWithCategories = cache(async (id: string) => {
  const promptData = await getDB().query.prompt.findFirst({
    where: eq(prompt.id, id),
    with: {
      promptToCategoryValuesMapping: { with: { categoryValue: true } },
    },
  });
  return promptData;
});
