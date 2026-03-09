import { getAdminToken } from "./admin-auth";

const API = process.env.NEXT_PUBLIC_API_URL;

if (!API) {
    throw new Error("NEXT_PUBLIC_API_URL is not set");
}

type RequestOptions = RequestInit & {
    isFormData?: boolean;
};

export async function adminFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const token = getAdminToken();

    const headers = new Headers(options.headers);

    headers.set("Accept", "application/json");

    if (!options.isFormData) {
        headers.set("Content-Type", "application/json");
    }

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const res = await fetch(`${API}${path}`, {
        ...options,
        headers,
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`API ${res.status} ${res.statusText}: ${text}`);
    }

    if (res.status === 204) {
        return null as T;
    }

    return res.json() as Promise<T>;
}