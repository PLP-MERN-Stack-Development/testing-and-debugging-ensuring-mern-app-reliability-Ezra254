describe('Login Flow E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login form', () => {
    cy.contains('Sign In').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('contain', 'Login');
  });

  it('should show validation errors for invalid email', () => {
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('input[name="password"]').type('Password123');
    cy.get('button[type="submit"]').click();
    cy.contains('Please enter a valid email address').should('be.visible');
  });

  it('should show validation errors for weak password', () => {
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('short');
    cy.get('button[type="submit"]').click();
    cy.contains('Password must be at least 8 characters').should('be.visible');
  });

  it('should successfully submit valid login form', () => {
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 200,
      body: {
        success: true,
        user: { id: '1', email: 'test@example.com', username: 'testuser' },
        token: 'mock-jwt-token',
      },
    }).as('loginRequest');

    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('Password123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    cy.url().should('include', '/posts');
    cy.contains('Hi, testuser').should('be.visible');
    cy.contains('Logout').should('be.visible');
  });

  it('should handle login API errors', () => {
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 401,
      body: { error: 'Invalid credentials' },
    }).as('loginError');

    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('Wrongpass1');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginError');
    cy.contains('Invalid credentials').should('be.visible');
  });
});






