import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "@/components/provider";

import "./global.css";

const inter = Inter({
  subsets: ["latin"],
});

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
      <body className="flex flex-col min-h-screen">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
