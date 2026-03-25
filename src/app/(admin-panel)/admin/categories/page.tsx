"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin-api";
import type { AdminCategory, CollectionResponse } from "@/lib/admin-types";

export default function AdminCategoriesPage() {
  const [items, setItems] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    try {
      setError("");
      const res = await adminFetch<CollectionResponse<AdminCategory>>(
        "/api/admin/categories",
      );
      setItems(res.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load categories",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function handleDelete(id: number) {
    const confirmed = window.confirm("Delete this category?");
    if (!confirmed) return;

    try {
      await adminFetch(`/api/admin/categories/${id}`, { method: "DELETE" });

      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    }
  }

  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
        <Link
          href="/admin/categories/new"
          className="inline-flex items-center rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800">
          New category
        </Link>
      </div>

      <div className="rounded-sm border bg-white p-4 shadow-md">
        {loading ? (
          <div className="text-sm text-neutral-500">Loading...</div>
        ) : null}

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {!loading && !items.length ? (
          <div className="text-sm text-neutral-500">No categories yet.</div>
        ) : null}

        {!!items.length && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3 pr-4">Name</th>
                  <th className="py-3 pr-4">Slug</th>
                  <th className="py-3 pr-4">Order</th>
                  <th className="py-3 pr-4">Visible</th>
                  <th className="py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b last:border-0">
                    <td className="py-3 pr-4 font-medium">{item.name}</td>
                    <td className="py-3 pr-4 text-neutral-600">{item.slug}</td>
                    <td className="py-3 pr-4">{item.sort_order}</td>
                    <td className="py-3 pr-4">
                      {item.is_visible ? "Yes" : "No"}
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/categories/${item.id}/edit`}
                          className="rounded-lg border px-3 py-1.5 hover:bg-neutral-50">
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="rounded-lg border px-3 py-1.5 hover:bg-neutral-50">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
