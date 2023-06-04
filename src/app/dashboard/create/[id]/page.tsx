import { GeneratedPrompt } from "@/components/generated-prompt";
import { PromptBuilder } from "@/components/prompt-builder/prompt-builder";
import { db } from "@/db/db";
import { Category, category, prompt } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cache } from "react";

type Props = {
  params: {
    id: string;
  };
};

const getCategories = cache(async () => {
  const categories: Category[] = await db
    .select()
    .from(category)
    .where(eq(category.aiId, "3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff"))
    .orderBy(category.sortOrder);

  return categories;
});

const NewPrompt = async ({ params: { id } }: Props) => {
  const [categories, promptData] = await Promise.all([
    getCategories(),
    db.query.prompt.findFirst({
      where: eq(prompt.id, id),
      with: {
        promptToCategoryValuesMapping: { with: { categoryValue: true } },
      },
    }),
  ]);

  if (!promptData) return <p> No Prompt found </p>;

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col gap-4 p-4">
      <h2 className="text-lg font-bold"> Create a new prompt</h2>
      <h4> Follow the guideline below to create a new prompt </h4>
      <GeneratedPrompt prompt={promptData} />
      <PromptBuilder categories={categories} prompt={promptData} />
    </div>
  );
};

export default NewPrompt;
