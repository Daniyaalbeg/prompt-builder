"use server";
import { auth } from "@/auth/lucia";
import { getDB } from "@/db";
import { promptCategoryValuesMapping } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// TODO add input validation
export const addCategoryToPrompt = async (
  promptId: string,
  categoryId: string,
  weight: number = 1
) => {
  const authHandler = auth.handleRequest({ cookies });
  const { user } = await authHandler.validateUser();

  if (!user) {
    throw new Error("User not found");
  }

  try {
    await getDB().insert(promptCategoryValuesMapping).values({
      promptId,
      weight,
      categoryValueId: categoryId,
    });

    revalidatePath(`/dashboard/prompt/${promptId}`);
  } catch (e) {
    console.log(e);
    throw new Error("Error occurred");
  }
};

export const deleteCategoryFromPrompt = async (
  promptId: string,
  categoryId: string,
  weight: number = 1
) => {
  const authHandler = auth.handleRequest({ cookies });
  const { user } = await authHandler.validateUser();

  if (!user) {
    throw new Error("User not found");
  }

  try {
    await getDB()
      .delete(promptCategoryValuesMapping)
      .where(
        and(
          eq(promptCategoryValuesMapping.categoryValueId, categoryId),
          eq(promptCategoryValuesMapping.promptId, promptId)
        )
      );

    revalidatePath(`/dashboard/prompt/${promptId}`);
  } catch (e) {
    console.log(e);
    throw new Error("Error occurred");
  }
};
