"use client";

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  tooltip: string;
}

export const ButtonWithTooltip = ({
  className,
  icon,
  tooltip,
  ...props
}: ButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className={cn("h-7 w-7 p-0", className)}
            {...props}
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
