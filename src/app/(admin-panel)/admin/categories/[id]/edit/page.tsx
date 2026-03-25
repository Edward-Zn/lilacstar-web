"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin-api";
import type { AdminCategory, SingleResponse } from "@/lib/admin-types";
import { CategoryForm } from "@/components/admin/CategoryForm";

export default function EditCategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const [item, setItem] = useState<AdminCategory | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await adminFetch<SingleResponse<AdminCategory>>(
          `/api/admin/categories/${params.id}`,
        );
        setItem(res.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load category",
        );
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, [params.id]);

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">Edit category</h1>

      {loading ? (
        <div className="text-sm text-neutral-500">Loading...</div>
      ) : null}

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {item ? (
        <CategoryForm
          mode="edit"
          initial={{
            id: item.id,
            name: item.name,
            slug: item.slug,
            sort_order: item.sort_order,
            is_visible: item.is_visible,
          }}
        />
      ) : null}
    </main>
  );
}
