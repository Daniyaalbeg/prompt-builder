import { Category } from "@/db/schema";

type Props = {
  category: Category;
};

export default function CategorySelector({ category }: Props) {
  return <p>{category.title}</p>;
}
