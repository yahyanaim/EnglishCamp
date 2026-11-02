import englishRoutes from "./src/lib/english-routes.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  async redirects() {
    return Object.entries(englishRoutes).flatMap(([legacy, english]) =>
      ["", "/en", "/ar"].map(prefix => ({
        source: prefix + "/" + legacy + "/:path*",
        destination: prefix + "/" + english + "/:path*",
        permanent: true,
      })),
    );
  },
  async rewrites() {
    return [
      // Next resolves these internal destinations after redirects; bookmarks retain queries.
      ...Object.entries(englishRoutes).flatMap(([legacy, english]) =>
        ["", "/en", "/ar"].map(prefix => ({
          source: prefix + "/" + english + "/:path*",
          destination: "/" + legacy + "/:path*",
        })),
      ),
      { source: "/en/:path*", destination: "/:path*" },
      { source: "/ar/:path*", destination: "/:path*" },
    ];
  },
};

export default nextConfig;
