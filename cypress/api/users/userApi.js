export class UserApi {
    
    createUser(user) {
        return cy.request({
            method: "POST",
            url: "api/auth/signup",
            body: user,
            failOnStatusCode: false,
        });
    }

    deleteUser() {
        return cy.request({
            method: "DELETE",
            url: `api/users`,
        });
    }
}