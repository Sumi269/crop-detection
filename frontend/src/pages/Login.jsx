import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Auth.css";
import image from "../assets/image.png";

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);

      // ✅ CORRECT REDIRECT
      navigate("/home");
      
    } catch (err) {
      console.error(err);
      setError("Network error connecting to backend");
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">

      {/* LEFT IMAGE */}
      <div className="auth-left">
        <img src={image} alt="crop" />
      </div>

      {/* RIGHT FORM */}
      <div className="auth-right">
        <div className="auth-box">
          <h2>Login</h2>

          {error && <div style={{color: "red", fontSize: "14px", marginBottom: "10px"}}>{error}</div>}

          <input
            placeholder="Email or Mobile"
            onChange={(e)=>setForm({...form,loginId:e.target.value})}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e)=>setForm({...form,password:e.target.value})}
          />

          <button onClick={handleLogin}>Login</button>

          <p>New user? <span onClick={()=>navigate("/signup")}>Signup</span></p>
        </div>
      </div>

    </div>
  );
}