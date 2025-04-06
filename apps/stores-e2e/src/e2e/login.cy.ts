
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
  });
});
