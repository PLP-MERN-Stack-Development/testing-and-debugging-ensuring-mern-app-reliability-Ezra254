import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostForm from '../../components/PostForm';

describe('PostForm Component', () => {
  const defaultValues = {
    title: 'Sample Post',
    content: 'Sample content that is definitely long enough.',
    category: 'testing',
  };

  it('renders initial values', () => {
    render(<PostForm initialValues={defaultValues} onSubmit={jest.fn()} />);
    expect(screen.getByDisplayValue('Sample Post')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Sample content that is definitely long enough.')).toBeInTheDocument();
    expect(screen.getByDisplayValue('testing')).toBeInTheDocument();
  });

  it('validates required fields', () => {
    render(<PostForm onSubmit={jest.fn()} />);
    fireEvent.submit(screen.getByRole('button', { name: /save post/i }));

    expect(screen.getAllByText(/required/i)).toHaveLength(3);
  });

  it('invokes onSubmit with form data', () => {
    const handleSubmit = jest.fn();
    render(<PostForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Title' } });
    fireEvent.change(screen.getByLabelText(/content/i), { target: { value: 'Valid content for a new post.' } });
    fireEvent.change(screen.getByLabelText(/category/i), { target: { value: 'devops' } });

    fireEvent.submit(screen.getByRole('button', { name: /save post/i }));

    expect(handleSubmit).toHaveBeenCalledWith({
      title: 'New Title',
      content: 'Valid content for a new post.',
      category: 'devops',
    });
  });
});

