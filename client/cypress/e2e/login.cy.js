describe('Login Flow E2E Tests', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('/login');
  });

  it('should display login form', () => {
    cy.get('form').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should show validation errors for invalid email', () => {
    cy.get('input[type="email"]').type('invalid-email');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    
    cy.contains(/valid email/i).should('be.visible');
  });

  it('should show validation errors for weak password', () => {
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('short');
    cy.get('button[type="submit"]').click();
    
    cy.contains(/password must be at least 8/i).should('be.visible');
  });

  it('should successfully submit valid login form', () => {
    // Intercept the API call
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 200,
      body: {
        success: true,
        user: {
          id: 1,
          email: 'test@example.com',
          username: 'testuser',
        },
        token: 'mock-jwt-token',
      },
    }).as('loginRequest');

    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    // Add assertions for successful login (e.g., redirect, token storage)
  });

  it('should handle login API errors', () => {
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 401,
      body: {
        error: 'Invalid credentials',
      },
    }).as('loginError');

    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginError');
    // Add assertions for error handling
  });
});






