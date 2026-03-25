"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { adminFetch } from "@/lib/admin-api";
import { clearAdminToken, getAdminToken } from "@/lib/admin-auth";

type MeResponse = { user: { id: number; name: string; email: string } };

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function checkAuth() {
      const token = getAdminToken();

      if (!token) {
        router.replace("/admin/login");
        return;
      }

      try {
        const data = await adminFetch<MeResponse>("/api/admin/me");
        setUserName(data.user.name);
      } catch {
        clearAdminToken();
        router.replace("/admin/login");
        return;
      } finally {
        setLoading(false);
      }
    }

    void checkAuth();
  }, [router]);

  async function handleLogout() {
    try {
      await adminFetch("/api/admin/logout", { method: "POST" });
    } catch {
      //
    }

    clearAdminToken();
    router.push("/admin/login");
  }

  if (loading) {
    return (
      <div className="py-10 text-sm text-neutral-500">Loading admin...</div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <aside className="rounded-sm border bg-white p-4 shadow-md">
        <div className="mb-4">
          <div className="text-sm text-neutral-500">Signed in as</div>
          <div className="font-semibold">{userName}</div>
        </div>

        <nav className="space-y-2 text-sm">
          <Link
            href="/admin"
            className={`block rounded-xl px-3 py-2 ${pathname === "/admin" ? "bg-neutral-900 text-white" : "hover:bg-neutral-100"}`}>
            Dashboard
          </Link>
          <Link
            href="/admin/categories"
            className={`block rounded-xl px-3 py-2 ${pathname.startsWith("/admin/categories") ? "bg-neutral-900 text-white" : "hover:bg-neutral-100"}`}>
            Categories
          </Link>
          <Link
            href="/admin/products"
            className={`block rounded-xl px-3 py-2 ${pathname.startsWith("/admin/products") ? "bg-neutral-900 text-white" : "hover:bg-neutral-100"}`}>
            Products
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-6 inline-flex w-full items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium hover:bg-neutral-50">
          Logout
        </button>
      </aside>

      <section>{children}</section>
    </div>
  );
}

