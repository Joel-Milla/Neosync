/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // ⚠️ Warning: This allows production builds to successfully complete even if
    // your project has TypeScript errors.
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["cdn.tiny.cloud"],
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default nextConfig;
