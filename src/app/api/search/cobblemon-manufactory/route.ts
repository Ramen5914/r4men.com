import { createFromSource } from "fumadocs-core/search/server";
import { cobblemonManufactorySource } from "@/lib/source";

export const { GET } = createFromSource(cobblemonManufactorySource);
