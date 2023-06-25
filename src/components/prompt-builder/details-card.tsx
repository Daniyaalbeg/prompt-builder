"use client";

import { TextCursor, Wrench } from "lucide-react";
import { ButtonWithTooltip } from "../buttons/button-tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PromptWithCategoryValues } from "@/db/schema";
import { useState } from "react";
import { PromptTextEditor } from "./prompt-text-edit";
import { Button } from "../ui/button";
import { CopyButton } from "../buttons/copy";
import { generatePrompt } from "../utils/generate-prompt";

export const Details = ({ prompt }: { prompt: PromptWithCategoryValues }) => {
  const [toggledPromptText, setToggledPromptText] = useState(false);

  const onPressTogglePromptText = () => {
    setToggledPromptText(!toggledPromptText);
  };

  return (
    <Card className="flex flex-row">
      <div className="flex-1">
        <CardHeader>
          <CardTitle>{prompt.title}</CardTitle>
          {/* <CardDescription>{generatePrompt(prompt)}</CardDescription> */}
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <div className="flex items-center justify-start gap-2">
              <CardTitle className="text-sm">Prompt</CardTitle>
              {prompt.generatedPrompt ? (
                <Button
                  onClick={() => setToggledPromptText((prev) => !prev)}
                  size="xs"
                  variant="outline"
                  className="w-24"
                >
                  <p>{toggledPromptText ? "Hide Variant" : "See Variant"}</p>
                </Button>
              ) : null}
            </div>
            <PromptTextEditor
              prompt={prompt}
              showOriginalPrompt={toggledPromptText}
              toggleOriginalPrompt={setToggledPromptText}
            />
          </div>
        </CardContent>
      </div>
      <div className="flex w-12 flex-col gap-2 py-6 pr-2">
        <ButtonWithTooltip
          icon={<Wrench size={16} />}
          tooltip="Edit Prompt Info"
        />
        <ButtonWithTooltip
          onClick={onPressTogglePromptText}
          icon={<TextCursor size={16} />}
          tooltip="Edit Prompt Text"
        />
        <CopyButton str={generatePrompt(prompt) || "No Prompt added yet."} />
      </div>
    </Card>
  );
};
