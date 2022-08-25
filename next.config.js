/** @type {import('next').NextConfig} */
const nextConfig = {
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  reactStrictMode: true,
  publicRuntimeConfig: {
    jwtCookie: process.env.COOKIE_NAME,
    jwtCookieSecret: process.env.JWT_COOKIE_SECRET,
    jwtCookieInitVector: process.env.JWT_INIT_VECTOR
  }
};

module.exports = nextConfig;
