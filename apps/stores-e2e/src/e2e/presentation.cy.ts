
describe('stores-e2e', () => {
  beforeEach(() => cy.visit('/presentation'));

  it('should ', () => {
    cy.get('#username').type('test');
    cy.get('#password').type('test');
    cy.get('#username').clear();
    cy.get('#password').clear();
    cy.get('mat-error').should('be.visible', {timeout: 2000});
  });



});
