import { GeneratedPrompt } from "@/components/generated-prompt";
import { PromptBuiler } from "@/components/prompt-builder/prompt-builder";
import { db } from "@/db/db";
import { Category, category } from "@/db/schema";

type Props = {
  params: {
    id: string;
  };
};

const NewPrompt = async ({ params: { id } }: Props) => {
  const categories: Category[] = await db
    .select()
    .from(category)
    .orderBy(category.sortOrder);

  return (
    <div className="flex h-full w-full flex-col p-4">
      <h2 className="text-lg font-bold"> Create a new prompt</h2>
      <h4> Follow the guideline below to create a new prompt </h4>
      <GeneratedPrompt />
      <div className="flex w-full flex-grow items-center justify-center">
        <PromptBuiler categories={categories} />
      </div>
    </div>
  );
};

export default NewPrompt;
