import { createFromSource } from "fumadocs-core/search/server";
import { gameKnightSource } from "@/lib/source";

export const { GET } = createFromSource(gameKnightSource);
