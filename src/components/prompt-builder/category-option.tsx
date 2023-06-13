// Is Client

import {
  addCategoryToPrompt,
  deleteCategoryFromPrompt,
} from "@/actions/prompt";
import { CategoryValue } from "@/db/schema";
import { cn } from "@/lib/utils";
// import { useMutation } from "@tanstack/react-query";
import { Settings2 } from "lucide-react";
import Image from "next/image";
// import { useRouter } from "next/navigation";
import { MouseEvent, useRef, useState } from "react";
import { capitalise } from "../utils/capitalise-value";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

// const updatePromptCategoryValue = async (
//   id: string,
//   categoryValueId: string,
//   toDelete: boolean
// ) => {
//   await fetch(`/api/prompt/${id}/categoryValue/${categoryValueId}`, {
//     method: toDelete ? "DELETE" : "PUT",
//     body: toDelete ? undefined : JSON.stringify({ weight: 1 }),
//   });
// };

export const CategoryOption = ({
  cv,
  promptId,
  isSelected,
  openCategoryValueModal,
  title,
}: {
  cv: CategoryValue;
  promptId: string;
  isSelected: boolean;
  openCategoryValueModal: (cv: CategoryValue | undefined) => void;
  title: string;
}) => {
  const [isSelectedLocal, setIsSelectedLocal] = useState(isSelected);
  const [isFetching, setIsFetching] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const onClick = () => {
    setIsSelectedLocal((prev) => !prev);

    if (isFetching) {
      return;
    }

    if (isSelectedLocal) {
      deleteCategoryFromPrompt(promptId, cv.id);
    } else {
      addCategoryToPrompt(promptId, cv.id);
    }
    setIsFetching(true);
  };

  const handleMouseMove = (event: MouseEvent<HTMLImageElement>) => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const posX = (event.clientX - containerRect.left) / containerRect.width;
    const posY = (event.clientY - containerRect.top) / containerRect.height;

    const rX = -(posX - 0.5) * 26 * 0.8;
    const rY = (posY - 0.5) * 26 * 0.8;

    containerRef.current.style.setProperty("--x", `${rX}deg`);
    containerRef.current.style.setProperty("--y", `${rY}deg`);
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty("--x", `0deg`);
    containerRef.current.style.setProperty("--y", `0deg`);
  };

  const styles = {
    "--x": "0deg",
    "--y": "0deg",
  } as React.CSSProperties;

  const openDetails = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    // Prevent the onClick handler from running if checkmark is pressed
    e.stopPropagation();
    openCategoryValueModal(cv);
  };

  const isVariation = cv.chunk !== title;

  return (
    <TooltipProvider delayDuration={1000}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "group relative mx-auto max-h-min hover:cursor-pointer"
            )}
            style={styles}
            onClick={onClick}
          >
            <div
              className={cn([
                "absolute bottom-0 left-0 right-0 top-0 scale-90 rounded-lg opacity-75 transition-all duration-300 ease-in-out",
                {
                  "group-hover:scale-100 group-hover:bg-secondaryHover":
                    !isSelectedLocal,
                  "scale-100 bg-primary opacity-100": isSelectedLocal,
                },
              ])}
            />
            <div className="relative z-20 flex flex-col gap-2 p-4">
              <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transition: "transform 0.1s ease-out",
                  transform: `rotateX(var(--y)) rotateY(var(--x))`,
                }}
              >
                <Image
                  src={cv.imageUrl}
                  className={cn([
                    "min-w-[200px] transform rounded-md transition-all duration-300",
                    { "scale-[1.05]": isSelectedLocal },
                  ])}
                  alt={`Image of the prompt ${cv.chunk}`}
                  width={200}
                  height={200}
                />
              </div>
              <div className="flex items-center justify-center">
                <div className="w-8" />
                <p
                  className={cn(
                    "z-10 flex-grow text-center text-lg font-semibold",
                    {
                      "text-selected": isSelectedLocal,
                    }
                  )}
                >
                  {capitalise(title)}
                  {isVariation ? (
                    <span className="text-sm font-normal"> (v) </span>
                  ) : null}
                </p>
                <div className="grid w-8 items-center">
                  {isSelectedLocal ? (
                    <Button
                      className="z-10 h-8 w-8 p-0 text-selected"
                      variant="ghost"
                      onClick={openDetails}
                    >
                      <Settings2 className="bg-red" size={18} />
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{capitalise(cv.description) || "No description yet"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
