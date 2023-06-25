import { GeneratedPrompt } from "@/components/generated-prompt";
import { PromptSettings } from "@/components/menu/prompt-settings";
import { PromptBuilder } from "@/components/prompt-builder/prompt-builder";
import { getCategories } from "@/server-requests/categories";
import { getPromptWithCategories } from "@/server-requests/prompt";
import { redirect } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default async function NewPrompt({ params: { id } }: Props) {
  const [categories, promptData] = await Promise.all([
    getCategories(),
    getPromptWithCategories(id),
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
