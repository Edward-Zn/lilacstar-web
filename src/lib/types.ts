export type Category = {
  id: number;
  name: string;
  slug: string;
  sortOrder: number;
};

export type ProductTile = {
  id: number;
  name: string;
  slug: string;
  price: string | null;
  currency: string;
  inStock: boolean;
  isNew: boolean;
  isFeatured: boolean;
  mainImage?: string | null;
};

export type ProductImage = {
  id: number;
  url: string;
  alt: string | null;
  sortOrder: number;
  isMain: boolean;
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: string | null;
  currency: string;
  inStock: boolean;
  isNew: boolean;
  isFeatured: boolean;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
  images: ProductImage[];
};

export type Paginated<T> = {
  data: T[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};