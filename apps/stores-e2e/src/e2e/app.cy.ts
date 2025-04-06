
describe('stores-e2e', () => {
  beforeEach(() => cy.visit('/dashboard'));
  it('should redirect to login page', () => {
    cy.url()
      .should('be.equal', 'http://localhost:4200/login')
  });
});
