import { cn } from "@/lib/utils";
import { Check, Edit3, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { EmojiButton } from "./buttons/emoji-button";
import Link from "next/link";
import { ContextMenu } from "@radix-ui/react-context-menu";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";

type Props = {
  id: string;
  title: string;
  emoji: string;
};

const updateTitle = ({ id, title }: { id: string; title: string }) => {
  return fetch(`/api/prompt/${id}/title`, {
    method: "PUT",
    body: JSON.stringify({ title: title ?? "Untitled" }),
  });
};

export const SidebarPromptItem = ({ id, title, emoji }: Props) => {
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  const [optimisticTitle, setText] = useState(title);
  const [editable, setEditable] = useState(false);
  const params = useParams();
  const { mutate, isLoading } = useMutation({
    mutationFn: updateTitle,
    onSuccess: () => {
      router.refresh();
      setEditable(false);
    },
  });

  useEffect(() => {
    if (editable) {
      ref.current?.focus();
    }
  }, [editable]);

  const editText = () => {
    if (title !== optimisticTitle) {
      mutate({ id, title: optimisticTitle });
    }
  };

  return (
    <motion.div layout exit={{ scale: 0.2, opacity: 0 }} key={id}>
      <Link
        href={`/dashboard/prompt/${id}`}
        onDoubleClick={() => setEditable(true)}
        className={cn(
          "inline-flex h-10 w-full flex-shrink-0 items-center justify-start gap-2 rounded-md py-2 pl-2 pr-2 text-sm font-medium text-primary ring-offset-background hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-primary/80 text-primary-foreground": params && params.id === id,
          },
          { "hover:bg-primary/80": params && params.id !== id }
        )}
      >
        {editable ? (
          <>
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  editText();
                }
              }}
              onBlur={(e) => {
                if (e.relatedTarget?.id === "check") return;
                setEditable(false);
              }}
              ref={ref}
              type="text"
              onChange={(e) => setText(e.target.value)}
              defaultValue={optimisticTitle}
              className={cn("ml-10 w-36 rounded-sm bg-primary/10", {
                "bg-primary/80 text-primary-foreground":
                  params && params.id === id,
              })}
            />
            <button
              id="check"
              className=" mr-0 flex h-7 w-7 items-center justify-center rounded-md hover:bg-primary/90"
              onClick={(e) => {
                editText();
                e.stopPropagation();
              }}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={14} />
              ) : (
                <Check size={18} />
              )}
            </button>
          </>
        ) : (
          <ContextMenu>
            <ContextMenuTrigger>
              <div className="flex h-full w-full items-center justify-start">
                <EmojiButton emoji={emoji} id={id} />
                <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-left">
                  {optimisticTitle || "Untitled"}
                </p>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64">
              <ContextMenuItem>
                <button
                  onClick={() => setEditable(true)}
                  className="flex items-center gap-2"
                >
                  <Edit3 size={16} />
                  <p>Edit Title</p>
                </button>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        )}
      </Link>
    </motion.div>
  );
};
