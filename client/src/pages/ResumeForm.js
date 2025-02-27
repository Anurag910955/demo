import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../form.css";

const ResumeForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const existingData = location.state || null;

  const userId = existingData?.userId ?? "650d4f12a5c8b9c123456789"; // Ensure userId persists

  const [selectedTemplate, setSelectedTemplate] = useState(
    existingData?.selectedTemplate || "template1"
  );

  const [formData, setFormData] = useState(
    existingData || {
      personalDetails: { name: "", email: "", phone: "", github: "" },
      education: [{ university: "", degree: "", cgpa: "", duration: "", courses: "" }],
      skills: { software: "", programming: "" },
      projects: [{ title: "", date: "", description: "" }],
      experience: [{ role: "", company: "", duration: "", responsibilities: "" }],
      certifications: [{ name: "" }],
      activitiesAwards: [{ description: "" }],
    }
  );

  // Handle form changes
  const handleChange = (e, section, index = null, field = null) => {
    const value = e.target.value;
    setFormData((prevData) => {
      if (index !== null) {
        const updatedArray = [...prevData[section]];
        updatedArray[index] = { ...updatedArray[index], [field]: value };
        return { ...prevData, [section]: updatedArray };
      }
      if (section === "skills") {
        return { ...prevData, skills: { ...prevData.skills, [field]: value } };
      }
      return { ...prevData, [section]: { ...prevData[section], [field]: value } };
    });
  };

  // Add more fields dynamically
  const addMore = (section, newItem) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: [...prevData[section], newItem],
    }));
  };

  // Remove a field dynamically
  const removeField = (section, index) => {
    setFormData((prevData) => {
      const updatedArray = prevData[section].filter((_, i) => i !== index);
      return { ...prevData, [section]: updatedArray };
    });
  };

  // Handle form submission
 const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Sending Resume Data:", formData); // Debugging log
  console.log("User ID being sent:", userId); // Debugging log for userId

  if (!userId || userId.length !== 24) {
    alert("Invalid user ID. Please log in again.");
    return;
  }

  try {
    let response;
    if (existingData) {
      // Update resume
      response = await fetch(`https://demo-q0du.onrender.com/api/resume/update/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } else {
      // Save new resume
      response = await fetch("https://demo-q0du.onrender.com/api/resume/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, ...formData }),
      });
    }

    const result = await response.json();
    console.log("Server Response:", result); // Debugging log for response

    if (!response.ok) {
      throw new Error(result.message || "Failed to save/update resume");
    }

    alert(existingData ? "Resume updated successfully!" : "Resume saved successfully!");

    // Navigate to preview with updated data
    navigate("/resume-preview", { state: { ...formData, userId } });

  } catch (error) {
    console.error("Error saving/updating resume:", error);
    alert("Error: " + error.message);
  }
};


  return (
    <div className="container">
      <h2>{existingData ? "Edit Resume" : "Create Resume"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Select Resume Template:</label>
        <select value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)}>
          <option value="template1">Template 1</option>
          <option value="template2">Template 2</option>
          <option value="template3">Template 3</option>
        </select>

        <h3>Personal Details</h3>
        {Object.keys(formData.personalDetails).map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData.personalDetails[field]}
            onChange={(e) => handleChange(e, "personalDetails", null, field)}
            required
          />
        ))}

        <h3>Technical Skills</h3>
        <div className="skills-section">
          <input
            type="text"
            placeholder="Software/Tools"
            value={formData.skills.software}
            onChange={(e) => handleChange(e, "skills", null, "software")}
            required
          />
          <input
            type="text"
            placeholder="Programming Languages"
            value={formData.skills.programming}
            onChange={(e) => handleChange(e, "skills", null, "programming")}
            required
          />
        </div>

        {Object.entries({
          education: { university: "", degree: "", cgpa: "", duration: "", courses: "" },
          projects: { title: "", date: "", description: "" },
          experience: { role: "", company: "", duration: "", responsibilities: "" },
          certifications: { name: "" },
          activitiesAwards: { description: "" },
        }).map(([section, template]) => (
          <div key={section}>
            <h3>{section.charAt(0).toUpperCase() + section.slice(1)}</h3>
            {formData[section].map((item, index) => (
              <div key={index} className="form-group">
                {Object.keys(template).map((field) => (
                  <input
                    key={field}
                    type="text"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={item[field]}
                    onChange={(e) => handleChange(e, section, index, field)}
                    required
                  />
                ))}
                <button type="button" className="delete" onClick={() => removeField(section, index)}>
                  Delete
                </button>
              </div>
            ))}
            <button type="button" className="add-more" onClick={() => addMore(section, template)}>
              Add More
            </button>
          </div>
        ))}

        <button type="submit" className="save-button">
          {existingData ? "Update Resume" : "Save & Preview"}
        </button>
      </form>
    </div>
  );
};

export default ResumeForm;
