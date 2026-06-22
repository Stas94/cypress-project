import { faker } from "@faker-js/faker";

const registeredEmail = faker.internet.email({ provider: "example.com" });
const registerPassword = faker.internet.password();

describe("Basic navigation to qauto site", () => {
  beforeEach(function () {
    cy.fixture("users").then(({ admin, userWithoutPasswordAndEmail }) => {
      this.userWithoutPasswordAndEmail = userWithoutPasswordAndEmail;
      cy.visit("/", {
        auth: { username: admin.name, password: admin.password },
      });
    });
  });

  it("Register user", function () {
    cy.registr(
      this.userWithoutPasswordAndEmail.name,
      this.userWithoutPasswordAndEmail.lastname,
      registeredEmail,
      registerPassword,
    );
  });

  it("Should navigation to qauto site and login", function () {
    cy.login(registeredEmail, registerPassword);
  });
});
