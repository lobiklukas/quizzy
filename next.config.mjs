import withPWA from "next-pwa";
// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

const pwa = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  reloadOnOnline: false,
});

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
    domains: ["picsum.photos", "img.clerk.com"],
  },
  reloadOnOnline: false,
};
export default pwa(config);
