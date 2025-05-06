const express = require("express");
const router = express.Router();
const { addToFavourites, removeFromFavourites, getFavourites } = require("../controllers/favouriteController");
const authenticate = require("../middlewares/authMiddleware");

router.post("/add",authenticate, addToFavourites);
router.post("/remove",authenticate, removeFromFavourites);
router.get("/",authenticate, getFavourites);

module.exports = router;
