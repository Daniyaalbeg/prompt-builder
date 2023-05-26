"use client";

import { usePromptStore } from "@/state/promptState";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Prompt } from "@/db/schema";

export const GeneratedPrompt = ({ prompt }: { prompt: Prompt }) => {
  // const { subject } = usePromptStore();

  return (
    <Card className="mt-4">
      <CardHeader>
        <h3 className="font-semibold leading-none tracking-tight">
          Generated Prompt
        </h3>
      </CardHeader>
      <CardContent>
        <p className="">{prompt.subject ? prompt.subject : "No Content"}</p>
      </CardContent>
    </Card>
  );
};
