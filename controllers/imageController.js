// controllers/imageController.js
const Image = require("../models/Image");
const cloudinary = require("../utils/cloudinary"); // adjust path if needed
const User = require('../models/userModel');

// exports.uploadImage = async (req, res) => {
//   try {
//     if (!req.file || !req.file.path) {
//       return res.status(400).json({ success: false, error: "No image file provided" });
//     }

//     // Upload image to Cloudinary
//     const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
//       folder: "ai-rasoi", // Optional: custom folder name
//     });

//     // Save image info to MongoDB
//     const image = new Image({
//       url: cloudinaryResult.secure_url,
//       publicId: cloudinaryResult.public_id,
//       uploadedBy: req.user._id,
//       altText: req.body.altText || "",
//     });

//     await image.save();
//     res.status(201).json({ success: true, image });

//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };
// exports.uploadProfileImage = async (req, res) => {
//   try {
//     if (!req.file || !req.file.path) {
//       return res.status(400).json({ error: 'No image uploaded' });
//     }

//     const userId = req.user.id;

//     const user = await User.findByIdAndUpdate(
//       userId,
//       { profileImage: req.file.path },
//       { new: true }
//     ).select('-password');

//     res.status(200).json({
//       message: 'Profile image updated successfully',
//       profileImage: user.profileImage,
//     });
//   } catch (err) {
//     console.error('Upload error:', err);
//     res.status(500).json({ error: 'Failed to upload profile image' });
//   }
// };
exports.uploadProfileImage = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const userId = req.user.id;

    const user = await User.findByIdAndUpdate(
      userId,
      { profileImage: req.file.path },
      { new: true }
    ).select('-password');

    res.status(200).json({
      message: 'Profile image updated successfully',
      profileImage: user.profileImage,
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Failed to upload profile image' });
  }
};

// module.exports = { uploadImage };
