import Link from "next/link";
import type { Category } from "@/lib/types";

export function CategoryStrip({ categories }: { categories: Category[] }) {
  return (
    <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2">
      {categories.map((c) => (
        <Link
          key={c.id}
          href={`/c/${c.slug}`}
          className="shrink-0 rounded-xl border bg-white px-3 py-2 text-sm font-medium hover:bg-neutral-50">
          {c.name}
        </Link>
      ))}
    </div>
  );
}
