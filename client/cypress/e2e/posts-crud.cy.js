describe('Posts CRUD Operations E2E Tests', () => {
  let authToken;

  beforeEach(() => {
    // Setup: Login and get token
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/auth/login',
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    }).then((response) => {
      authToken = response.body.token;
      // Store token in localStorage or cookie for authenticated requests
      window.localStorage.setItem('token', authToken);
    });
  });

  it('should create a new post', () => {
    cy.intercept('POST', '/api/posts', {
      statusCode: 201,
      body: {
        _id: '123',
        title: 'New Post',
        content: 'Post content',
      },
    }).as('createPost');

    cy.visit('/posts/new');
    
    cy.get('input[name="title"]').type('New Post');
    cy.get('textarea[name="content"]').type('Post content');
    cy.get('button[type="submit"]').click();

    cy.wait('@createPost');
    cy.contains('New Post').should('be.visible');
  });

  it('should read and display posts', () => {
    cy.intercept('GET', '/api/posts', {
      statusCode: 200,
      body: [
        { _id: '1', title: 'Post 1', content: 'Content 1' },
        { _id: '2', title: 'Post 2', content: 'Content 2' },
      ],
    }).as('getPosts');

    cy.visit('/posts');
    cy.wait('@getPosts');

    cy.contains('Post 1').should('be.visible');
    cy.contains('Post 2').should('be.visible');
  });

  it('should update an existing post', () => {
    cy.intercept('PUT', '/api/posts/123', {
      statusCode: 200,
      body: {
        _id: '123',
        title: 'Updated Post',
        content: 'Updated content',
      },
    }).as('updatePost');

    cy.visit('/posts/123/edit');
    
    cy.get('input[name="title"]').clear().type('Updated Post');
    cy.get('button[type="submit"]').click();

    cy.wait('@updatePost');
    cy.contains('Updated Post').should('be.visible');
  });

  it('should delete a post', () => {
    cy.intercept('DELETE', '/api/posts/123', {
      statusCode: 200,
      body: { success: true },
    }).as('deletePost');

    cy.intercept('GET', '/api/posts', {
      statusCode: 200,
      body: [],
    }).as('getPostsAfterDelete');

    cy.visit('/posts');
    cy.get('[data-testid="delete-post-123"]').click();
    cy.get('[data-testid="confirm-delete"]').click();

    cy.wait('@deletePost');
    cy.wait('@getPostsAfterDelete');
  });

  it('should handle form validation errors', () => {
    cy.visit('/posts/new');
    
    cy.get('button[type="submit"]').click();
    
    // Should show validation errors
    cy.contains(/required/i).should('be.visible');
  });
});






