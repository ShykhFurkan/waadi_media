import type { NextConfig } from "next";
import { redirectsList } from "./src/config/redirects";

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

export default nextConfig;
