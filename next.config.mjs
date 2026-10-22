/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  async rewrites() {
    return [
      {
        source: "/en/:path*",
        destination: "/:path*",
      },
      {
        source: "/ar/:path*",
        destination: "/:path*",
      },
    ];
  },
};

export default nextConfig;
