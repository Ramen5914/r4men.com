"use client";

import { useDocsSearch } from "fumadocs-core/search/client";
import { fetchClient } from "fumadocs-core/search/client/fetch";
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  type SharedProps,
} from "fumadocs-ui/components/dialog/search";
import { useI18n } from "fumadocs-ui/contexts/i18n";
import { usePathname } from "next/navigation";

export default function DefaultSearchDialog(props: SharedProps) {
  const pathname = usePathname();

  const api = pathname.startsWith("/mods/game-knight")
    ? "/api/search/game-knight"
    : pathname.startsWith("/mods/cobblemon-manufactory")
      ? "/api/search/cobblemon-manufactory"
      : "/api/search";

  const { locale } = useI18n();
  const { search, setSearch, query } = useDocsSearch({
    client: fetchClient({
      api,
      locale,
    }),
  });

  return (
    <SearchDialog
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
      {...props}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={query.data !== "empty" ? query.data : null} />
      </SearchDialogContent>
    </SearchDialog>
  );
}
