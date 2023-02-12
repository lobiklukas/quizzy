// <reference types="cypress" />
const { themeChange } = require("theme-change");
const { themes } = require("../../../src/data");

const quizId = "clc82v25d002isfaduwj2qwk7";

Cypress.Commands.add("setLocalStorage", (key, item) =>
  window.localStorage.setItem(key, item)
);

Cypress.config("defaultCommandTimeout", 10000);

describe("Login page", () => {
  before(() => {
    cy.viewport("macbook-13");
    window.localStorage.setItem("theme", themes[0].id);
    cy.visit("/");
  });
  it("Login with Google", async () => {
    const username = Cypress.env("GOOGLE_USER");
    const password = Cypress.env("GOOGLE_PW");
    const loginUrl = Cypress.env("SITE_NAME");
    const cookieName = Cypress.env("COOKIE_NAME");
    const socialLoginOptions = {
      username,
      password,
      loginUrl,
      headless: true,
      logs: true,
      isPopup: true,
      loginSelector: "#google-login",
      postLoginSelector: "#dashboard",
    };

    let { cookies } = await cy.task("GoogleSocialLogin", socialLoginOptions);
    cy.clearCookies();

    const cookie = cookies.filter((cookie) => cookie.name === cookieName).pop();
    if (cookie) {
      cy.setCookie(cookie.name, cookie.value, {
        domain: cookie.domain,
        expiry: cookie.expires,
        httpOnly: cookie.httpOnly,
        path: cookie.path,
        secure: cookie.secure,
      });
    }
    cy.visit("/");
    cy.wrap(themes).each(async (theme) => {
      await cy.setLocalStorage("theme", theme.id);
      await cy.visit("/");
      await cy.get("#dashboard", { timeout: 20000 }).should("be.visible");
      await cy.wait(100);
      await cy.screenshot(`${theme.id}/dashboard`, {
        capture: "viewport",
        overwrite: true,
      });
      await cy.visit(`/learn/${quizId}`);
      await cy.get(".react-card-flip", { timeout: 20000 }).should("be.visible");
      await cy.screenshot(`${theme.id}/learn`, {
        capture: "viewport",
        overwrite: true,
      });
      await cy.visit(`/quiz/${quizId}`);
      await cy.get("#edit-form", { timeout: 20000 }).should("be.visible");
      await cy.wait(100);
      await cy.screenshot(`${theme.id}/quiz`, {
        capture: "viewport",
        overwrite: true,
      });
    });
  });
});
