import { CategoryForm } from "@/components/admin/CategoryForm";

export default function NewCategoryPage() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">New category</h1>
      <CategoryForm mode="create" />
    </main>
  );
}
