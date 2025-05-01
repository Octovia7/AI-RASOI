const express = require("express");
const router = express.Router();
const { createRecipe } = require("../controllers/recipeController");
const authenticate = require("../middlewares/authMiddleware");
router.post("/",authenticate, createRecipe);

module.exports = router;
