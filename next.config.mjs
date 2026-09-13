/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 86400,
  },
  // Keep the legacy Framer Motion API surface without shipping the runtime.
  // The Turbopack alias resolves imports to the tiny CSS/no-op compatibility shim.
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
