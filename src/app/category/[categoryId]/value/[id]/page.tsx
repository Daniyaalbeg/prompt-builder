export default function CategoryValue({
  params: { categoryId, id },
}: {
  params: { categoryId: string; id: string };
}) {
  console.log("asdasdad", categoryId, id);
  return (
    <div>
      <h1>Category Value</h1>
    </div>
  );
}
