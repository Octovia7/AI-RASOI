// models/Image.js
const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  recipe: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }, // optional
  uploadedAt: { type: Date, default: Date.now },
  altText: String,
});

module.exports = mongoose.model("Image", imageSchema);
