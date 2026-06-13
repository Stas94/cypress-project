describe("Basic navigation to qauto site", () => {
    before(function () {
        cy.fixture('users').then(({ admin, user }) => {
            this.admin = admin
            this.user = user
        })
    })

    it("Should navigation to qauto site and login", function () {
        cy.visit('/', { auth: { username: this.admin.name, password: this.admin.password } });
        cy.contains('.header_signin', 'Sign In');
        cy.get('.header_signin').click();
        cy.get('#signinEmail').type(this.user.email);
        cy.get('#signinEmail').should('have.value', this.user.email)
        cy.get('#signinPassword').type(this.user.password);
        cy.get('#signinPassword').should('have.value', this.user.password)
        cy.get('.modal-content .modal-footer').contains('.btn-primary', 'Login').click();
        cy.contains('Log out').should('be.visible');
    })
})