import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import LoginForm from '../../components/LoginForm';

// Mock axios
jest.mock('axios');

describe('Login Flow Integration Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('completes full login flow successfully', async () => {
    const mockUser = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
    };
    const mockToken = 'mock-jwt-token';
    
    axios.post.mockResolvedValue({
      data: {
        success: true,
        user: mockUser,
        token: mockToken,
      },
    });

    const handleLogin = jest.fn(async (formData) => {
      const response = await axios.post('/api/auth/login', formData);
      return response.data;
    });

    render(<LoginForm onSubmit={handleLogin} />);

    // Fill form
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Submit form
    fireEvent.click(submitButton);

    // Wait for API call
    await waitFor(() => {
      expect(handleLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });

    expect(axios.post).toHaveBeenCalledWith('/api/auth/login', {
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('handles login API errors', async () => {
    axios.post.mockRejectedValue({
      response: {
        data: {
          error: 'Invalid credentials',
        },
      },
    });

    const handleLogin = jest.fn(async (formData) => {
      try {
        await axios.post('/api/auth/login', formData);
      } catch (error) {
        return error.response?.data;
      }
    });

    render(<LoginForm onSubmit={handleLogin} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpass1' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(handleLogin).toHaveBeenCalled();
    });
  });
});






