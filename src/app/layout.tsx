import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "StatusPulse — Uptime Monitoring",
  description:
    "Real-time website uptime monitoring with incident tracking and public status pages.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0f1425] to-[#1a1b3a] bg-fixed antialiased">
        {children}
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
