import type { NextConfig } from "next";
import fs from "fs";
import path from "path";
import withBundleAnalyzer from "@next/bundle-analyzer";
import matter from "gray-matter";
import { redirectsList } from "./src/config/redirects";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

// Publish Guard: Ensure no published blog post contains unresolved [FURKAN or [VERIFY markers
const blogDir = path.join(process.cwd(), "content", "blog");
if (fs.existsSync(blogDir)) {
  const blogFiles = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  for (const file of blogFiles) {
    const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
    const { data } = matter(raw);
    if (data.draft === false) {
      if (raw.includes("[FURKAN") || raw.includes("[VERIFY")) {
        throw new Error(
          `[PUBLISH GUARD] Build aborted: Published blog post "${file}" (draft: false) contains unresolved [FURKAN or [VERIFY marker.`
        );
      }
    }
  }
}

const nextConfig: NextConfig = {
  reactCompiler: true,
  trailingSlash: false,
  async redirects() {
    return redirectsList.map((r) => ({
      source: r.source,
      destination: r.destination,
      permanent: true,
    }));
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default bundleAnalyzer(nextConfig);

