import { notFound } from "next/navigation";
import {
  gameKnightSource,
  getGameKnightPageMarkdownUrl,
  getLLMText,
} from "@/lib/source";

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<"/llms.mdx/mods/game-knight/[[...slug]]">,
) {
  const { slug } = await params;
  const page = gameKnightSource.getPage(slug?.slice(0, -1));
  if (!page) notFound();

  return new Response(await getLLMText(page), {
    headers: {
      "Content-Type": "text/markdown",
    },
  });
}

export function generateStaticParams() {
  return gameKnightSource.getPages().map((page) => ({
    lang: page.locale,
    slug: getGameKnightPageMarkdownUrl(page).segments,
  }));
}
