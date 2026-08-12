import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { LayoutGridIcon } from "lucide-react";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      links={[
        {
          icon: <LayoutGridIcon />,
          text: "All Mods",
          url: "/mods",
        },
      ]}
    >
      {children}
    </DocsLayout>
  );
}
