"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { adminFetch } from "@/lib/admin-api";
import { setAdminToken } from "@/lib/admin-auth";

type LoginResponse = {
  token: string;
  user: { id: number; name: string; email: string };
};

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("admin@lilacstar.local");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await adminFetch<LoginResponse>("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      setAdminToken(data.token);
      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md py-10">
      <div className="rounded-sm border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight">Admin login</h1>
        <p className="mt-1 text-sm text-neutral-600">
          Sign in to manage {process.env.NEXT_PUBLIC_APP_NAME} catalog
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full rounded-xl border px-3 py-2 outline-none ring-0 focus:border-neutral-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full rounded-xl border px-3 py-2 outline-none ring-0 focus:border-neutral-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800 disabled:opacity-60">
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}


