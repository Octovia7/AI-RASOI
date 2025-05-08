const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload'); // multer with Cloudinary
const { uploadProfileImage } = require('../controllers/imageController');

// PUT /api/users/profile-image
router.put('/profile-image', authenticate, upload.single('image'), uploadProfileImage);

module.exports = router;

module.exports = router;
