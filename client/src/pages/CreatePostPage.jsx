import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';
import { createPost } from '../services/postService';

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    setError(null);
    try {
      const post = await createPost(values);
      navigate(`/posts/${post._id}`);
    } catch (err) {
      setError(err?.response?.data?.error || err.message || 'Unable to create post');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="page">
      <h1>Share a Testing Insight</h1>
      <p className="page__intro">
        Add a new article to the knowledge base. The API is covered with integration tests to
        guarantee a smooth authoring experience.
      </p>
      {error && <div className="alert alert-error">{error}</div>}
      <PostForm onSubmit={handleSubmit} submitting={submitting} />
    </section>
  );
};

export default CreatePostPage;

