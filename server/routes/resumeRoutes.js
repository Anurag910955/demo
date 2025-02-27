const express = require("express");
const mongoose = require("mongoose");
const Resume = require("../models/Resume");

const router = express.Router();

// Save or Update Resume
router.post("/save", async (req, res) => {
  try {
    console.log("Received Data:", req.body); // Debugging Log

    const { userId, personalDetails, education, experience, skills, projects, certifications, activitiesAwards } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    const objectId = new mongoose.Types.ObjectId(userId);

    const resume = await Resume.findOneAndUpdate(
      { userId: objectId },
      { userId: objectId, personalDetails, education, experience, skills, projects, certifications, activitiesAwards },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Resume saved successfully", resume });
  } catch (err) {
    console.error("Error saving resume:", err);
    res.status(500).json({ message: "Failed to save resume", error: err.message });
  }
});

// Update Resume (PUT method)
router.put("/update/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { personalDetails, education, experience, skills, projects, certifications, activitiesAwards } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    const resume = await Resume.findOneAndUpdate(
      { userId: new mongoose.Types.ObjectId(userId) },
      { personalDetails, education, experience, skills, projects, certifications, activitiesAwards },
      { new: true }
    );

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json({ message: "Resume updated successfully", resume });
  } catch (err) {
    console.error("Error updating resume:", err);
    res.status(500).json({ message: "Failed to update resume", error: err.message });
  }
});

// Fetch Resume
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
