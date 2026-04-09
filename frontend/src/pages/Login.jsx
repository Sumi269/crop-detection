import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Auth.css";
import image from "../assets/image.png";

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({});

  const handleLogin = async () => {
    try {
        const dummyUser = { email: form.email || "user@example.com", name: "Demo User" };
        localStorage.setItem("token", "dummy-token-123");
        localStorage.setItem("user", JSON.stringify(dummyUser));

        setUser(dummyUser);

        // ✅ CORRECT REDIRECT
        navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
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

          <input
            placeholder="Email"
            onChange={(e)=>setForm({...form,email:e.target.value})}
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