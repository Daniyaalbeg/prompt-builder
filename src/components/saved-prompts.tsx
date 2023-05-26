import { db } from "@/db/db";
import { Prompt } from "@/db/schema";
import { prompt } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { User } from "lucia-auth";
import { NewPromptButton } from "@/components/buttons/new-prompts";
import { PromptSidebar } from "./prompt-sidebar";

type Props = {
  user: User;
};

export const SavedPrompts = async ({ user }: Props) => {
  const prompts: Prompt[] = await db
    .select()
    .from(prompt)
    .where(eq(prompt.userId, user.userId))
    .orderBy(desc(prompt.updatedAt));

  return (
    <div className="flex h-full flex-col items-center justify-start py-2">
      <div className="w-full px-2">
        <NewPromptButton />
      </div>
      <div className="no-scrollbar flex w-full flex-col gap-1 overflow-y-scroll px-2">
        {prompts.map((prompt) => {
          return (
            <PromptSidebar
              id={prompt.id}
              title={prompt.title}
              key={prompt.id}
            />
          );
        })}
      </div>
      {/* {prompts.length === 0 ? <p>No Prompts</p> : null} */}
    </div>
  );
};
