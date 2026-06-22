export class RegistrationModalPage {
  selectors = {
    registrationModalTitle: () => cy.get(".modal-content .modal-title"),
    nameInput: () => cy.get(".modal-content input[name='name']"),
    lastNameInput: () => cy.get(".modal-content input[name='lastName']"),
    emailInput: () => cy.get(".modal-content input[name='email']"),
    passwordInput: () => cy.get(".modal-content input[name='password']"),
    repeatPasswordInput: () =>
      cy.get(".modal-content input[name='repeatPassword']"),
    registerButton: () => cy.contains(".modal-content button", "Register"),
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
    this.selectors.passwordInput().clear().type(password, { sensitive: true });
  }

  fillRepeatPassword(repeatPassword) {
    this.selectors
      .repeatPasswordInput()
      .clear()
      .type(repeatPassword, { sensitive: true });
  }

  clickButtonRegister() {
    this.selectors.registerButton().should("not.be.disabled").click();
  }

  openRegistrationModal() {
    cy.contains(".hero-descriptor_btn", "Sign up").click();
    this.selectors
      .registrationModalTitle()
      .should("have.text", "Registration");
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
