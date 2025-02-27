const express = require("express");
const mongoose = require("mongoose");
const Resume = require("../models/Resume");

const router = express.Router();

// Save or Update Resume Data
router.post("/save", async (req, res) => {
  try {
    console.log("Received Data:", req.body); // Debugging Log

    const { userId, personalDetails, education, experience, skills, projects, certifications, activitiesAwards } = req.body;

    // Check if userId is missing
    if (!userId) {
      console.log("Missing userId");
      return res.status(400).json({ message: "User ID is required" });
    }

    // Check if userId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.log("Invalid userId format:", userId);
      return res.status(400).json({ message: "Invalid userId format" });
    }

    // Convert userId to ObjectId
    const objectId = new mongoose.Types.ObjectId(userId);

    // Save or Update Resume
    const resume = await Resume.findOneAndUpdate(
      { userId: objectId },
      { personalDetails, education, experience, skills, projects, certifications, activitiesAwards },
      { new: true, upsert: true }
    );

    console.log("Resume saved successfully:", resume);
    res.status(200).json({ message: "Resume saved successfully", resume });
  } catch (err) {
    console.error("Error saving resume:", err);
    res.status(500).json({ message: "Failed to save resume", error: err.message });
  }
});

// Fetch Resume Data
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    const resume = await Resume.findOne({ userId: new mongoose.Types.ObjectId(userId) });

    if (!resume) {
      return res.status(404).json({ message: "No resume found" });
    }

    res.status(200).json(resume);
  } catch (err) {
    console.error("Error fetching resume:", err);
    res.status(500).json({ message: "Failed to fetch resume", error: err.message });
  }
});

module.exports = router;
