import { PromptWithCategoryValues } from "@/db/schema";
import { generatePrompt } from "../utils/generate-prompt";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Loader2, RotateCcw } from "lucide-react";
import { ChangeEvent, useCallback, useState } from "react";
import { cn, debounce } from "@/lib/utils";
import { ButtonWithTooltip } from "../buttons/button-tooltip";
import { motion } from "framer-motion";

type Props = {
  showOriginalPrompt: boolean;
  prompt: PromptWithCategoryValues;
  toggleOriginalPrompt: (value: boolean) => void;
};

const updatePromptText = ({ id, text }: { id: string; text: string }) => {
  return fetch(`/api/prompt/${id}/variation`, {
    method: "POST",
    body: JSON.stringify({ text }),
  });
};

export const PromptTextEditor = ({
  prompt,
  showOriginalPrompt,
  toggleOriginalPrompt,
}: Props) => {
  const [text, setText] = useState(
    prompt.generatedPrompt || generatePrompt(prompt)
  );
  const router = useRouter();
  const { mutate, isLoading } = useMutation({
    mutationFn: updatePromptText,
    onSuccess: router.refresh,
  });
  const { mutate: undoMutate, isLoading: undoIsLoading } = useMutation({
    mutationFn: updatePromptText,
    onSuccess: () => {
      toggleOriginalPrompt(false);
      router.refresh();
    },
  });

  const callMutation = useCallback(
    debounce(
      (editedText: string) => mutate({ id: prompt.id, text: editedText }),
      1000
    ),
    [prompt]
  );

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    callMutation(e.target.value);
  };

  const resetEditedPrompt = () => {
    // TODO add confirmation modal
    setText(generatePrompt(prompt));
    undoMutate({ id: prompt.id, text: "" });
  };

  if (showOriginalPrompt) {
    return (
      <div className="relative">
        {isLoading ? (
          <Loader2 className="absolute bottom-2 right-2 animate-spin" />
        ) : null}
        <ButtonWithTooltip
          onClick={resetEditedPrompt}
          className="absolute right-2 top-2"
          icon={
            <RotateCcw
              size={16}
              className={cn("-scale-100", {
                "animate-spin": undoIsLoading,
              })}
            />
          }
          tooltip="Reset Edited Prompt Text"
        />
        <Textarea
          className="h-40 w-full"
          defaultValue={text}
          value={text}
          onChange={onChange}
        />
      </div>
    );
  }

  return (
    <p onDoubleClick={() => toggleOriginalPrompt(true)}>
      {generatePrompt(prompt) || "No prompt added yet."}
    </p>
  );
};
