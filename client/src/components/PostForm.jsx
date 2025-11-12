import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PostForm = ({ initialValues = null, onSubmit, submitting = false }) => {
  const [formData, setFormData] = useState({
    title: initialValues?.title || '',
    content: initialValues?.content || '',
    category: initialValues?.category || '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const nextErrors = {};
    const titleTrimmed = formData.title.trim();
    const contentTrimmed = formData.content.trim();
    const categoryTrimmed = formData.category.trim();

    if (!titleTrimmed) {
      nextErrors.title = 'Title is required';
    } else if (titleTrimmed.length < 3) {
      nextErrors.title = 'Title must be at least 3 characters';
    }

    if (!contentTrimmed) {
      nextErrors.content = 'Content is required';
    } else if (contentTrimmed.length < 10) {
      nextErrors.content = 'Content must be at least 10 characters';
    }

    if (!categoryTrimmed) {
      nextErrors.category = 'Category is required';
    } else if (categoryTrimmed.length < 2) {
      nextErrors.category = 'Category must be at least 2 characters';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const titleTrimmed = formData.title.trim();
    const contentTrimmed = formData.content.trim();
    const categoryTrimmed = formData.category.trim();
    if (!validate()) return;
    onSubmit({
      title: titleTrimmed,
      content: contentTrimmed,
      category: categoryTrimmed,
    });
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows="6"
          value={formData.content}
          onChange={handleChange}
          className={errors.content ? 'error' : ''}
        />
        {errors.content && <span className="error-message">{errors.content}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <input
          id="category"
          name="category"
          type="text"
          placeholder="e.g. testing"
          value={formData.category}
          onChange={handleChange}
          className={errors.category ? 'error' : ''}
        />
        {errors.category && <span className="error-message">{errors.category}</span>}
      </div>

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? 'Saving...' : 'Save Post'}
      </button>
    </form>
  );
};

PostForm.propTypes = {
  initialValues: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    category: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
};

export default PostForm;

