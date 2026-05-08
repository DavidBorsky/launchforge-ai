import type { Metadata } from "next";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "LaunchForge AI",
  description: "Create, brand, and deploy startup launch kits with AI-powered workflows."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
