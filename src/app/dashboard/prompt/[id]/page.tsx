import { ButtonWithTooltip } from "@/components/buttons/button-tooltip";
import { Details } from "@/components/prompt-builder/details-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generatePrompt } from "@/components/utils/generate-prompt";
import { PromptWithCategoryValues } from "@/db/schema";
import { getPromptWithCategories } from "@/server-requests/prompt";
import { TextCursor, Wrench } from "lucide-react";

type Props = {
  params: {
    id: string;
  };
};

export default async function PromptHome({ params: { id } }: Props) {
  const prompt = await getPromptWithCategories(id);

  if (!prompt) return <p> Prompt not found</p>;

  return (
    <div className="grid flex-grow grid-rows-2 gap-4 p-4">
      <Details prompt={prompt} />
      <Image prompt={prompt} />
    </div>
  );
}

const Image = ({ prompt }: { prompt: PromptWithCategoryValues }) => {
  return (
    <Card className="flex flex-row">
      <div className="flex-1">
        <CardHeader>
          <CardTitle>Prompt Image</CardTitle>
          <CardDescription>Upload your prompts image</CardDescription>
        </CardHeader>
        <CardContent>
          <img src="https://picsum.photos/205" alt="TESTING" />
        </CardContent>
      </div>
      <div className="w-12 py-6 pr-2">asd</div>
    </Card>
  );
};
