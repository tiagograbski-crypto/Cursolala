import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  agentRules: false,
  devIndicators: false,
  turbopack: {
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
