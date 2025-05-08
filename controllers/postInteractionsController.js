const Post = require('../models/Post');

// Like or Unlike a post
exports.toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const userId = req.user.id;
    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes.pull(userId); // Unlike
    } else {
      post.likes.push(userId); // Like
    }

    await post.save();
    res.status(200).json({ message: alreadyLiked ? 'Unliked' : 'Liked', likes: post.likes.length });
  } catch (err) {
    res.status(500).json({ error: 'Failed to toggle like' });
  }
};

// Add comment to a post
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Comment text is required' });

    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    post.comments.push({
      user: req.user.id,
      text,
    });

    await post.save();
    res.status(201).json({ message: 'Comment added', comments: post.comments });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};
