import os from "node:os";
import path from "node:path";
import type { NextConfig } from "next";

/** Celular e 127.0.0.1 precisam disto: o Next bloqueia /_next fora de localhost. */
function allowedDevOrigins() {
  const origins = new Set(["127.0.0.1", "192.168.*.*", "10.*.*.*", "172.*.*.*"]);
  for (const nets of Object.values(os.networkInterfaces())) {
    for (const net of nets ?? []) {
      const family = net.family as string | number;
      if (family === "IPv4" || family === 4) origins.add(net.address);
    }
  }
  return [...origins];
}

const githubPages = process.env.GITHUB_PAGES === "1";
const staticExport = process.env.FIREBASE_HOSTING === "1" || githubPages;

const nextConfig: NextConfig = {
  allowedDevOrigins: allowedDevOrigins(),
  reactStrictMode: true,
  agentRules: false,
  devIndicators: false,
  ...(staticExport ? { output: "export" as const, trailingSlash: false } : {}),
  ...(githubPages ? { basePath: "/Cursolala", assetPrefix: "/Cursolala" } : {}),
  images: {
    unoptimized: staticExport,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  turbopack: {
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
