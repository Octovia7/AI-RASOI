const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  recipe: { type: String, required: true },  // Store the full recipe text
  title: String,  // Can extract from the recipe text if necessary
  calories: String, // Optional
  spiceLevel: String, // Optional
  regionalStyle: String, // Optional
  momTip: String, // Optional
  macronutrients: { 
    protein: String, 
    carbohydrates: String, 
    fats: String, 
    fiber: String 
  }, 
  preferences: String, // Optional
  imageUrl: String, // Cloudinary URL for image
}, { timestamps: true });

module.exports = mongoose.model("Recipe", recipeSchema);
