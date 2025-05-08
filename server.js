const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
const authRoutes = require("./routes/authRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const imageRoutes = require("./routes/imageRoutes");
const favouriteRoutes = require("./routes/favouriteRoutes");
const posts =  require("./routes/posts");
// const postInteractionsRoutes = require('./routes/postInteractions');
// app.use('/api/posts', postInteractionsRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/recipe",recipeRoutes);
app.use("/api/images",imageRoutes);
app.use("/api/favourites", favouriteRoutes);
app.use("/api/post",posts);
// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
