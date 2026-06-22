export class BaseModal {
  selectors = {
    modalContent: () => cy.get(".modal-content"),
    modalTitle: () => cy.get(".modal-title"),
    emailInput: () => cy.get("input[name='email']"),
    passwordInput: () => cy.get("input[name='password']"),
    button: (nameButton) => cy.contains("button", `${nameButton}`),
  };
  successMessage = {
    alertSuccess: (message) => cy.contains(".alert-success", `${message}`),
  };

  checkSuccessMessage(message) {
    this.successMessage.alertSuccess(message).should("be.visible");
  }

  checkModalTitle(titleName) {
    this.selectors.modalTitle().should("have.text", titleName);
  }
}
