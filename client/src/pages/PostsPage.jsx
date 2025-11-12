import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { fetchPosts, deletePost } from '../services/postService';
import { useAuth } from '../context/AuthContext';

const PostsPage = () => {
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPosts();
      setPosts(data);
    } catch (err) {
      setError(err?.response?.data?.error || err.message || 'Unable to load posts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handleDelete = async (postId) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await deletePost(postId);
      setPosts((prev) => prev.filter((post) => post._id !== postId));
    } catch (err) {
      setError(err?.response?.data?.error || err.message || 'Unable to delete post');
    }
  };

  return (
    <section className="page">
      <header className="page__header">
        <div>
          <h1>Knowledge Base Posts</h1>
          <p>
            This feed is backed by the Express/Mongo API and fully covered with integration tests.
            Use it to exercise the MERN testing workflow.
          </p>
        </div>
        {isAuthenticated && (
          <Link to="/posts/new" className="btn btn-primary">
            Create Post
          </Link>
        )}
      </header>

      {loading && <div className="loader">Loading posts…</div>}
      {error && <div className="alert alert-error">{error}</div>}

      {!loading && posts.length === 0 && (
        <div className="empty-state">
          <p>No posts yet. Be the first to publish a testing insight!</p>
          {isAuthenticated && (
            <Link to="/posts/new" className="btn btn-secondary">
              Share a post
            </Link>
          )}
        </div>
      )}

      <div className="post-grid">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onDelete={isAuthenticated ? handleDelete : undefined}
          />
        ))}
      </div>
    </section>
  );
};

export default PostsPage;

