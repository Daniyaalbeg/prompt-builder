import { PromptWithCategoryValues } from "@/db/schema";

export const generatePrompt = (prompt: PromptWithCategoryValues) => {
  return [
    prompt.subject.trim(),
    ...prompt.promptToCategoryValuesMapping.map((cv) => {
      const text = cv.variation ? cv.variation : cv.categoryValue.chunk;
      if (cv.weight > 1) {
        switch (cv.weight) {
          case 1.5:
            return `[${text.toLowerCase()}]`;
          case 2:
            return `[[${text.toLowerCase()}]]`;
          default:
            return `${text.toLowerCase()}`;
        }
      }
      return text;
    }),
  ].join(", ");
};
