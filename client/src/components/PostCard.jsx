import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDate, formatRelativeTime } from '../utils/formatDate';

const PostCard = ({ post, onDelete }) => (
  <article className="post-card" data-testid="post-card">
    <header className="post-card__header">
      <div>
        <h3>
          <Link to={`/posts/${post._id}`}>{post.title}</Link>
        </h3>
        <span className="post-card__meta">
          {formatRelativeTime(post.createdAt)} · {formatDate(post.createdAt)}
        </span>
      </div>
      {post.category && <span className="post-card__category">{post.category}</span>}
    </header>
    <p className="post-card__content">{post.content}</p>
    <footer className="post-card__footer">
      <span className="post-card__author">Author: {post?.author?.username || 'Unknown'}</span>
      {onDelete && (
        <button
          type="button"
          className="btn btn-danger btn-sm"
          data-testid={`delete-post-${post._id}`}
          onClick={() => onDelete(post._id)}
        >
          Delete
        </button>
      )}
    </footer>
  </article>
);

PostCard.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
    author: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
  onDelete: PropTypes.func,
};

PostCard.defaultProps = {
  onDelete: null,
};

export default PostCard;

