import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchPostById, deletePost } from '../services/postService';
import { useAuth } from '../context/AuthContext';
import { formatDate, formatRelativeTime } from '../utils/formatDate';

const PostDetailPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPostById(postId);
        setPost(data);
      } catch (err) {
        setError(err?.response?.data?.error || err.message || 'Unable to load post');
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [postId]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await deletePost(postId);
      navigate('/posts');
    } catch (err) {
      setError(err?.response?.data?.error || err.message || 'Unable to delete post');
    }
  };

  if (loading) return <div className="loader">Loading post…</div>;
  if (error) return <div className="alert alert-error">{error}</div>;
  if (!post) return null;

  return (
    <section className="page">
      <Link to="/posts" className="btn btn-secondary btn-sm">← Back to posts</Link>
      <article className="post-detail">
        <header>
          <h1>{post.title}</h1>
          <p className="post-detail__meta">
            Published {formatRelativeTime(post.createdAt)} · {formatDate(post.createdAt)}
          </p>
        </header>
        <p className="post-detail__content">{post.content}</p>
        <footer>
          <p><strong>Author:</strong> {post?.author?.username || 'Unknown'}</p>
          <p><strong>Category:</strong> {post?.category || 'n/a'}</p>
        </footer>
      </article>
      {isAuthenticated && (
        <div className="post-detail__actions">
          <Link to={`/posts/${postId}/edit`} className="btn btn-primary">
            Edit Post
          </Link>
          <button type="button" className="btn btn-danger" onClick={handleDelete}>
            Delete Post
          </button>
        </div>
      )}
    </section>
  );
};

export default PostDetailPage;

