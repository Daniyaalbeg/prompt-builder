/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        // port: "",
        // pathname: '/account123/**',
      },
    ],
  },
};

module.exports = nextConfig;
