export class FuelExpensesPage {
    selectors = {
        addAnExpense: () => cy.contains(".btn-primary", "Add an expense"),
        vehicleSelector: () => cy.get('select[name="carId"]'),
        mileageInput: () => cy.get('input[name="mileage"]'),
        numberOfLiters: () => cy.get('input[name="liters"]'),
        totalCost: () => cy.get('input[name="totalCost"]'),
        addButton: () => cy.contains(".btn-primary", "Add"),
    };

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

    checkVenicle(carName) {
        this.selectors.vehicleSelector().should("contain.text", carName);
    }
}
