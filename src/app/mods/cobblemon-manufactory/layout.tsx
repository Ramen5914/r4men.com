import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { LayoutGridIcon } from "lucide-react";
import { baseOptions } from "@/lib/layout.shared";
import { cobblemonManufactorySource } from "@/lib/source";

export default function Layout({
  children,
}: LayoutProps<"/mods/cobblemon-manufactory">) {
  return (
    <DocsLayout
      tree={cobblemonManufactorySource.getPageTree()}
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
