import { BaseModal, RegistrationModalPage } from "../page";
import { faker } from "@faker-js/faker";

const baseModal = new BaseModal();
const registerModal = new RegistrationModalPage();
const registeredEmail = faker.internet.email({ provider: "example.com" });

describe("Registration modal", () => {
  beforeEach(function () {
    cy.fixture("users").then(({ admin, user2 }) => {
      this.user2 = user2;
      cy.visit("/", {
        auth: { username: admin.name, password: admin.password },
      });
    });
  });

  it("Register user invalid name", function () {
    registerModal.openRegistrationModal("Registration");
    registerModal.selectors.nameInput().clear();
    registerModal.fillLastName(this.user2.lastname);
    registerModal.fillUserEmail(registeredEmail);
    registerModal.fillPassword(this.user2.password);
    registerModal.fillRepeatPassword(this.user2.password);
    baseModal.selectors.button("Register").should("be.disabled");
    registerModal.validateFieldError(
      registerModal.selectors.nameInput,
      registerModal.errorMessages.fieldRequired("Name"),
    );
    registerModal.selectors.nameInput().clear().type("T");
    registerModal.validateFieldError(
      registerModal.selectors.nameInput,
      registerModal.errorMessages.fieldLength("Name"),
    );
    registerModal.selectors.nameInput().clear().type("edsfdsfdsffdsfsdfdfsff");
    registerModal.validateFieldError(
      registerModal.selectors.nameInput,
      registerModal.errorMessages.fieldLength("Name"),
    );
    registerModal.selectors.nameInput().clear().type("Кек");
    registerModal.validateFieldError(
      registerModal.selectors.nameInput,
      registerModal.errorMessages.fieldInvalid("Name"),
    );
    registerModal.fillUserName(this.user2.name + " ");
    registerModal.selectors
      .nameInput()
      .should("not.have.class", "is-invalid")
      .and("have.value", this.user2.name);
    registerModal.fillUserName("Te");
    baseModal.selectors.button("Register").should("not.be.disabled");
    registerModal.selectors.nameInput().should("not.have.class", "is-invalid");
    registerModal.fillUserName("sfdsfdsffdsfsdfdfsff");
    registerModal.selectors.nameInput().should("not.have.class", "is-invalid");
  });

  it("Register user invalid last name", function () {
    registerModal.openRegistrationModal("Registration");
    registerModal.fillUserName(this.user2.name);
    registerModal.selectors.lastNameInput().clear();
    registerModal.fillUserEmail(registeredEmail);
    registerModal.fillPassword(this.user2.password);
    registerModal.fillRepeatPassword(this.user2.password);
    baseModal.selectors.button("Register").should("be.disabled");
    registerModal.validateFieldError(
      registerModal.selectors.lastNameInput,
      registerModal.errorMessages.fieldRequired("Last name"),
    );
    registerModal.selectors.lastNameInput().clear().type("T");
    registerModal.validateFieldError(
      registerModal.selectors.lastNameInput,
      registerModal.errorMessages.fieldLength("Last name"),
    );
    registerModal.selectors
      .lastNameInput()
      .clear()
      .type("edsfdsfdsffdsfsdfdfsff");
    registerModal.validateFieldError(
      registerModal.selectors.lastNameInput,
      registerModal.errorMessages.fieldLength("Last name"),
    );
    registerModal.selectors.lastNameInput().clear().type("Кек");
    registerModal.validateFieldError(
      registerModal.selectors.lastNameInput,
      registerModal.errorMessages.fieldInvalid("Last name"),
    );
    registerModal.fillLastName(this.user2.name + " ");
    registerModal.selectors
      .lastNameInput()
      .should("not.have.class", "is-invalid")
      .and("have.value", this.user2.name);
    registerModal.fillLastName("Te");
    baseModal.selectors.button("Register").should("not.be.disabled");
    registerModal.selectors
      .lastNameInput()
      .should("not.have.class", "is-invalid");
    registerModal.fillLastName("sfdsfdsffdsfsdfdfsff");
    registerModal.selectors
      .lastNameInput()
      .should("not.have.class", "is-invalid");
  });

  it("Register user invalid email", function () {
    registerModal.openRegistrationModal("Registration");
    registerModal.fillUserName(this.user2.name);
    registerModal.fillLastName(this.user2.lastname);
    registerModal.selectors.emailInput().clear();
    registerModal.fillPassword(this.user2.password);
    registerModal.fillRepeatPassword(this.user2.password);
    baseModal.selectors.button("Register").should("be.disabled");
    registerModal.validateFieldError(
      registerModal.selectors.emailInput,
      registerModal.errorMessages.fieldRequired("Email"),
    );
    registerModal.fillUserEmail("test@example");
    registerModal.validateFieldError(
      registerModal.selectors.emailInput,
      registerModal.errorMessages.emailIncorrect(),
    );
    registerModal.fillUserEmail(registeredEmail);
    registerModal.selectors.emailInput().should("not.have.class", "is-invalid");
  });

  it("Register user invalid password", function () {
    registerModal.openRegistrationModal("Registration");
    registerModal.fillUserName(this.user2.name);
    registerModal.fillLastName(this.user2.lastname);
    registerModal.fillUserEmail(registeredEmail);
    registerModal.selectors.passwordInput().clear();
    registerModal.fillRepeatPassword(this.user2.password);
    baseModal.selectors.button("Register").should("be.disabled");
    registerModal.validateFieldError(
      registerModal.selectors.passwordInput,
      registerModal.errorMessages.fieldRequired("Password"),
    );
    registerModal.fillPassword("212");
    registerModal.validateFieldError(
      registerModal.selectors.passwordInput,
      registerModal.errorMessages.passwordInvalid(),
    );
    registerModal.fillPassword("123456789");
    registerModal.validateFieldError(
      registerModal.selectors.passwordInput,
      registerModal.errorMessages.passwordInvalid(),
    );
    registerModal.fillPassword("Password");
    registerModal.validateFieldError(
      registerModal.selectors.passwordInput,
      registerModal.errorMessages.passwordInvalid(),
    );
    registerModal.fillPassword("password1");
    registerModal.validateFieldError(
      registerModal.selectors.passwordInput,
      registerModal.errorMessages.passwordInvalid(),
    );
    registerModal.fillPassword("PASSWORD");
    registerModal.validateFieldError(
      registerModal.selectors.passwordInput,
      registerModal.errorMessages.passwordInvalid(),
    );
    registerModal.fillPassword(this.user2.password);
    registerModal.selectors
      .passwordInput()
      .should("not.have.class", "is-invalid");
    baseModal.selectors.button("Register").should("not.be.disabled");
  });

  it("Register user invalid re-enter password", function () {
    registerModal.openRegistrationModal("Registration");
    registerModal.fillUserName(this.user2.name);
    registerModal.fillLastName(this.user2.lastname);
    registerModal.fillUserEmail(registeredEmail);
    registerModal.fillPassword(this.user2.password);
    registerModal.selectors.repeatPasswordInput().clear();
    registerModal.selectors.passwordInput().focus();
    baseModal.selectors.button("Register").should("be.disabled");
    registerModal.validateFieldError(
      registerModal.selectors.repeatPasswordInput,
      registerModal.errorMessages.reEnterPassword(),
    );
    registerModal.fillRepeatPassword(this.user2.password + 1);
    registerModal.validateFieldError(
      registerModal.selectors.repeatPasswordInput,
      registerModal.errorMessages.passwordDoMatch(),
    );
    registerModal.fillRepeatPassword(this.user2.password);
    registerModal.selectors
      .repeatPasswordInput()
      .should("not.have.class", "is-invalid");
    baseModal.selectors.button("Register").should("not.be.disabled");
  });

  it("Register user with valid data successfully", function () {
    cy.registr(
      this.user2.name,
      this.user2.lastname,
      registeredEmail,
      this.user2.password,
    );
  });

  it("Login user", function () {
    cy.login(registeredEmail, this.user2.password);
  });
});
