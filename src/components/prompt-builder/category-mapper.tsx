"use client";

import { Children, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

export const CategoryMapper = ({ children }: Props) => {
  const [childNumber, setChildNumber] = useState(0);
  const childrenCount = Children.count(children);
  const arrayChildren = Children.toArray(children);

  const next = () => {
    if (childNumber < childrenCount) {
      setChildNumber((c) => c + 1);
    }
  };

  const previous = () => {
    if (childNumber > 0) {
      setChildNumber((c) => c - 1);
    }
  };

  return (
    <div className="flex w-full flex-1 flex-col gap-4 overflow-hidden">
      <div className="min-h-0 w-full flex-1">{arrayChildren[childNumber]}</div>
      <div className="flex shrink-0 items-center justify-center gap-2">
        <Button
          onClick={previous}
          className={cn(
            "h-10 w-10 rounded-full p-3 transition-opacity duration-300 ease-in-out",
            {
              "opacity-0": childNumber === 0,
              "opacity-100": childNumber !== 0,
            }
          )}
          // disabled={childNumber === 0}
          variant="secondary"
        >
          <ArrowLeft />
        </Button>
        <Button
          className="h-10 w-10 rounded-full p-3"
          disabled={childrenCount - 1 === childNumber}
          onClick={next}
          variant="default"
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};
