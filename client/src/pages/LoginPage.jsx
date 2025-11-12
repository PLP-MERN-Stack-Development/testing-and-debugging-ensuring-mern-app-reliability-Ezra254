import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/posts';

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      await login(formData);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err?.response?.data?.error || err.message || 'Unable to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page">
      <h1>Sign In</h1>
      <p className="page__intro">
        Access protected routes, create posts, and interact with the app end-to-end.
      </p>
      {error && <div className="alert alert-error">{error}</div>}
      <LoginForm onSubmit={handleSubmit} loading={loading} />
      <p>
        Need an account? <Link to="/register">Register here</Link>.
      </p>
    </section>
  );
};

export default LoginPage;

