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
};

export default nextConfig;
