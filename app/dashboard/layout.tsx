import "./globals.css";
import Sidebar from "./Sidebar";
import type { ReactNode } from "react";
import SessionWrapper from "./providers/SessionWrapper";

export const metadata = {
  title: "MedLink",
  description: "Doctor & Assistant friendly patient management.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen relative overflow-x-hidden">
        {/* Animated, iOS liquid-glass background layer */}
        <div className="pointer-events-none fixed inset-0 -z-10 bg-animated opacity-[0.9]" />

        {/* Soft radial “light blobs” for depth */}
        <div className="pointer-events-none fixed -top-32 -left-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.55),rgba(255,255,255,0)_60%)] blur-2xl -z-10" />
        <div className="pointer-events-none fixed -bottom-28 -right-28 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(195,231,255,0.55),rgba(195,231,255,0)_60%)] blur-2xl -z-10" />

        {/* App content */}
        <SessionWrapper>
          <div className="max-w-6xl mx-auto p-6">{children}</div>
        </SessionWrapper>
      </body>
    </html>
  );
}