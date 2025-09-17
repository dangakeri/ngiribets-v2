/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "stgameswesteu.blob.core.windows.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.betfounders.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "falmebet.fra1.digitaloceanspaces.com",
        pathname: "/**",
      },
    ],
  },
  trailingSlash: true, // This will add a trailing slash to the exported paths
};

export default nextConfig;
