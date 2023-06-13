"use client";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export const NewPromptButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const createNewPost = async () => {
    setIsLoading(true);
    const res = await fetch("/api/prompt", { method: "POST" });
    const { id } = await res.json();
    setIsLoading(false);
    const url = `/dashboard/prompt/${id}/`;
    router.refresh();
    router.push(url);
  };

  return (
    <Button className="mb-2 w-full" onClick={createNewPost} variant="outline">
      {isLoading ? (
        <Loader2 className="animate-spin" size={24} />
      ) : (
        <p>New Prompt</p>
      )}
    </Button>
  );
};
