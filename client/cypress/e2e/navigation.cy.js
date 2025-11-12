describe('Navigation E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('shows the home page content', () => {
    cy.contains('MERN Testing & Reliability Dashboard').should('be.visible');
    cy.contains('Testing Toolkit').should('be.visible');
  });

  it('navigates to the login and register pages', () => {
    cy.contains('Login').click();
    cy.url().should('include', '/login');
    cy.contains('Sign In').should('be.visible');

    cy.contains('Register').click();
    cy.url().should('include', '/register');
    cy.contains('Create Account').should('be.visible');
  });

  it('handles 404 routes gracefully', () => {
    cy.visit('/nonexistent-page', { failOnStatusCode: false });
    cy.contains('404 — Page not found').should('be.visible');
    cy.contains('Back to dashboard').click();
    cy.url().should('eq', `${window.location.origin}/`);
  });
});






