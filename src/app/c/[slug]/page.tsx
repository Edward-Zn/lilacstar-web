import Link from "next/link";
import { api } from "@/lib/api";
import { ProductTileCard } from "@/components/ProductTile";

const sorts = [
  { key: "newest", label: "Newest" },
  { key: "price_asc", label: "Price ↑" },
  { key: "price_desc", label: "Price ↓" },
] as const;

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { sort?: string };
}) {
  const sort = searchParams.sort ?? "newest";
  const data = await api.categoryProducts(params.slug, sort);

  return (
    <main className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Category: <span className="text-neutral-600">{params.slug}</span>
        </h1>

        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-neutral-600">Sort:</span>
          {sorts.map((s) => (
            <Link
              key={s.key}
              href={`/c/${params.slug}?sort=${s.key}`}
              className={[
                "rounded-full border px-3 py-1",
                sort === s.key
                  ? "bg-neutral-900 text-white"
                  : "bg-white hover:bg-neutral-50",
              ].join(" ")}>
              {s.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {data.data.map((p) => (
          <ProductTileCard key={p.id} p={p} />
        ))}
      </div>

      <div className="text-sm text-neutral-600">
        Page {data.meta.current_page} of {data.meta.last_page} — Total:{" "}
        {data.meta.total}
      </div>
    </main>
  );
}

