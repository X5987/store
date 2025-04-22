describe('stores-e2e', () => {
  beforeEach(() => cy.visit('/login'));

  it('should enable submit button when form is valid', () => {
    cy.get('#username').type('admin');
    cy.get('#password').type('admin');
    cy.get('#submitLogin').should('not.be.disabled').should('be.visible');
    cy.get('#submitLogin', { timeout: 5000 }).click();

    cy.visit('/dashboard');
    cy.url().should('be.equal', 'http://localhost:4200/dashboard');

    cy.get('lib-input-text input[id="prenom"]').as('prenom').should('exist');
    cy.get('@prenom').should('be.empty');
    cy.get('@prenom').focus();
    cy.get('@prenom').type('John');
    cy.get('@prenom').clear();
    cy.get('@prenom').should('be.empty')
    cy.get('@prenom').blur();
    cy.get('lib-input-text mat-error').should('exist');
    cy.get('lib-input-text mat-error').invoke('text').should('include', 'Prénom est requis');
    cy.get('@prenom').focus();
    cy.get('@prenom').type('sssssssssssssssssssss');
    cy.get('lib-input-text mat-error').invoke('text').should('include', 'Le nombre maximum 20 est atteint');
    cy.get('@prenom').type('   ');
    cy.get('lib-input-text mat-error').invoke('text').should('include', 'Le champ ne peut pas être vide ou contenir uniquement des espaces.');
    cy.get('@prenom').clear();
    cy.get('@prenom').type('John');

    cy.get('lib-input-text input[id="email"]').as('email').should('exist');
    cy.get('@email').should('be.empty');
    cy.get('@email').focus();
    cy.get('@email').type('allowed@example.com');
    cy.get('@email').clear();
    cy.get('@email').should('be.empty')
    cy.get('@email').blur();
    cy.get('lib-input-text mat-error').should('exist');
    cy.get('lib-input-text mat-error').invoke('text').should('include', 'Email est requis');
    cy.get('@email').focus();
    cy.get('@email').type('testtest.com');
    cy.get('lib-input-text mat-error').invoke('text').should('include', 'Format d’email invalide');
    cy.get('@email').blur();
    cy.get('@email').clear();
    cy.get('@email').focus();

    cy.get('@email').type('all owed  @example.com');  // ok
    cy.get('lib-input-text mat-error').invoke('text').should('include', 'Le champ ne peut pas être vide ou contenir uniquement des espaces.');
    cy.get('@email').blur();
    cy.get('@email').clear();

    // cy.get('@prenom').type('   ');
    // cy.get('@prenom').blur();
    // cy.get('lib-input-text mat-error').contains('Espaces non autorisés').should('exist');

    // cy.get('#mat-input-11', {timeout: 2000}).focus();
    // cy.get('#mat-input-12', {timeout: 2000}).focus();
    // cy.get('#mat-input-13', {timeout: 2000}).focus();
  });
});
