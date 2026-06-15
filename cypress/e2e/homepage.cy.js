describe('Header and Footer Validation', () => {
    beforeEach(function () {
        cy.fixture('users').then(({ admin, user }) => {
            this.admin = admin
            this.user = user
            cy.visit('/', { auth: { username: this.admin.name, password: this.admin.password } });
        });
    })

    it("Header logo verification", () => {
        cy.get('header .header_logo')
            .should('have.attr', 'href', '/')
            .find('svg')
            .should('exist');
    })

    it("Menu verification", () => {
        cy.get('.header_nav').within(() => {
            cy.contains('a', 'Home')
                .should('have.attr', 'href', '/');
            cy.contains('button', 'About')
                .should('have.attr', 'appscrollto', 'aboutSection');
            cy.contains('button', 'Contacts')
                .should('have.attr', 'appscrollto', 'contactsSection');
        })
    })

    it("Button ( Sign in, Guest log in ) verification", () => {
        cy.get('header .header_right').within(() => {
            cy.contains('button', 'Guest log in')
                .should('be.visible');
            cy.contains('button', 'Sign In')
                .should('be.visible');
        })
    })

    it('Footer social block verification', () => {
        cy.get('.contacts_socials').within(() => {
            cy.get('span.icon-facebook')
                .closest('a.socials_link')
                .should('have.attr', 'href')
                .and('include', 'Hillel.IT.School');
            cy.get('span.icon-telegram')
                .closest('a.socials_link')
                .should('have.attr', 'href')
                .and('include', 'ithillel_kyiv');
            cy.get('span.icon-youtube')
                .closest('a.socials_link')
                .should('have.attr', 'href')
                .and('include', 'HillelITSchool');
            cy.get('span.icon-instagram')
                .closest('a.socials_link')
                .should('have.attr', 'href')
                .and('include', 'hillel_itschool');
            cy.get('span.icon-linkedin')
                .closest('a.socials_link')
                .should('have.attr', 'href')
                .and('include', 'ithillel');
        })
    })

    it('Footer logo verification', () => {
        cy.contains('.contacts_link', 'ithillel.ua')
            .should('be.visible')
            .should('have.attr', 'href', 'https://ithillel.ua');
    })

    it('Footer contact verification', () => {
        cy.contains('.contacts_link', 'support@ithillel.ua')
            .should('be.visible')
            .should('have.attr', 'href', 'mailto:developer@ithillel.ua');
    })
})