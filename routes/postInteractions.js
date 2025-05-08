const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');
const {
  toggleLike,
  addComment,getComments
} = require('../controllers/postInteractionsController');

// Like or Unlike a post
router.put('/:postId/like', authenticate, toggleLike);

// Add a comment to a post
router.post('/:postId/comment', authenticate, addComment);
router.get('/:postId/comments', authenticate, getComments);

module.exports = router;
