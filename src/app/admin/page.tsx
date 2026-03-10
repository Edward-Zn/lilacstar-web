export default function AdminDashboardPage() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">Admin dashboard</h1>
      <div className="rounded-2xl border bg-white p-4">
        <p className="text-sm text-neutral-600">
          {process.env.APP_NAME} admin panel
        </p>
      </div>
    </main>
  );
}
