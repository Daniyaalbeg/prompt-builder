"use client";

import { Category, CategoryValue, PromptWithCategoryValues } from "@/db/schema";
import { useQuery } from "@tanstack/react-query";
import { CategoryOption } from "./category-option";
import { useMemo, useState } from "react";
import { DetailsModal } from "./details-modal";
import { InfoTooltip } from "../info-tooltip";
import { InfoIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  prompt: PromptWithCategoryValues;
  category: Category;
  categoryValues: CategoryValue[];
};

const fetchCategoryValues = async (categoryId: string) => {
  const response = await fetch(`/api/category/${categoryId}/values`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  if (!response.body) {
    throw new Error("No response body");
  }

  return response.json() as Promise<CategoryValue[]>;
};

export default function CategorySelector({
  prompt,
  category,
  categoryValues,
}: Props) {
  const { data } = useQuery({
    queryKey: [category.id],
    queryFn: () => fetchCategoryValues(category.id),
    initialData: categoryValues,
  });
  const [selectedCategoryValue, setSelectedCategoryValue] = useState<
    CategoryValue | undefined
  >(undefined);
  const selectedCategoryValuesDict = useMemo(() => {
    return new Map(
      prompt.promptToCategoryValuesMapping.map((pcv) => {
        return [pcv.categoryValueId, pcv];
      })
    );
  }, [prompt]);

  const selectedCategoryOccurrences = useMemo(
    () =>
      categoryValues.reduce((total, current) => {
        if (selectedCategoryValuesDict.has(current.id)) return total + 1;
        return total;
      }, 0),
    [prompt]
  );

  const openCategoryValueModal = (cv: CategoryValue | undefined | boolean) => {
    if (typeof cv === "boolean") {
      setSelectedCategoryValue(undefined);
    } else {
      setSelectedCategoryValue(cv);
    }
  };

  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-start gap-8">
        <div className="flex items-center justify-center gap-2">
          <h3 className="text-lg font-semibold leading-none tracking-tight">
            Choose a {category.title} for your prompt?{" "}
          </h3>
          <InfoTooltip
            icon={
              <InfoIcon
                size={16}
                className={cn([
                  "text-muted-foreground",
                  ,
                  {
                    "text-red-500":
                      selectedCategoryOccurrences > category.suggestedValues,
                  },
                  {
                    "text-green-500":
                      selectedCategoryOccurrences === category.suggestedValues,
                  },
                ])}
              />
            }
            text={`We suggest using ${
              category.suggestedValues
            } ${category.title.toLowerCase()} ${
              category.suggestedValues === 1 ? "keyword" : "keywords"
            } for your prompt. Feel free to go crazy though.`}
          />
        </div>
        <div className="grid grid-flow-row gap-2 overflow-y-auto sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((cv) => {
            const isSelected = selectedCategoryValuesDict.has(cv.id);
            return (
              <CategoryOption
                key={`${cv.id}-${isSelected}`}
                title={
                  selectedCategoryValuesDict.get(cv.id)?.variation || cv.chunk
                }
                cv={cv}
                promptId={prompt.id}
                isSelected={isSelected}
                openCategoryValueModal={openCategoryValueModal}
              />
            );
          })}
        </div>
      </div>
      <DetailsModal
        key={selectedCategoryValue?.id}
        promptId={prompt.id}
        selectedCategoryValue={selectedCategoryValue}
        selectionDetails={
          selectedCategoryValue
            ? selectedCategoryValuesDict.get(selectedCategoryValue.id)
            : undefined
        }
        openCategoryValueModal={openCategoryValueModal}
      />
    </>
  );
}
