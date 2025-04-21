import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: process.env.WP_WEBSITE_HOSTNAME as string,
      },
    ],
  },
};

export default nextConfig;