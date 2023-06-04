"use client";

import { Category, CategoryValue, PromptWithCategoryValues } from "@/db/schema";
import { useQuery } from "@tanstack/react-query";
import { CategoryOption } from "./category-option";

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
    queryKey: [category.id, categoryValues],
    queryFn: () => fetchCategoryValues(category.id),
    initialData: categoryValues,
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8">
      <h3 className="text-lg font-semibold leading-none tracking-tight">
        Choose a {category.title} for your prompt?
      </h3>
      <div className="grid flex-1 grid-flow-row gap-2 overflow-y-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((cv) => {
          return (
            <CategoryOption
              key={cv.id}
              cv={cv}
              promptId={prompt.id}
              isSelected={
                !!prompt.promptToCategoryValuesMapping.find(
                  (c) => c.categoryValueId === cv.id
                )
              }
            />
          );
        })}
      </div>
    </div>
  );
}
