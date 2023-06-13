"use server";

import { auth } from "@/auth/lucia";
import { getDB } from "@/db";
import { prompt } from "@/db/schema";
import { and, eq } from "drizzle-orm";
// import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const updatePromptEmoji = async (promptId: string, emoji: string) => {
  const authHandler = auth.handleRequest({ cookies });
  const { user } = await authHandler.validateUser();

  if (!user) {
    throw new Error("User not found");
  }

  try {
    await getDB()
      .update(prompt)
      .set({
        emoji,
      })
      .where(and(eq(prompt.id, promptId), eq(prompt.userId, user.userId)));

    // revalidatePath(`/dashboard/prompt/${promptId}`);
  } catch (e) {
    console.log(e);
    throw new Error("Error occurred");
  }
};
