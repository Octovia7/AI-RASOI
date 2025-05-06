const Recipe = require("../models/Recipe");

const createRecipe = async (req, res) => {
  try {
    const { recipe } = req.body;

    const getMatchValue = (pattern) => {
      const match = recipe.match(pattern);
      return match ? match[1].trim().replace(/^\*+/, "").trim() : "Unknown";
    };

    const title = getMatchValue(/Dish Name:\*?\s*(.*)/i);
    const spiceLevel = getMatchValue(/Spice Level:\*?\s*(.*)/i);
    const regionalStyle = getMatchValue(/Regional Style:\*?\s*(.*)/i);
    const momTip = getMatchValue(/Mom's Tip:\*?\s*(.*)/i);

    const caloriesMatch = recipe.match(/Calories:\*?\s*~?\s*(\d+[-–]?\d*)\s*kcal/i);
    const proteinMatch = recipe.match(/Protein:\s*(?:~|Approximately)?\s*(\d+[-–]?\d*)\s*grams/i);
    const carbsMatch = recipe.match(/Carbohydrates:\s*(?:~|Approximately)?\s*(\d+[-–]?\d*)\s*grams/i);
    const fatsMatch = recipe.match(/Fats:\s*(?:~|Approximately)?\s*(\d+[-–]?\d*)\s*grams/i);
    const fiberMatch = recipe.match(/Fibre|Fiber:\s*(?:~|Approximately)?\s*(\d+[-–]?\d*)\s*grams/i);
    

    const calories = caloriesMatch ? caloriesMatch[1] : "Unknown";

    const macronutrients = {
      protein: proteinMatch ? proteinMatch[1] : "Unknown",
      carbohydrates: carbsMatch ? carbsMatch[1] : "Unknown",
      fats: fatsMatch ? fatsMatch[1] : "Unknown",
      fiber: fiberMatch ? fiberMatch[1] : "Unknown"
    };

    const recipeData = {
      user: req.user._id,
      recipe,
      title,
      spiceLevel,
      calories,
      regionalStyle,
      momTip,
      macronutrients,
    };

    const newRecipe = new Recipe(recipeData);
    await newRecipe.save();

    res.status(201).json({ success: true, recipe: newRecipe });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { createRecipe };
