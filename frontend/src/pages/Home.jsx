import Navbar from "../components/Navbar";
import "../styles/Home.css";
import image from "../assets/cropimage.jpg";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="home-hero" style={{ backgroundImage: `url(${image})` }}>
        <div className="overlay">
          <h1>Smart Crop Intelligence 🌱</h1>
          <p>AI-powered crop detection & smart farming insights</p>

          <div className="buttons">
            <button onClick={()=>navigate("/detect")}>Start Detection</button>
            <button className="secondary" onClick={()=>navigate("/weather")}>
              Weather Insights
            </button>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="feature-card">📷 Detect Crop Disease</div>
        <div className="feature-card">🌦 Weather Prediction</div>
        <div className="feature-card">💡 Smart Solutions</div>
        <div className="feature-card">🎥 AI Farming Videos</div>
      </div>
    </>
  );
}