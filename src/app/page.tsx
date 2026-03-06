import { api } from "@/lib/api";
import { CategoryStrip } from "@/components/CategoryStrip";
import { ProductTileCard } from "@/components/ProductTile";

export default async function HomePage() {
  const [categories, featured, newest] = await Promise.all([
    api.categories(),
    api.homeFeatured(),
    api.homeNewest(),
  ]);

  return (
    <main className="space-y-10">
      <section className="space-y-3">
        <h1 className="text-2xl font-bold tracking-tight">Catalog</h1>
        <p className="text-sm text-neutral-600">
          Browse categories and products
        </p>
      </section>

      <section className="space-y-3">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-lg font-semibold">Categories</h2>
        </div>
        <CategoryStrip categories={categories} />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Featured</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductTileCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Newest</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {newest.map((p) => (
            <ProductTileCard key={p.id} p={p} />
          ))}
        </div>
      </section>
    </main>
  );
}