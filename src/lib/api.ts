import type { Category, CollectionResponse, Paginated, Product, ProductTile } from "./types";

const API = process.env.NEXT_PUBLIC_API_URL;

if (!API) {
  throw new Error("NEXT_PUBLIC_API_URL is not set");
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status} ${res.statusText}: ${text}`);
  }

  return res.json() as Promise<T>;
}

export const api = {
  categories: () => apiFetch<CollectionResponse<Category>>("/api/categories"),
  homeFeatured: () => apiFetch<CollectionResponse<ProductTile>>("/api/home/featured"),
  homeNewest: () => apiFetch<CollectionResponse<ProductTile>>("/api/home/newest"),
  categoryProducts: (slug: string, sort: string) =>
    apiFetch<Paginated<ProductTile>>(
      `/api/categories/${encodeURIComponent(slug)}/products?sort=${encodeURIComponent(sort)}`
    ),
  product: (slug: string) =>
    apiFetch<Product>(`/api/products/${encodeURIComponent(slug)}`),
};