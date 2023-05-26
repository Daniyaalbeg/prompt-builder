import { Category, CategoryValue } from "@/db/schema";

type Props = {
  category: Category;
  categoryValues: CategoryValue[];
};

export default function CategorySelector({ category, categoryValues }: Props) {
  return <div>{category.title}</div>;
}
