describe('Navigation E2E Tests', () => {
  it('should navigate between pages', () => {
    cy.visit('/');
    
    // Test navigation to different routes
    // Adjust based on your actual routes
    cy.get('a[href="/login"]').click();
    cy.url().should('include', '/login');
    
    cy.get('a[href="/"]').click();
    cy.url().should('not.include', '/login');
  });

  it('should maintain navigation state', () => {
    cy.visit('/');
    // Add navigation tests specific to your app
  });

  it('should handle 404 routes gracefully', () => {
    cy.visit('/nonexistent-page', { failOnStatusCode: false });
    // Add assertion for 404 page
  });
});






