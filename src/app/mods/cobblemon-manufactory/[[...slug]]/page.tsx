import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from "fumadocs-ui/layouts/docs/page";
import { createRelativeLink } from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/components/mdx";
import { gitConfig } from "@/lib/shared";
import {
  cobblemonManufactorySource,
  getCobblemonManufactoryPageImageUrl,
  getCobblemonManufactoryPageMarkdownUrl,
} from "@/lib/source";

export default async function Page(
  props: PageProps<"/mods/cobblemon-manufactory/[[...slug]]">,
) {
  const params = await props.params;
  const page = cobblemonManufactorySource.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getCobblemonManufactoryPageMarkdownUrl(page).url;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">
        {page.data.description}
      </DocsDescription>
      <div className="flex flex-row items-center gap-2 border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/mods/cobblemon-manufactory/${page.path}`}
        />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(cobblemonManufactorySource, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return cobblemonManufactorySource.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/mods/cobblemon-manufactory/[[...slug]]">,
): Promise<Metadata> {
  const params = await props.params;
  const page = cobblemonManufactorySource.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getCobblemonManufactoryPageImageUrl(page).url,
    },
  };
}
