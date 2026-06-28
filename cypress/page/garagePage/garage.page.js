import { BaseModal } from "../baseModal";

export class GaragePage extends BaseModal {
  selectors = {
    ...this.selectors,
    garageTitle: (title) => cy.contains(".panel-page_heading", `${title}`),
    addCarButton: () => cy.contains(".panel-page button", "Add car"),
    brandSelector: () => cy.get("select[name='carBrandId']"),
    modelSelector: () => cy.get('select[name="carModelId"]'),
    mileageInput: () => cy.get('input[name="mileage"]'),
  };

  clickButtonAddCar() {
    this.selectors.addCarButton().should("be.visible").click();
  }

  selectBrand(brand) {
    this.selectors.brandSelector().select(brand);
  }

  selectModel(model) {
    this.selectors.modelSelector().select(model);
  }

  fillMileage(mileage) {
    this.selectors.mileageInput().clear().type(mileage);
  }

  clickButtonAdd(nameButton) {
    this.selectors.button(nameButton).should("not.be.disabled").click();
  }

  checkGarageTitle(title) {
    this.selectors.garageTitle(title).should("be.visible");
  }
}
