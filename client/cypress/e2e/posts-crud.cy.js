describe('Posts CRUD Operations E2E Tests', () => {
  const authPayload = {
    user: { id: '1', email: 'qa@example.com', username: 'qa-user' },
    token: 'mock-jwt',
  };

  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem('mern-auth', JSON.stringify(authPayload));
    });
  });

  it('should create a new post', () => {
    cy.intercept('POST', '/api/posts', {
      statusCode: 201,
      body: {
        _id: '123',
        title: 'New Post',
        content: 'Post content',
        category: 'testing',
      },
    }).as('createPost');

    cy.intercept('GET', '/api/posts/123', {
      statusCode: 200,
      body: {
        _id: '123',
        title: 'New Post',
        content: 'Post content',
        category: 'testing',
        author: { username: 'qa-user' },
      },
    }).as('getCreatedPost');

    cy.visit('/posts/new');

    cy.get('input[name="title"]').type('New Post');
    cy.get('textarea[name="content"]').type('Post content that meets the minimum length.');
    cy.get('input[name="category"]').type('testing');
    cy.get('button[type="submit"]').click();

    cy.wait('@createPost');
    cy.wait('@getCreatedPost');
    cy.url().should('include', '/posts/123');
  });

  it('should read and display posts', () => {
    cy.intercept('GET', '/api/posts', {
      statusCode: 200,
      body: [
        { _id: '1', title: 'Post 1', content: 'Content 1', category: 'testing' },
        { _id: '2', title: 'Post 2', content: 'Content 2', category: 'devops' },
      ],
    }).as('getPosts');

    cy.visit('/posts');
    cy.wait('@getPosts');
    cy.contains('Post 1').should('be.visible');
    cy.contains('Post 2').should('be.visible');
  });

  it('should update an existing post', () => {
    cy.intercept('GET', '/api/posts/123', {
      times: 1,
      statusCode: 200,
      body: { _id: '123', title: 'Original Post', content: 'Original content value', category: 'testing' },
    }).as('getPost');

    cy.intercept('PUT', '/api/posts/123', {
      statusCode: 200,
      body: { _id: '123', title: 'Updated Post', content: 'Updated content value', category: 'testing' },
    }).as('updatePost');

    cy.visit('/posts/123/edit');
    cy.wait('@getPost');

    cy.intercept('GET', '/api/posts/123', {
      statusCode: 200,
      body: { _id: '123', title: 'Updated Post', content: 'Updated content value', category: 'testing', author: { username: 'qa-user' } },
    }).as('getUpdatedPost');

    cy.get('input[name="title"]').clear().type('Updated Post');
    cy.get('button[type="submit"]').click();

    cy.wait('@updatePost');
    cy.wait('@getUpdatedPost');
    cy.url().should('include', '/posts/123');
    cy.contains('Updated Post').should('be.visible');
  });

  it('should delete a post', () => {
    cy.intercept('GET', '/api/posts', {
      statusCode: 200,
      body: [{ _id: '123', title: 'Disposable Post', content: 'To be removed', category: 'ops' }],
    }).as('getPosts');

    cy.intercept('DELETE', '/api/posts/123', {
      statusCode: 200,
      body: { success: true },
    }).as('deletePost');

    cy.visit('/posts');
    cy.wait('@getPosts');

    cy.on('window:confirm', () => true);
    cy.get('[data-testid="delete-post-123"]').click();

    cy.wait('@deletePost');
  });

  it('should handle form validation errors', () => {
    cy.visit('/posts/new');
    cy.get('button[type="submit"]').click();
    cy.contains('Title is required').should('be.visible');
    cy.contains('Content is required').should('be.visible');
    cy.contains('Category is required').should('be.visible');
  });
});






