/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/usa-quotes/:symbol",
        destination: "/usa-quotes/:symbol" + "-stock",
      },
    ];
  },
};

module.exports = nextConfig;
