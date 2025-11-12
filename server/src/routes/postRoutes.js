const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');
const { authenticate } = require('../middleware/auth');
const { postRules, postUpdateRules, validate } = require('../middleware/validation');

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', authenticate, postRules, validate, createPost);
router.put('/:id', authenticate, postUpdateRules, validate, updatePost);
router.delete('/:id', authenticate, deletePost);

module.exports = router;






