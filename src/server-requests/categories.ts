import { getDB } from "@/db";
import { Category, category } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cache } from "react";

export const getCategories = cache(async () => {
  const categories: Category[] = await getDB()
    .select()
    .from(category)
    .where(eq(category.aiId, "3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff"))
    .orderBy(category.sortOrder);

  return categories;
});
