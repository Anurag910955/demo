import { useLocation, useNavigate } from "react-router-dom";
import "../resume.css"; 
import "../templates/template1.css";
import "../templates/template2.css";
import "../templates/template3.css";

const ResumePreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state || {}; // Make sure this is properly passed from ResumeForm

  const selectedTemplate = formData.selectedTemplate || "template1"; 
  const userId = formData.userId || 1; // Ensure this matches your MongoDB logic

  const handleDownload = () => {
    document.querySelectorAll(".long-section").forEach((section) => {
      section.style.display = "none"; // Hide unnecessary sections
    });

    window.print(); // Trigger print dialog

    document.querySelectorAll(".long-section").forEach((section) => {
      section.style.display = "block"; // Show them back after printing
    });
  };


  return (
    <div className={`resume-container ${selectedTemplate}`}>
      <div className="resume-content">
        <h1 className="resume-name">{formData.personalDetails?.name || "Your Name"}</h1>
        <p className="resume-contact">
          {formData.personalDetails?.phone || "Phone"} | {formData.personalDetails?.email || "Email"} | {formData.personalDetails?.github || "GitHub"}
        </p>

        <section>
          <h2>Education</h2>
          {formData.education?.map((edu, index) => (
            <div key={index}>
              <p><strong>{edu.university}</strong>, {edu.degree} ({edu.duration})</p>
              <p>CGPA: {edu.cgpa}</p>
              <p><em>Relevant Courses:</em> {edu.courses}</p>
            </div>
          ))}
        </section>

        <section>
          <h2>Technical Skills</h2>
          <p><strong>Software/Tools:</strong> {formData.skills?.software || "Not specified"}</p>
          <p><strong>Programming Languages:</strong> {formData.skills?.programming || "Not specified"}</p>
        </section>

        <section>
          <h2>Projects</h2>
          {formData.projects?.map((proj, index) => (
            <div key={index} className="project-item">
              <p><strong>{proj.title}</strong> <span className="resume-date">({proj.date})</span></p>
              <p className="project-description">{proj.description}</p>
            </div>
          ))}
        </section>

        <section>
          <h2>Experience</h2>
          {formData.experience?.map((exp, index) => (
            <div key={index}>
              <p><strong>{exp.role}</strong>, {exp.company} ({exp.duration})</p>
              <p>{exp.responsibilities}</p>
            </div>
          ))}
        </section>

        <section>
          <h2>Certifications</h2>
          {formData.certifications?.map((cert, index) => <p key={index}>{cert.name}</p>)}
        </section>

        <section>
          <h2>Activities and Awards</h2>
          {formData.activitiesAwards?.map((act, index) => <p key={index}>{act.description}</p>)}
        </section>
      </div>

      {/* Download PDF Button */}
      <button onClick={handleDownload} className="no-print">
        Download PDF
      </button>

      {/* Edit Resume Button - Navigates to ResumeForm */}
      <button 
        onClick={() => navigate("/resume-form", { state: { ...formData, userId } })} 
        className="no-print edit-btn">
        Edit Resume
      </button>
    </div>
  );
};

export default ResumePreview;
