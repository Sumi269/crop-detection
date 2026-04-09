import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Auth.css";
import image from "../assets/image.png";

export default function Signup() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({});

  const handleSignup = async () => {
    // auto login
    const dummyUser = { email: form.email || "user@example.com", name: form.name || "Demo User" };

    localStorage.setItem("token", "dummy-token-123");
    localStorage.setItem("user", JSON.stringify(dummyUser));

    setUser(dummyUser);

    navigate("/home");
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <img src={image} alt="crop" />
      </div>

      <div className="auth-right">
        <div className="auth-box">
          <h2>Signup</h2>

          <input placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})}/>
          <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
          <input type="password" placeholder="Password" onChange={(e)=>setForm({...form,password:e.target.value})}/>

          <button onClick={handleSignup}>Signup</button>

          <p>Already have account? <span onClick={()=>navigate("/login")}>Login</span></p>
        </div>
      </div>
    </div>
  );
}