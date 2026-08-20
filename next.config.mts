import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withMDX = createMDX();

const allowedDevOrigins: string[] = [];

if (process.env.LOCAL_IP) {
  allowedDevOrigins.push(process.env.LOCAL_IP);
}

const config: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["typescript", "twoslash"],
  images: {
    remotePatterns: [new URL("https://raw.githubusercontent.com/Ramen5914/**")],
  },
  allowedDevOrigins: allowedDevOrigins,
  logging: {
    browserToTerminal: true,
  },
};

export default withMDX(config);
