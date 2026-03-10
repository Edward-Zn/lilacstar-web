import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh">
        <div className="mx-auto w-full max-w-6xl px-4 py-4">
          <header className="mb-6 flex items-center justify-between gap-4">
            <Link href="/" className="text-xl font-bold tracking-tight">
              {process.env.APP_NAME}
            </Link>

            <nav className="flex items-center gap-4 text-sm">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <Link href="/admin/login" className="hover:underline">
                Admin
              </Link>
            </nav>
          </header>

          {children}

          <footer className="mt-12 border-t pt-6 text-sm text-neutral-500">
            © {new Date().getFullYear()} {process.env.APP_NAME}
          </footer>
        </div>
      </body>
    </html>
  );


}