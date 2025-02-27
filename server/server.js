const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Replaces bodyParser.json() (body-parser is now built into Express)

// Connect to MongoDB
connectDB();

// Root route to confirm server status
app.get("/", (req, res) => res.send("Backend is running successfully!"));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

// Dynamic Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));