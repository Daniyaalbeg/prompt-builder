import { GeneratedPrompt } from "@/components/generated-prompt";
import { PromptSettings } from "@/components/menu/prompt-settings";
import { PromptBuilder } from "@/components/prompt-builder/prompt-builder";
import { getDB } from "@/db";
import { Category, category, prompt } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { cache } from "react";

type Props = {
  params: {
    id: string;
  };
};

const getCategories = cache(async () => {
  const categories: Category[] = await getDB()
    .select()
    .from(category)
    .where(eq(category.aiId, "3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff"))
    .orderBy(category.sortOrder);

  return categories;
});

const getPrompt = cache(async (id: string) => {
  const promptData = await getDB().query.prompt.findFirst({
    where: eq(prompt.id, id),
    with: {
      promptToCategoryValuesMapping: { with: { categoryValue: true } },
    },
  });
  return promptData;
});

export default async function NewPrompt({ params: { id } }: Props) {
  const [categories, promptData] = await Promise.all([
    getCategories(),
    getPrompt(id),
  ]);

  if (!promptData) redirect("/dashboard");

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col gap-4 p-4">
      <div className="flex">
        <div className="flex-grow">
          <h2 className="text-lg font-bold"> Create a new prompt</h2>
          <h4> Follow the guideline below to create a new prompt </h4>
        </div>
        <div>
          <PromptSettings promptId={promptData.id} />
        </div>
      </div>
      <GeneratedPrompt prompt={promptData} />
      <PromptBuilder categories={categories} prompt={promptData} />
    </div>
  );
}
