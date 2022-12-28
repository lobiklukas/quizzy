import { defineConfig } from "cypress";
import { plugins } from "cypress-social-logins";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        GoogleSocialLogin(options) {
          return plugins.GoogleSocialLogin(options);
        },
      });
    },
    baseUrl: "http://localhost:3000",
    experimentalModifyObstructiveThirdPartyCode: true,
    screenshotsFolder: "public/screenshots",
  },
  env: {
    COOKIE_NAME: "next-auth.session-token",
    SITE_NAME: "http://localhost:3000",
  },
});
