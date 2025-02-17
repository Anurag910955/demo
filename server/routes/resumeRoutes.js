const express = require("express");
const Resume = require("../models/Resume");

const router = express.Router();

// Save or Update Resume Data
router.post("/save", async (req, res) => {
  try {
    const { userId, personalDetails, education, experience, skills, projects, certifications, activitiesAwards } = req.body;

    // Upsert: If a resume exists, update it; otherwise, create a new one
    const resume = await Resume.findOneAndUpdate(
      { userId },
      { personalDetails, education, experience, skills, projects, certifications, activitiesAwards },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Resume saved successfully", resume });
  } catch (err) {
    res.status(500).json({ message: "Failed to save resume", error: err.message });
  }
});

// Fetch Resume Data
router.get("/:userId", async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.params.userId });

    if (!resume) {
      return res.status(404).json({ message: "No resume found" });
    }

    res.status(200).json(resume);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch resume", error: err.message });
  }
});

module.exports = router;
