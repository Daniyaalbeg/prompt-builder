import {
  Category,
  CategoryValue,
  PromptWithCategoryValues,
  categoryValue,
} from "@/db/schema";

import { PromptSubject } from "./subject";
import { getDB } from "@/db";
import { eq } from "drizzle-orm";
import CategorySelector from "./category-selector";
import { CategoryMapper } from "./category-mapper";

type Props = {
  categories: Category[];
  prompt: PromptWithCategoryValues;
};

export const PromptBuilder = async ({ categories, prompt }: Props) => {
  const promises = categories.map(async (c) => {
    const res = await getDB()
      .select()
      .from(categoryValue)
      .where(eq(categoryValue.categoryId, c.id));
    return res;
  });

  const allCategoryValues = (await Promise.all(promises)) as CategoryValue[][];

  return (
    <CategoryMapper>
      <PromptSubject prompt={prompt} />
      {allCategoryValues.map((acv, index) => {
        return (
          <CategorySelector
            key={categories[index].id}
            prompt={prompt}
            category={categories[index]}
            categoryValues={acv}
          />
        );
      })}
    </CategoryMapper>
  );
};
