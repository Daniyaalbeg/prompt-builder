import { GeneratedPrompt } from "@/components/generated-prompt";
import { PromptBuiler } from "@/components/prompt-builder/prompt-builder";
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
    .orderBy(category.sortOrder);

  return categories;
});

const NewPrompt = async ({ params: { id } }: Props) => {
  const [categories, prompts] = await Promise.all([
    getCategories(),
    db.select().from(prompt).where(eq(prompt.id, id)).limit(1),
  ]);

  return (
    <div className="flex h-full w-full flex-col p-4">
      <h2 className="text-lg font-bold"> Create a new prompt</h2>
      <h4> Follow the guideline below to create a new prompt </h4>
      <GeneratedPrompt prompt={prompts[0]} />
      <div className="flex w-full flex-grow items-center justify-center">
        {/* @ts-expect-error Async Server Component */}
        <PromptBuiler categories={categories} prompt={prompts[0]} />
      </div>
    </div>
  );
};

export default NewPrompt;
