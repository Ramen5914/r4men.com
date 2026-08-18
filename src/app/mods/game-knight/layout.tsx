import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { LayoutGridIcon } from "lucide-react";
import { baseOptions } from "@/lib/layout.shared";
import { gameKnightSource } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/mods/game-knight">) {
  return (
    <DocsLayout
      tree={gameKnightSource.getPageTree()}
      {...baseOptions()}
      links={[
        {
          icon: <LayoutGridIcon />,
          text: "All Mods",
          url: "/mods",
        },
      ]}
    >
      <main className="contents">{children}</main>
    </DocsLayout>
  );
}
