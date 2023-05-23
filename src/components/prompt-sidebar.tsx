"use client";

import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Props = {
  id: string;
  title: string;
};

export const PromptSidebar = ({ id, title }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const onClick = () => {
    router.push(`/dashboard/create/${id}`);
  };

  const updateTitle = async () => {
    const newTitle = ref.current?.value;
    if (newTitle === title) {
      setEditable(false);
      return;
    }
    setLoading(true);
    await fetch(`/api/prompt/title/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title: newTitle || "Untitled" }),
    });
    setEditable(false);
    setLoading(false);
    router.refresh();
  };

  useEffect(() => {
    if (editable) {
      ref.current?.focus();
    }
  }, [editable]);

  return (
    <button
      onClick={onClick}
      onMouseLeave={() => setEditable(false)}
      className={cn(
        "inline-flex h-10 w-full flex-shrink-0 items-center justify-start rounded-md py-2 pl-4 pr-2 text-sm font-medium text-primary ring-offset-background transition-colors hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        { "bg-primary/80 text-primary-foreground": params && params.id === id },
        { "hover:bg-primary/40": params && params.id !== id }
      )}
    >
      {editable ? (
        <>
          <input
            ref={ref}
            type="text"
            defaultValue={title}
            className={cn("rounded-sm bg-primary/10", {
              "bg-primary/80 text-primary-foreground":
                params && params.id === id,
            })}
          />
          <button
            className="ml-auto mr-0 flex h-7 w-7 items-center justify-center rounded-md hover:bg-primary/90"
            onClick={updateTitle}
          >
            {loading ? (
              <Loader2 className="animate-spin" size={14} />
            ) : (
              <Check size={18} />
            )}
          </button>
        </>
      ) : (
        <p
          onDoubleClick={() => setEditable(true)}
          className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-left"
        >
          {title || "Untitled"}
        </p>
      )}
    </button>
  );
};
