import { HomeLayout } from "fumadocs-ui/layouts/home";
import { BookIcon } from "lucide-react";
import { baseOptions } from "@/lib/layout.shared";

import "./mods.css";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <HomeLayout
      {...baseOptions()}
      links={[
        {
          icon: <BookIcon />,
          text: "Mods",
          url: "/mods",
        },
      ]}
    >
      {children}
    </HomeLayout>
  );
}
