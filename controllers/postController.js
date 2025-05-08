const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { caption, text } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    const post = new Post({
      user: req.user.id,
      caption,
      text,
      imageUrl,
    });

    await post.save();
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ error: 'Failed to create post' });
  }
};
// GET /api/posts/all
exports.getAllposts = async(req,res)=> {
    try {
      const posts = await Post.find()
        .populate('user', 'email profileImage') // include only email and profile image
        .sort({ createdAt: -1 }); // newest first
  
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  };
  // GET /api/posts/my
exports.myposts = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const posts = await Post.find({ user: userId }).sort({ createdAt: -1 });
  
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch your posts' });
    }
  };
  
  
