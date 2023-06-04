"use client";

import { Textarea } from "../ui/textarea";
import { ChangeEvent, useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Prompt } from "@/db/schema";
import { useRouter } from "next/navigation";
import { debounce } from "@/lib/utils";

const updatePromptSubject = (data: { id: string; subject: string }) => {
  return fetch(`/api/prompt/${data.id}/subject`, {
    method: "PUT",
    body: JSON.stringify({ subject: data.subject }),
  });
};

export const PromptSubject = ({ prompt }: { prompt: Prompt }) => {
  const [subject, setSubject] = useState(prompt.subject);
  const router = useRouter();
  const mutation = useMutation({ mutationFn: updatePromptSubject });

  const debouncedMutate = useCallback(
    debounce((id: string, subject: string) => {
      mutation.mutate(
        { id: id, subject: subject },
        { onSuccess: router.refresh }
      );
    }),
    []
  );

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSubject(e.target.value);
    debouncedMutate(prompt.id, e.target.value);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8">
      <h3 className="text-xl font-semibold leading-none tracking-tight">
        What is the Subject of your prompt?
      </h3>
      <div className="relative w-4/6">
        <Textarea
          className="bottom-0 left-0 right-0 top-0 mx-auto"
          placeholder="Type the subject of your prompt..."
          rows={5}
          value={subject}
          onChange={onChange}
        />
        {mutation.isLoading ? (
          <Loader2 className="absolute right-2 top-2 animate-spin" />
        ) : null}
      </div>
    </div>
  );
};
