// "use client";

import { Copy } from "lucide-react";
import { Button } from "./ui/button";
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
  // const { data } = useQuery({
  //   queryKey: ["prompt", prompt.id],
  //   queryFn: () => getPrompt(prompt.id),
  //   initialData: prompt,
  // });
  const generatedPrompt = prompt.subject
    ? generatePrompt(prompt)
    : "No Content";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle> Your Prompt </CardTitle>
          <CopyButton str={generatedPrompt} />
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
    prompt.subject,
    ...prompt.promptToCategoryValuesMapping.map((cv) =>
      cv.categoryValue.chunk.toLowerCase()
    ),
  ].join(", ");
};
