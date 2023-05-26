import { Category, Prompt, categoryValue } from "@/db/schema";

import { PromptSubject } from "./subject";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import CategorySelector from "./category-selector";
import { CategoryMapper } from "./category-mapper";

type Props = {
  categories: Category[];
  prompt: Prompt;
};

export const PromptBuiler = async ({ categories, prompt }: Props) => {
  const promises = categories.map(async (c) => {
    const res = await db
      .select()
      .from(categoryValue)
      .where(eq(categoryValue.categoryId, c.id));
    return res;
  });

  const allCategoryValues = await Promise.all(promises);

  return (
    <>
      <CategoryMapper>
        <PromptSubject prompt={prompt} />
        {allCategoryValues.map((acv, index) => {
          return (
            <CategorySelector
              key={categories[index].id}
              category={categories[index]}
              categoryValues={acv}
            />
          );
        })}
      </CategoryMapper>
    </>
  );
};
