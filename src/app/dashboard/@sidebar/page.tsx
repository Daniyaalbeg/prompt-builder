import { NewPromptButton } from "@/components/buttons/new-prompts";
import { PromptSidebar } from "@/components/prompt-sidebar";
import { getPrompt } from "@/server-requests/prompt";
import { getUser } from "@/server-requests/user";

export default async function SideBar() {
  const user = await getUser();
  const prompts = await getPrompt(user.userId);

  return (
    <div className="h-full min-w-[16rem] border-r">
      <div className="flex h-full flex-col items-center justify-start py-2">
        <div className="w-full px-2">
          <NewPromptButton />
        </div>
        <div className="no-scrollbar flex w-full flex-col gap-1 overflow-y-auto px-2">
          {prompts.map((prompt) => {
            return (
              <PromptSidebar
                id={prompt.id}
                title={prompt.title}
                emoji={prompt.emoji}
                key={prompt.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
