const Post = require('../models/Post');
const mongoose = require('mongoose');

/**
 * Get all posts with optional filtering and pagination
 */
const getPosts = async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const query = {};

    if (category) {
      query.category = category;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const posts = await Post.find(query)
      .populate('author', 'username email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      error: error.message || 'Error fetching posts',
    });
  }
};

/**
 * Get a single post by ID
 */
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username email');

    if (!post) {
      return res.status(404).json({
        error: 'Post not found',
      });
    }

    res.json(post);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        error: 'Post not found',
      });
    }
    res.status(500).json({
      error: error.message || 'Error fetching post',
    });
  }
};

/**
 * Create a new post
 */
const createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    
    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check if slug already exists
    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
      return res.status(400).json({
        error: 'A post with this title already exists',
      });
    }

    const post = await Post.create({
      title,
      content,
      category,
      author: req.user.id,
      slug,
    });

    const populatedPost = await Post.findById(post._id)
      .populate('author', 'username email');

    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(400).json({
      error: error.message || 'Error creating post',
    });
  }
};

/**
 * Update a post
 */
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        error: 'Post not found',
      });
    }

    // Check if user is the author
    if (post.author.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        error: 'You do not have permission to update this post',
      });
    }

    const { title, content } = req.body;
    const updates = {};

    if (title) {
      updates.title = title;
      // Update slug if title changed
      updates.slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    if (content) {
      updates.content = content;
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate('author', 'username email');

    res.json(updatedPost);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        error: 'Post not found',
      });
    }
    res.status(400).json({
      error: error.message || 'Error updating post',
    });
  }
};

/**
 * Delete a post
 */
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        error: 'Post not found',
      });
    }

    // Check if user is the author
    if (post.author.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        error: 'You do not have permission to delete this post',
      });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        error: 'Post not found',
      });
    }
    res.status(500).json({
      error: error.message || 'Error deleting post',
    });
  }
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};






