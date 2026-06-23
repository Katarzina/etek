export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body className="min-h-screen bg-stone-100 font-sans">
        {children}
      </body>
    </html>
  );
}
