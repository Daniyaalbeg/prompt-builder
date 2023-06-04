"use client";

import { CategoryValue } from "@/db/schema";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEvent, useRef } from "react";

const updatePromptCategoryValue = async (
  id: string,
  categoryValueId: string,
  toDelete: boolean
) => {
  await fetch(`/api/prompt/${id}/categoryValue/${categoryValueId}`, {
    method: toDelete ? "DELETE" : "PUT",
    body: toDelete ? undefined : JSON.stringify({ weight: 1 }),
  });
};

export const CategoryOption = ({
  cv,
  promptId,
  isSelected,
}: {
  cv: CategoryValue;
  promptId: string;
  isSelected: boolean;
}) => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: () => updatePromptCategoryValue(promptId, cv.id, isSelected),
    onSuccess: router.refresh,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const onClick = () => {
    mutation.mutate();
  };

  const handleMouseMove = (event: MouseEvent<HTMLImageElement>) => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const posX = (event.clientX - containerRect.left) / containerRect.width;
    const posY = (event.clientY - containerRect.top) / containerRect.height;

    const rX = -(posX - 0.5) * 26 * 1.2;
    const rY = (posY - 0.5) * 26 * 1.2;

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

  return (
    <div
      className={cn("group mx-auto rounded-lg hover:cursor-pointer", {
        "hover:bg-secondary": !isSelected,
        "bg-primary": isSelected,
      })}
      style={styles}
    >
      <div className="flex flex-col gap-2 p-4" onClick={onClick}>
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
            className="min-w-[200px] transform rounded-md transition-all duration-1000" //group-hover:scale-105
            alt={`Image of the prompt ${cv.chunk}`}
            width={200}
            height={200}
          />
        </div>
        <div className="flex items-center justify-center">
          <div className="w-6" />
          <p
            className={cn("flex-grow text-center text-lg font-semibold", {
              "text-selected": isSelected,
            })}
          >
            {cv.chunk}
          </p>
          <div className="w-6">
            {isSelected ? <CheckCircle className="text-selected" /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};
