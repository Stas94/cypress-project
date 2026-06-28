// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command  --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { BaseModal, RegistrationModalPage, LoginModalPage } from "../page";

const baseModal = new BaseModal();
const registerModal = new RegistrationModalPage();
const loginModal = new LoginModalPage();

Cypress.Commands.overwrite("type", (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    // turn off original log
    options.log = false;
    // create our own log with masked message
    Cypress.log({
      $el: element,
      name: "type",
      message: "*".repeat(text.length),
    });
  }

  return originalFn(element, text, options);
});

Cypress.Commands.add("login", (username, password) => {
  loginModal.openLoginModal("Log in");
  baseModal.selectors.modalContent().within(() => {
    loginModal.fillEmail(username);
    loginModal.fillPassword(password);
    loginModal.clickButtonLogin("Login");
  });
  baseModal.checkSuccessMessage("You have been successfully logged in");
});

Cypress.Commands.add("registr", (username, lastname, email, password) => {
  registerModal.openRegistrationModal("Registration");
  baseModal.selectors.modalContent().within(() => {
    registerModal.fillUserName(username);
    registerModal.fillLastName(lastname);
    registerModal.fillUserEmail(email);
    registerModal.fillPassword(password);
    registerModal.fillRepeatPassword(password);
    registerModal.clickButtonRegister("Register");
  });
  baseModal.checkSuccessMessage("Registration complete");
});
