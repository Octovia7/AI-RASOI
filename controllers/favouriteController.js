const FavouriteRecipe = require("../models/FavouriteRecipe");

const addToFavourites = async (req, res) => {
  console.log("Request Body:", req.body); // Log the request body to ensure we have the correct structure
  
  // Destructure to get the recipe object
  const { recipe } = req.body;
  
  // Check if the recipe object exists and if it contains _id
  const recipeId = recipe ? recipe._id : null;
  
  if (!recipeId) {
    return res.status(400).json({ message: "Recipe ID is required" });
  }

  const userId = req.user.id;  // assuming you are using JWT auth middleware to get user id

  try {
    // Check if the recipe is already in the user's favourites
    const exists = await FavouriteRecipe.findOne({ user: userId, recipe: recipeId });

    if (exists) {
      return res.status(400).json({ message: "Recipe is already in your favourites" });
    }

    // Create a new favourite
    const favourite = new FavouriteRecipe({ user: userId, recipe: recipeId });
    await favourite.save();

    // Return success response
    res.status(201).json({ message: "Recipe added to favourites", favourite });
  } catch (err) {
    console.error("Error adding to favourites:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


const removeFromFavourites = async (req, res) => {
  const { recipe } = req.body;  // Destructuring to get the full recipe object
  const recipeId = recipe ? recipe._id : null;  // Extract the recipe ID safely
  const userId = req.user.id;

  // Check if recipeId is provided
  if (!recipeId) {
    return res.status(400).json({ message: "Recipe ID is required" });
  }

  try {
    // Remove the recipe from favourites
    const removed = await FavouriteRecipe.findOneAndDelete({ user: userId, recipe: recipeId });
    
    if (!removed) {
      return res.status(404).json({ message: "Recipe not found in your favourites" });
    }

    // Return success response
    res.status(200).json({ message: "Recipe removed from favourites" });
  } catch (err) {
    console.error("Error removing from favourites:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getFavourites = async (req, res) => {
  const userId = req.user.id;

  try {
    // Get all the favourite recipes for the user, populated with full recipe data
    const favourites = await FavouriteRecipe.find({ user: userId }).populate("recipe");

    // If the user has no favourites
    if (favourites.length === 0) {
      return res.status(404).json({ message: "No favourite recipes found" });
    }

    // Extract only the recipe details from the favourites
    const recipeList = favourites.map(fav => fav.recipe);

    // Return the list of favourite recipes
    res.status(200).json({
      success: true,
      favourites: recipeList,
    });
  } catch (err) {
    console.error("Failed to fetch favourites:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { addToFavourites, removeFromFavourites, getFavourites };
