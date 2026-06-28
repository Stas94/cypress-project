import { BaseModal } from "../baseModal";

export class LoginModalPage extends BaseModal {
  fillEmail(email) {
    this.selectors.emailInput().clear().type(email);
  }

  fillPassword(password) {
    this.selectors.passwordInput().clear().type(password, { sensitive: true });
  }

  clickButtonLogin(nameButton) {
    this.selectors.button(nameButton).should("not.be.disabled").click();
  }

  openLoginModal(modalTitle) {
    cy.contains(".header_signin", "Sign In").should("be.visible").click();
    this.checkModalTitle(modalTitle);
  }
}
