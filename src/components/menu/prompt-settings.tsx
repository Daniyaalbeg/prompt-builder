"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Settings, Trash } from "lucide-react";
import { useTransition } from "react";
import { deletePrompt } from "@/server-requests/prompt";

export const PromptSettings = ({ promptId }: { promptId: string }) => {
  const [isPending, startTransition] = useTransition();

  const onDelete = () => {
    console.log("asdasd");
    const confirmDelete = confirm("Are you sure?");
    if (confirmDelete) {
      startTransition(() => deletePrompt(promptId));
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={"h-7 w-7 p-0"}>
          <Settings size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2" onClick={onDelete}>
          <Trash size={16} color="red" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
