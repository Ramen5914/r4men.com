import { llms } from "fumadocs-core/source";
import { cobblemonManufactorySource, gameKnightSource } from "@/lib/source";

export const revalidate = false;

export function GET() {
  const content = [
    llms(gameKnightSource).index(),
    llms(cobblemonManufactorySource).index(),
  ].join("\n\n");

  return new Response(content);
}
