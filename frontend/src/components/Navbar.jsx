import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navbar">
      <h2>🌱 Crop AI</h2>

      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/detect">Detect</Link>
        <Link to="/weather">Weather</Link>
        <Link to="/solution">Solution</Link>
        <Link to="/videos">Videos</Link>
      </div>

      <button onClick={logout}>Logout</button>
    </div>
  );
}