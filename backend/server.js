const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const path = require("path");
const fs = require("fs");
require("dotenv").config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Ensure uploads directory exists and serve it
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
app.use("/uploads", express.static(uploadDir));

// Database
connectDB();

// Routes
app.use("/api/students", require("./routes/studentroutes"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
