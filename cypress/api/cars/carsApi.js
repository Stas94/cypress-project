export class CarsApi {
    
    getCars() {
        return cy.request({
            method: "GET",
            url: "api/cars",
            failOnStatusCode: false,
        });
    }
}