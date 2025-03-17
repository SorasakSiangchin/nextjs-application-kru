import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  images: {
    unoptimized: true,
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "lifestyle.campus-star.com",
    //     pathname: "**",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "d3d0lqu00lnqvz.cloudfront.net",
    //     pathname: "**",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "kroobannok.com",
    //     pathname: "**",
    //   },
    // ],
  },
};

export default nextConfig;
