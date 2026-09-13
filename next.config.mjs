/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 86400,
  },
  // Keep third-party animation imports as small as possible when a client island needs them.
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*\\.(jpg|jpeg|png|webp|avif|svg|ico|mp4|webm|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/hardware",
        destination: "/specs",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
