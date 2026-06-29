import { LeftNavBar } from "../sharedComponents";

export class ExpensesPage {
    leftNavBar = new LeftNavBar();

    selectors = {
        fuelExpensesTitle: (title) =>
            cy.contains(".panel-page_heading", `${title}`),
        dropDownItem: (carName) =>
            cy.contains(".car-select-dropdown_item", `${carName}`),
        selectCar: () => cy.get("#carSelectDropdown"),
        expenseTable: () => cy.get("table.expenses_table tbody tr td"),
    }

    selectCar(carName) {
        this.selectors.selectCar().click();
        this.selectors.dropDownItem(carName).click();
    }

    checkFuelExpensesTitle(title) {
        this.selectors.fuelExpensesTitle(title).should("be.visible");
    }

    checkExpenseInTable(expenseData) {
        this.selectors.expenseTable()
            .should('contain', expenseData.reportedAt.toISOString().split('T')[0].split('-').reverse().join('.'))
            .and('contain', expenseData.mileage)
            .and('contain', `${expenseData.liters}L`)
            .and('contain', `${expenseData.totalCost}.00 USD`)
    }
}
