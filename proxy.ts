import { isMarkdownPreferred, rewritePath } from "fumadocs-core/negotiation";
import { type NextRequest, NextResponse } from "next/server";
import {
  cobblemonManufactoryDocsContentRoute,
  cobblemonManufactoryDocsRoute,
  gameKnightDocsContentRoute,
  gameKnightDocsRoute,
} from "@/lib/shared";

const { rewrite: rewriteGameKnightDocs } = rewritePath(
  `${gameKnightDocsRoute}{/*path}`,
  `${gameKnightDocsContentRoute}{/*path}/content.md`,
);
const { rewrite: rewriteGameKnightSuffix } = rewritePath(
  `${gameKnightDocsRoute}{/*path}.md`,
  `${gameKnightDocsContentRoute}{/*path}/content.md`,
);
const { rewrite: rewriteCobblemonManufactoryDocs } = rewritePath(
  `${cobblemonManufactoryDocsRoute}{/*path}`,
  `${cobblemonManufactoryDocsContentRoute}{/*path}/content.md`,
);
const { rewrite: rewriteCobblemonManufactorySuffix } = rewritePath(
  `${cobblemonManufactoryDocsRoute}{/*path}.md`,
  `${cobblemonManufactoryDocsContentRoute}{/*path}/content.md`,
);

export default function proxy(request: NextRequest) {
  const result = rewriteGameKnightSuffix(request.nextUrl.pathname);
  if (result) {
    return NextResponse.rewrite(new URL(result, request.nextUrl));
  }

  const cobblemonManufactorySuffixResult = rewriteCobblemonManufactorySuffix(
    request.nextUrl.pathname,
  );
  if (cobblemonManufactorySuffixResult) {
    return NextResponse.rewrite(
      new URL(cobblemonManufactorySuffixResult, request.nextUrl),
    );
  }

  if (isMarkdownPreferred(request)) {
    const result = rewriteGameKnightDocs(request.nextUrl.pathname);

    if (result) {
      return NextResponse.rewrite(new URL(result, request.nextUrl), {
        // this URL has two representations, selected by `Accept`
        headers: { Vary: "Accept" },
      });
    }

    const cobblemonManufactoryResult = rewriteCobblemonManufactoryDocs(
      request.nextUrl.pathname,
    );
    if (cobblemonManufactoryResult) {
      return NextResponse.rewrite(
        new URL(cobblemonManufactoryResult, request.nextUrl),
        {
          // this URL has two representations, selected by `Accept`
          headers: { Vary: "Accept" },
        },
      );
    }
  }

  return NextResponse.next();
}
