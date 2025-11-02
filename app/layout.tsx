import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "MedLink",
  description: "Doctor & Assistant friendly patient management."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-50 text-slate-900">
        <div className="max-w-6xl mx-auto p-6">{children}</div>
      </body>
    </html>
  );
}
