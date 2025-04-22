
describe('stores-e2e', () => {
  beforeEach(() => cy.visit('/login'));

  it('should keep submit button disabled with invalid input', () => {
    cy.get('#username').type('test');
    cy.get('#password').type('test');
    cy.get('#username').clear();
    cy.get('#password').clear();
    cy.get('mat-error').should('be.visible', {timeout: 2000});
  });

  it('should enable submit button when form is valid', () => {
    cy.get('#username').type('admin');
    cy.get('#password').type('admin');
    cy.get('#submitLogin').should('not.be.disabled').should('be.visible');
    cy.get('#submitLogin').click();
  });

  it('should error when username is not valid', () => {
    cy.get('#username').type('admin');
    cy.get('#username').clear();
    cy.get('#username').focus();
    cy.get('#username').blur();
    cy.get('mat-error')
      .should('be.visible')
      .and('contain', 'Mot de passe est requis', { timeout: 2000 });
  });

  it('should error when username is not valid', () => {
    cy.get('#password').type('admin');
    cy.get('#password').clear();
    cy.get('#password').focus();
    cy.get('#password').blur();
    cy.get('mat-error')
      .should('be.visible')
      .and('contain', 'Mot de passe est requis', { timeout: 2000 });
  });
});
