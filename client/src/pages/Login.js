import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../index.css"; // Import global styles

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    try {
      const res = await axios.post("https://demo-q0du.onrender.com/api/auth/login", { email, password });
      
      // If backend sends a token in response, you need to handle it
      if (res.data.token) {
        localStorage.setItem("token", res.data.token); // Example: Storing token in localStorage
      }
  
      alert(res.data.message);
      if (res.data.message === "Login successful") {
        navigate("/resume-form");
      }
    } catch (error) {
      alert("Invalid email or password");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back!</h2>
        <p>Please log in to continue</p>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="register-link">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
