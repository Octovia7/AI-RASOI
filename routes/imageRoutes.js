// routes/imageRoutes.js
const express = require("express");
const router = express.Router();
const { uploadImage } = require("../controllers/imageController");
const upload = require("../middlewares/upload");
const authenticate = require("../middlewares/authMiddleware");

router.post("/upload", authenticate, upload.single("image"), uploadImage);

module.exports = router;
