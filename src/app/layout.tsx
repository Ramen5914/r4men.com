import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Provider } from "@/components/provider";

import "./global.css";
import "fumadocs-twoslash/twoslash.css";
import "katex/dist/katex.css";

const inter = Inter({
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "r4men.com",
  metadataBase: new URL("https://r4men.com"),
  alternates: {
    canonical: "/",
  },
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
