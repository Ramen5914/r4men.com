import { loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { defineDocs } from "fumadocs-mdx/macro";
import {
  cobblemonManufactoryDocsImageRoute,
  cobblemonManufactoryDocsRoute,
  gameKnightDocsContentRoute,
  gameKnightDocsImageRoute,
  gameKnightDocsRoute, girlsServerDocsContentRoute, girlsServerDocsImageRoute, girlsServerDocsRoute,
} from "@/lib/shared";

// region Girls' Server
const girlsServerDocs = defineDocs({
  dir: "content/girls-server",
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

// See https://fumadocs.dev/docs/headless/source-api for more info
export const girlsServerSource = loader({
  baseUrl: girlsServerDocsRoute,
  source: girlsServerDocs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export function getGirlsServerPageImageUrl(
  page: (typeof girlsServerSource)["$inferPage"],
) {
  const segments = [...page.slugs, "image.png"];

  return {
    segments,
    url: "/" + [page.locale, ...girlsServerDocsImageRoute.split("/"), ...segments]
      .filter(Boolean)
      .join("/"),
  };
}

export function getGirlsServerPageMarkdownUrl(
  page: (typeof girlsServerSource)["$inferPage"],
) {
  const segments = [...page.slugs, "content.md"];

  return {
    segments,
    url:
      "/" +
      [page.locale, ...girlsServerDocsContentRoute.split("/"), ...segments]
      .filter(Boolean)
      .join("/"),
  };
}
// endregion

// region Game Knight
const gameKnightDocs = defineDocs({
  dir: "content/mods/game-knight",
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

// See https://fumadocs.dev/docs/headless/source-api for more info
export const gameKnightSource = loader({
  baseUrl: gameKnightDocsRoute,
  source: gameKnightDocs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export function getGameKnightPageImageUrl(
  page: (typeof gameKnightSource)["$inferPage"],
) {
  const segments = [...page.slugs, "image.png"];

  return {
    segments,
    url:
      "/" +
      [page.locale, ...gameKnightDocsImageRoute.split("/"), ...segments]
        .filter(Boolean)
        .join("/"),
  };
}

export function getGameKnightPageMarkdownUrl(
  page: (typeof gameKnightSource)["$inferPage"],
) {
  const segments = [...page.slugs, "content.md"];

  return {
    segments,
    url:
      "/" +
      [page.locale, ...gameKnightDocsContentRoute.split("/"), ...segments]
        .filter(Boolean)
        .join("/"),
  };
}
// endregion

// region Create: Cobblemon Manufactory
const cobblemonManufactoryDocs = defineDocs({
  dir: "content/mods/cobblemon-manufactory",
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export const cobblemonManufactorySource = loader({
  baseUrl: cobblemonManufactoryDocsRoute,
  source: cobblemonManufactoryDocs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export function getCobblemonManufactoryPageImageUrl(
  page: (typeof cobblemonManufactorySource)["$inferPage"],
) {
  const segments = [...page.slugs, "image.png"];

  return {
    segments,
    url:
      "/" +
      [
        page.locale,
        ...cobblemonManufactoryDocsImageRoute.split("/"),
        ...segments,
      ]
        .filter(Boolean)
        .join("/"),
  };
}

export function getCobblemonManufactoryPageMarkdownUrl(
  page: (typeof gameKnightSource)["$inferPage"],
) {
  const segments = [...page.slugs, "content.md"];

  return {
    segments,
    url:
      "/" +
      [page.locale, ...gameKnightDocsContentRoute.split("/"), ...segments]
        .filter(Boolean)
        .join("/"),
  };
}
// endregion

// Combined source used only for global search.
const allModsDocs = defineDocs({
  dir: "content/mods",
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export const allModsSearchSource = loader({
  baseUrl: "/mods",
  source: allModsDocs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

type DocsPage =
  | (typeof gameKnightSource)["$inferPage"]
  | (typeof cobblemonManufactorySource)["$inferPage"];

export async function getLLMText(page: DocsPage) {
  const processed = await page.data.getText("processed");

  return `# ${page.data.title} (${page.url})

${processed}`;
}
