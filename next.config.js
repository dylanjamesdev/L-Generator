/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/app",
        permanent: true,
      },
      {
        source: "/api/L/get",
        destination: "/api/v2?method=get",
        permanent: true,
      },
      {
        source: "/api/L/post",
        destination: "/api/v2?method=post",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
