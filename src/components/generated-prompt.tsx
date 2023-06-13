"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { PromptWithCategoryValues } from "@/db/schema";
import { CopyButton } from "./buttons/copy";
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

const generatePrompt = (prompt: PromptWithCategoryValues) => {
  return [
    prompt.subject.trim(),
    ...prompt.promptToCategoryValuesMapping.map((cv) => {
      const text = cv.variation ? cv.variation : cv.categoryValue.chunk;
      if (cv.weight > 1) {
        switch (cv.weight) {
          case 1.5:
            return `[${text.toLowerCase()}]`;
          case 2:
            return `[[${text.toLowerCase()}]]`;
          default:
            return `${text.toLowerCase()}`;
        }
      }
      return cv.categoryValue.chunk.toLowerCase();
    }),
  ].join(", ");
};
