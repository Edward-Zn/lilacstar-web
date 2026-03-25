import Link from "next/link";
import type { ProductTile } from "@/lib/types";
import { Badge } from "./Badge";

function formatPrice(price: string | null, currency: string) {
  if (!price) return "Ask for price";
  return `${price} ${currency}`;
}

export function ProductTileCard({ p }: { p: ProductTile }) {
  return (
    <Link
      href={`/p/${p.slug}`}
      className="group block rounded-sm border bg-white p-3 hover:bg-neutral-50 shadow-md">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-100">
        {p.mainImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.mainImage ?? ""}
            alt={p.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-neutral-400">
            No Image
          </div>
        )}
      </div>

      <div className="mt-3 space-y-1">
        <div className="line-clamp-2 text-sm font-semibold">{p.name}</div>
        <div className="text-sm text-neutral-600">
          {formatPrice(p.price, p.currency)}
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {p.isNew && <Badge>New</Badge>}
          {p.isFeatured && <Badge>Featured</Badge>}
          {!p.inStock && <Badge>Out of stock</Badge>}
        </div>
      </div>
    </Link>
  );
}

