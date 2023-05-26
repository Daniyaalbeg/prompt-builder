"use client";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

type Props = {};

export const NewPromptButton = ({}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const createNewPost = async () => {
    setIsLoading(true);
    const res = await fetch("/api/prompt", { method: "POST" });
    const { id } = await res.json();

    const url = `/dashboard/create/${id}`;
    router.push(url);
    router.refresh();
    setIsLoading(false);
  };

  return (
    <Button className="mb-2 w-full" onClick={createNewPost}>
      {isLoading ? (
        <Loader2 className="animate-spin" size={24} />
      ) : (
        <p>New Prompt</p>
      )}
    </Button>
  );
};
