// controllers/imageController.js
const Image = require("../models/Image");
const cloudinary = require("../utils/cloudinary"); // adjust path if needed

const uploadImage = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ success: false, error: "No image file provided" });
    }

    // Upload image to Cloudinary
    const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "ai-rasoi", // Optional: custom folder name
    });

    // Save image info to MongoDB
    const image = new Image({
      url: cloudinaryResult.secure_url,
      publicId: cloudinaryResult.public_id,
      uploadedBy: req.user._id,
      altText: req.body.altText || "",
    });

    await image.save();
    res.status(201).json({ success: true, image });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { uploadImage };
