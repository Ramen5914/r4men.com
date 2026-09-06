import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { Metadata } from "next";
import { baseOptions } from "@/lib/layout.shared";
import { girlsServerSource } from "@/lib/source";

export const metadata: Metadata = {
  title: {
    default: "Girls' Server Wiki",
    template: "%s | Girls' Server",
  },
};

export default function Layout({ children }: LayoutProps<"/girls-server">) {
  return (
    <DocsLayout tree={girlsServerSource.getPageTree()} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
