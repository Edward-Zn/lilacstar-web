export type AdminCategory = {
    id: number;
    name: string;
    slug: string;
    sort_order: number;
    is_visible: boolean;
    created_at: string;
    updated_at: string;
};

export type CollectionResponse<T> = {
    data: T[];
};

export type SingleResponse<T> = {
    data: T;
};