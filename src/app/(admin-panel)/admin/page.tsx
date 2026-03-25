export default function AdminDashboardPage() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
      <div className="rounded-sm border bg-white p-4 shadow-md">
        <p className="text-sm text-neutral-600">
          {process.env.NEXT_PUBLIC_APP_NAME} Admin Panel
        </p>
      </div>
    </main>
  );
}


