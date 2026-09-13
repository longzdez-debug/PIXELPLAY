/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 86400,
  },
  // Keep third-party animation imports out of the client bundle.
  // PartnersInteractive still uses the existing API surface, but the runtime is now CSS/no-op based.
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  turbopack: {
    resolveAlias: {
      "framer-motion": "./components/partners/motion-lite.tsx",
    },
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
