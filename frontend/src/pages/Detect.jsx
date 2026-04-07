import { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import "../styles/Detect.css";

export default function Detect() {
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const videoRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    sendToBackend(file);
  };

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  };

  const captureImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 250;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, 300, 250);

    canvas.toBlob((blob) => {
      setPreview(URL.createObjectURL(blob));
      sendToBackend(blob);
    }, "image/jpeg");
  };

  const sendToBackend = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5000/predict", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <>
      <Navbar />

      <div className="detect-container">

        {/* LEFT IMAGE */}
        <div className="left">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef"
            alt="Crop field"
            className="bg-image"
          />
          <div className="overlay-text">
            <h2>AI Crop Detection</h2>
            <p>Upload or capture crop images for instant analysis</p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right">

          <div className="card">

            <h2>📷 Crop Detection</h2>

            <input type="file" onChange={handleFile} />

            <video ref={videoRef} autoPlay></video>

            <div className="btns">
              <button onClick={startCamera}>Start Camera</button>
              <button onClick={captureImage}>Capture</button>
            </div>

            {preview && (
              <img src={preview} alt="Preview" className="preview" />
            )}

            {result && (
  <div className="result-card">

    {/* MAIN RESULT */}
    <h2>{result.crop}</h2>

    <div className={result.status === "HEALTHY" ? "badge green" : "badge red"}>
      {result.status === "HEALTHY" ? "🌿 Healthy" : "⚠ Diseased"}
    </div>

    {/* CONFIDENCE BAR */}
    <div className="progress-container">
      <div
        className="progress-bar"
        style={{ width: `${result.confidence}%` }}
      ></div>
    </div>
    <p>{result.confidence}% Confidence</p>

    {/* TOP 3 */}
    <h3>Top Predictions</h3>

    {result.top3.map((item, i) => (
      <div key={i} className="prediction">

        <span>{item.label.split("___")[1]}</span>

        <div className="mini-bar">
          <div
            className="mini-fill"
            style={{ width: `${item.confidence}%` }}
          ></div>
        </div>

        <span>{item.confidence}%</span>

      </div>
    ))}

  </div>
)}
          </div>

        </div>

      </div>
    </>
  );
}