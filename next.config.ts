import type { NextConfig } from "next";

const githubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = githubPages
  ? {
      output: "export",
      basePath: "/YundiGuo",
      assetPrefix: "/YundiGuo",
      trailingSlash: true,
      images: { unoptimized: true },
      typescript: { ignoreBuildErrors: true },
    }
  : {};

export default nextConfig;
