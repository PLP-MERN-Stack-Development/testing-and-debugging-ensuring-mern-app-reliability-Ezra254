import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePassword, validateUsername } from '../utils/validate';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const validate = () => {
    const nextErrors = {};
    if (!validateUsername(formData.username)) {
      nextErrors.username = 'Username must be 3-20 characters (letters/numbers only)';
    }
    if (!validateEmail(formData.email)) {
      nextErrors.email = 'Enter a valid email address';
    }
    if (!validatePassword(formData.password)) {
      nextErrors.password = 'Password must be 8+ chars with letters and numbers';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setApiError(null);
    try {
      await register(formData);
      navigate('/posts');
    } catch (error) {
      setApiError(error?.response?.data?.error || error.message || 'Unable to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page">
      <h1>Create Account</h1>
      <p className="page__intro">
        Set up your testing workspace by registering a new account. You can immediately create posts
        and run end-to-end journeys.
      </p>
      {apiError && <div className="alert alert-error">{apiError}</div>}
      <form className="register-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? 'error' : ''}
          />
          {errors.username && <span className="error-message">{errors.username}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>

      <p>
        Already have an account? <Link to="/login">Back to login</Link>.
      </p>
    </section>
  );
};

export default RegisterPage;

