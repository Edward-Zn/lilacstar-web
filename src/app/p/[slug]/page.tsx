import { api } from "@/lib/api";
import { Badge } from "@/components/Badge";

function formatPrice(price: string | null, currency: string) {
  if (!price) return "Ask for price";
  return `${price} ${currency}`;
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const p = await api.product(params.slug);

  const main = p.images.find((i) => i.isMain) ?? p.images[0] ?? null;

  return (
    <main className="space-y-5">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">{p.name}</h1>
        {p.category && (
          <div className="text-sm text-neutral-600">
            Category: {p.category.name}
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {p.isNew && <Badge>New</Badge>}
          {p.isFeatured && <Badge>Featured</Badge>}
          {!p.inStock && <Badge>Out of stock</Badge>}
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-2xl border bg-white p-3">
          <div className="aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100">
            {main?.url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={main.url}
                alt={main.alt ?? p.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-neutral-400">
                No Image
              </div>
            )}
          </div>

          {p.images.length > 1 && (
            <div className="mt-3 -mx-3 flex gap-2 overflow-x-auto px-3 pb-1">
              {p.images.map((img) => (
                <a
                  key={img.id}
                  href={img.url}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 rounded-xl border bg-white p-1 hover:bg-neutral-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.alt ?? p.name}
                    className="h-20 w-24 rounded-lg object-cover"
                  />
                </a>
              ))}
            </div>
          )}
        </section>

        <aside className="space-y-4 rounded-2xl border bg-white p-4">
          <div className="text-xl font-bold">
            {formatPrice(p.price, p.currency)}
          </div>

          <div className="space-y-1">
            <div className="text-sm font-semibold">Description</div>
            <div className="text-sm text-neutral-600">
              {p.description ?? "—"}
            </div>
          </div>

          <div>
            <a
              href="https://wa.me/000000000"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800">
              Contact on WhatsApp
            </a>
          </div>
        </aside>
      </div>
    </main>
  );
}

