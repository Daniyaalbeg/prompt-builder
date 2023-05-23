"use client";

import { usePromptStore } from "@/state/promptState";
import { Textarea } from "../ui/textarea";
import { ChangeEvent } from "react";

export const PromptSubject = () => {
  const subject = usePromptStore((store) => store.subject);
  const setSubject = usePromptStore((store) => store.setSubject);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSubject(e.target.value);
  };
  return (
    <Textarea
      placeholder="Type the subject of your prompt..."
      rows={5}
      value={subject}
      onChange={onChange}
    />
  );
};
