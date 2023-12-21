/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = {
  auth0: {
    secret: process.env.AUTH0_SECRET,
    // other Auth0 configuration...
  },
  ...nextConfig,
  // other Next.js configuration...
};
