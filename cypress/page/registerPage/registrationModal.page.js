import { BaseModal } from "../baseModal";

export class RegistrationModalPage extends BaseModal {
  selectors = {
    ...this.selectors,
    nameInput: () => cy.get("input[name='name']"),
    lastNameInput: () => cy.get("input[name='lastName']"),
    repeatPasswordInput: () => cy.get("input[name='repeatPassword']"),
  };

  errorMessages = {
    fieldRequired: (fieldName) => `${fieldName} required`,
    fieldInvalid: (fieldName) => `${fieldName} is invalid`,
    fieldLength: (fieldName, min = 2, max = 20) =>
      `${fieldName} has to be from ${min} to ${max} characters long`,
    emailIncorrect: () => `Email is incorrect`,
    passwordInvalid: (min = 8, max = 15) =>
      `Password has to be from ${min} to ${max} characters long and contain at least one integer, one capital, and one small letter`,
    passwordDoMatch: () => `Passwords do not match`,
    reEnterPassword: () => `Re-enter password required`,
  };

  fillUserName(name) {
    const userName = name.trim();
    this.selectors.nameInput().clear().type(userName);
  }

  fillLastName(lastName) {
    const secondName = lastName.trim();
    this.selectors.lastNameInput().clear().type(secondName);
  }

  fillUserEmail(email) {
    this.selectors.emailInput().clear().type(email);
  }

  fillPassword(password) {
    this.selectors.passwordInput().clear().type(password, { sensitive: false });
  }

  fillRepeatPassword(repeatPassword) {
    this.selectors
      .repeatPasswordInput()
      .clear()
      .type(repeatPassword, { sensitive: false });
  }

  clickButtonRegister(buttonName) {
    this.selectors.button(buttonName).should("not.be.disabled").click();
  }

  openRegistrationModal(modalTitle) {
    cy.contains(".hero-descriptor_btn", "Sign up").click();
    this.checkModalTitle(modalTitle);
  }

  validateFieldError(fieldSelector, errorText) {
    fieldSelector()
      .parent()
      .find(".invalid-feedback")
      .should("include.text", errorText);
    fieldSelector()
      .should("have.class", "is-invalid")
      .and("have.css", "border-color", "rgb(220, 53, 69)");
  }
}
