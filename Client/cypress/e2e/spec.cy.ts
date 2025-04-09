describe('Main Page: ', () => {
  it('Ensure that the Main Page loads', () => {
    cy.visit('/')
    cy.contains('Tracker')
    cy.url().should('include', '/localhost:4200')
  })

  it('Ensure that Login successfully validates, when correct Account Data is entered', () => {
    cy.visit('/');
    cy.get('[data-testid="login#username"]').type('Louis Ferro');
    cy.get('[data-testid="login#password"]').type('password');
    cy.get('[data-testid="login"]').click();
  });

  it('Ensure that Login Button is disabled, when incorrect Account Data is entered', () => {
    cy.visit('/');
    cy.get('[data-testid="login#username"]');
    cy.get('[data-testid="login#password"]');
    cy.get('[data-testid="login"]').should('be.disabled');
  });

  it('Ensure that Login successfully validates, when an Account is successfully registered and when correct Account Data is entered.', () => {
    cy.visit('/');
    cy.get('[data-testid="register#username"]').type('Andreas Schenk');
    cy.get('[data-testid="register#password"]').type('password');
    cy.get('[data-testid="register#password2"]').type('password');
    cy.get('[data-testid="register#email"]').type('schenk@spengergasse.at');
    cy.get('[data-testid="register#email2"]').type('schenk@spengergasse.at');
    cy.get('[data-testid="register"]').click();

    cy.get('[data-testid="login#username"]').type('Andreas Schenk');
    cy.get('[data-testid="login#password"]').type('password');
    cy.get('[data-testid="login"]').click();
  });
})
