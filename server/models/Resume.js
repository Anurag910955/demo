const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  personalDetails: {
    name: String,
    email: String,
    phone: String,
    github: String,
  },
  education: [
    {
      university: String,
      degree: String,
      cgpa: String,
      duration: String,
      courses: String,
    },
  ],
  skills: {
    software: String,
    programming: String,
  },
  projects: [
    {
      title: String,
      date: String,
      description: String,
    },
  ],
  experience: [
    {
      role: String,
      company: String,
      duration: String,
      responsibilities: String,
    },
  ],
  certifications: [{ name: String }],
  activitiesAwards: [{ description: String }],
});

module.exports = mongoose.model("Resume", resumeSchema);