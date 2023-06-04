"use client";

import { Check, Copy } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  str: string;
}

export const CopyButton = ({ className, str, ...props }: ButtonProps) => {
  const [clicked, setClicked] = useState(false);

  const onClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 2000);
    if (str) navigator.clipboard.writeText(str);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className={cn("h-7 w-7 p-0", className)}
            onClick={onClick}
            {...props}
          >
            {clicked ? <Check size={16} /> : <Copy size={14} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">Copy Prompt</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
