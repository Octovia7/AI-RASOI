const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');
const { createPost , getAllposts , myposts} = require('../controllers/postController');

router.post('/create', authenticate, upload.single('image'), createPost);
router.get('/all' , authenticate,getAllposts)
router.get('/my',authenticate,myposts);

module.exports = router;

