export class ExpensesApi {

    createExpense(expenseData) {
        return cy.request({
            method: "POST",
            url: "api/expenses",
            body: expenseData,
            failOnStatusCode: false,
        });
    }
}