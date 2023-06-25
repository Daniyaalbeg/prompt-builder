"use client";

import { Prompt } from "@/db/schema";
import { AnimatePresence } from "framer-motion";
import { SidebarPromptItem } from "./sidebar-prompt-item";

type Props = {
  prompts: Prompt[];
};

export const PromptSidebarItems = ({ prompts }: Props) => {
  return (
    <AnimatePresence>
      {prompts.map((prompt) => {
        return (
          <SidebarPromptItem
            id={prompt.id}
            title={prompt.title}
            emoji={prompt.emoji}
            key={prompt.id}
          />
        );
      })}
    </AnimatePresence>
  );
};
