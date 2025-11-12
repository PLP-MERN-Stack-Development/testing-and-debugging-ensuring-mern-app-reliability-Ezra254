import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <section className="page">
    <h1>404 — Page not found</h1>
    <p>The page you are looking for might have been removed or relocated.</p>
    <Link to="/" className="btn btn-primary">
      Back to dashboard
    </Link>
  </section>
);

export default NotFoundPage;

