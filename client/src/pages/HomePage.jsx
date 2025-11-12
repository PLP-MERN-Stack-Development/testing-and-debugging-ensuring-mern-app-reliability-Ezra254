import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <section className="page">
    <h1>MERN Testing & Reliability Dashboard</h1>
    <p>
      Welcome! This project demonstrates comprehensive testing strategies for a MERN stack
      application: unit, integration, end-to-end, and debugging tooling.
    </p>

    <div className="home-grid">
      <article>
        <h2>Authentication</h2>
        <p>
          Register or sign in to unlock protected features. Auth state persists across page reloads
          using secure JWT tokens stored via our custom <code>useLocalStorage</code> hook.
        </p>
        <Link to="/login" className="btn btn-primary">Sign In</Link>
        <Link to="/register" className="btn btn-secondary">Register</Link>
      </article>

      <article>
        <h2>Posts</h2>
        <p>
          Explore integration-tested CRUD APIs backed by MongoDB. Logged-in users can create,
          update, and delete posts; visitors can browse and read.
        </p>
        <Link to="/posts" className="btn btn-primary">View Posts</Link>
      </article>

      <article>
        <h2>Testing Toolkit</h2>
        <ul>
          <li>Jest + Testing Library unit tests (client & server)</li>
          <li>Supertest integration coverage for API endpoints</li>
          <li>Cypress end-to-end suites for mission-critical flows</li>
          <li>Error boundaries, structured logging, and performance monitors</li>
        </ul>
      </article>
    </div>
  </section>
);

export default HomePage;

