import { createFromSource } from "fumadocs-core/search/server";
import { allModsSearchSource } from "@/lib/source";

export const { GET } = createFromSource(allModsSearchSource);
