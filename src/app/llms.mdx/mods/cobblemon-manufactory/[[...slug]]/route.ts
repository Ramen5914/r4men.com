import { notFound } from "next/navigation";
import {
  cobblemonManufactorySource,
  getCobblemonManufactoryPageMarkdownUrl,
  getLLMText,
} from "@/lib/source";

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<"/llms.mdx/mods/cobblemon-manufactory/[[...slug]]">,
) {
  const { slug } = await params;
  const page = cobblemonManufactorySource.getPage(slug?.slice(0, -1));
  if (!page) notFound();

  return new Response(await getLLMText(page), {
    headers: {
      "Content-Type": "text/markdown",
    },
  });
}

export function generateStaticParams() {
  return cobblemonManufactorySource.getPages().map((page) => ({
    lang: page.locale,
    slug: getCobblemonManufactoryPageMarkdownUrl(page).segments,
  }));
}
