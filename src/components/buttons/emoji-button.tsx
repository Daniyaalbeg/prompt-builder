"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";
import { updatePromptEmoji } from "@/actions/emoji";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

export const EmojiButton = ({ emoji, id }: { emoji: string; id: string }) => {
  const { theme } = useTheme();
  let [isPending, startTransition] = useTransition();

  const onEmojiClick = (emoji: EmojiClickData) => {
    startTransition(() => updatePromptEmoji(id, emoji.emoji));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "mr-2 flex h-7 w-10 items-center justify-center rounded-md p-1 text-lg font-medium text-primary hover:bg-card-foreground",
            { "opacity-70": isPending }
          )}
        >
          {emoji}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <EmojiPicker
          onEmojiClick={onEmojiClick}
          width="100%"
          previewConfig={{ showPreview: false }}
          theme={theme === "dark" ? Theme.DARK : Theme.LIGHT}
          lazyLoadEmojis={true}
        />
      </PopoverContent>
    </Popover>
  );
};
