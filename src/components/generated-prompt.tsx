"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { PromptWithCategoryValues } from "@/db/schema";
import { CopyButton } from "./buttons/copy";
import { generatePrompt } from "./utils/generate-prompt";
// import { useQuery } from "@tanstack/react-query";

// const getPrompt = async (id: string) => {
//   const response = await fetch(`/api/prompt/${id}`);
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }

//   if (!response.body) {
//     throw new Error("No response body");
//   }

//   return response.json() as Promise<PromptWithCategoryValues>;
// };

export const GeneratedPrompt = ({
  prompt,
}: {
  prompt: PromptWithCategoryValues;
}) => {
  const generatedPrompt = generatePrompt(prompt);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle> Your Prompt </CardTitle>
          <CopyButton str={generatedPrompt || ""} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="">{generatedPrompt}</p>
      </CardContent>
    </Card>
  );
};
