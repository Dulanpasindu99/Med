import "./globals.css";
import type { ReactNode } from "react";
import SessionWrapper from "./providers/SessionWrapper";

export const metadata = {
  title: "MedLink",
  description: "Doctor & Assistant friendly patient management.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen relative overflow-hidden text-slate-900">
        {/* Background */}
        <div className="fixed inset-0 -z-10 bg-animated" />
        <div className="fixed top-[-15%] left-[-10%] w-[25rem] h-[25rem] rounded-full bg-sky-200 blur-[120px] opacity-40 animate-pulse" />
        <div className="fixed bottom-[-15%] right-[-10%] w-[28rem] h-[28rem] rounded-full bg-indigo-200 blur-[120px] opacity-30 animate-pulse" />

        <SessionWrapper>
          <main className="min-h-screen p-8">{children}</main>
        </SessionWrapper>
      </body>
    </html>
  );
}
