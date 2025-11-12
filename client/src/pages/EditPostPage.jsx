import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostForm from '../components/PostForm';
import { fetchPostById, updatePost } from '../services/postService';

const EditPostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const post = await fetchPostById(postId);
        setInitialValues({
          title: post.title,
          content: post.content,
          category: post.category || '',
        });
      } catch (err) {
        setError(err?.response?.data?.error || err.message || 'Unable to load post');
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [postId]);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    setError(null);
    try {
      await updatePost(postId, values);
      navigate(`/posts/${postId}`);
    } catch (err) {
      setError(err?.response?.data?.error || err.message || 'Unable to update post');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loader">Loading post…</div>;
  if (error) return <div className="alert alert-error">{error}</div>;
  if (!initialValues) return null;

  return (
    <section className="page">
      <h1>Edit Post</h1>
      <PostForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </section>
  );
};

export default EditPostPage;

