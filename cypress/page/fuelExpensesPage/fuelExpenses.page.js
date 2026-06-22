export class FuelExpensesPage {
  selectors = {
    fuelExpensesTitle: (title) =>
      cy.contains(".panel-page_heading", `${title}`),
    carSelect: () => cy.get("#carSelectDropdown"),
    dropDownItem: (carName) =>
      cy.contains(".car-select-dropdown_item", `${carName}`),
    addAnExpense: () => cy.contains(".btn-primary", "Add an expense"),
    vehicleSelector: () => cy.get('select[name="carId"]'),
    mileageInput: () => cy.get('input[name="mileage"]'),
    numberOfLiters: () => cy.get('input[name="liters"]'),
    totalCost: () => cy.get('input[name="totalCost"]'),
    addButton: () => cy.contains(".btn-primary", "Add"),
  };

  selectCar(carName) {
    this.selectors.carSelect().click();
    this.selectors.dropDownItem(carName).click();
  }

  clickButtonAddAnExpense() {
    this.selectors.addAnExpense().should("be.visible").click();
  }

  selectVehicle(carName) {
    this.selectors.vehicleSelector().select(carName);
  }

  fillMileage(mileage) {
    this.selectors.mileageInput().clear().type(mileage);
  }

  fillNumberOfLiters(liters) {
    this.selectors.numberOfLiters().clear().type(liters);
  }

  fillTotalCost(totalCost) {
    this.selectors.totalCost().clear().type(totalCost);
  }

  clickButtonAdd() {
    this.selectors.addButton().should("not.be.disabled").click();
  }

  checkFuelExpensesTitle(title) {
    this.selectors.fuelExpensesTitle(title).should("be.visible");
  }

  checkVenicle(carName) {
    this.selectors.vehicleSelector().should("contain.text", carName);
  }
}
