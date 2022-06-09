const nextConfig = {
  reactStrictMode: true,
  distDir: ".bigcock",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/app",
        permanent: true,
      },
      {
        source: "/api/L/get",
        destination: "/api/v2?method=GET",
        permanent: true,
      },
      {
        source: "/api/L/post",
        destination: "/api/v2?method=POST",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
