import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withMDX = createMDX();

const allowedDevOrigins: string[] = [];

if (process.env.HOSTNAME) {
  allowedDevOrigins.push(process.env.HOSTNAME);
}

const config: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["typescript", "twoslash"],
  images: {
    remotePatterns: [
      new URL("https://raw.githubusercontent.com/Ramen5914/**"),
      {
        protocol: "https",
        hostname: "cdn.r4men.com",
        pathname: "/**",
      },
    ],
  },
  allowedDevOrigins: allowedDevOrigins,
  logging: {
    browserToTerminal: true,
  },
};

export default withMDX(config);
