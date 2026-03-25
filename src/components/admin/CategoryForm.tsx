"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { adminFetch } from "@/lib/admin-api";
import type { AdminCategory, SingleResponse } from "@/lib/admin-types";

type Props = {
  initial?: {
    id?: number;
    name: string;
    slug: string;
    sort_order: number;
    is_visible: boolean;
  };
  mode: "create" | "edit";
};

export function CategoryForm({ initial, mode }: Props) {
  const router = useRouter();

  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [sortOrder, setSortOrder] = useState(String(initial?.sort_order ?? 0));
  const [isVisible, setIsVisible] = useState(initial?.is_visible ?? true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      name,
      slug: slug || null,
      sort_order: Number(sortOrder) || 0,
      is_visible: isVisible,
    };

    try {
      if (mode === "create") {
        await adminFetch<SingleResponse<AdminCategory>>(
          "/api/admin/categories",
          { method: "POST", body: JSON.stringify(payload) },
        );
      } else {
        await adminFetch<SingleResponse<AdminCategory>>(
          `/api/admin/categories/${initial?.id}`,
          { method: "PUT", body: JSON.stringify(payload) },
        );
      }

      router.push("/admin/categories");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-sm border bg-white p-4 shadow-md">
      <div>
        <label className="mb-1 block text-sm font-medium">Name</label>
        <input
          className="w-full rounded-xl border px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Cosmetics"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Slug</label>
        <input
          className="w-full rounded-xl border px-3 py-2"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="cosmetics"
        />
        <div className="mt-1 text-xs text-neutral-500">
          Leave empty to generate automatically from name.
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Sort order</label>
        <input
          type="number"
          className="w-full rounded-xl border px-3 py-2"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={isVisible}
          onChange={(e) => setIsVisible(e.target.checked)}
        />
        Visible
      </label>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800 disabled:opacity-60">
          {loading ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/categories")}
          className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-neutral-50">
          Cancel
        </button>
      </div>
    </form>
  );
}

