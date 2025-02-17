import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResumeForm from "./pages/ResumeForm";
import ResumePreview from "./pages/ResumePreview";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resume-form" element={<ResumeForm />} />
        <Route path="/resume-preview" element={<ResumePreview />} />
      </Routes>
    </Router>
  );
}

export default App;
