import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Detect() {
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    sendToBackend(file);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      alert("Camera access denied or unavailable.");
    }
  };

  const captureImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 300;

    const ctx = canvas.getContext("2d");
    if (videoRef.current && videoRef.current.srcObject) {
      ctx.drawImage(videoRef.current, 0, 0, 400, 300);

      canvas.toBlob((blob) => {
        setPreview(URL.createObjectURL(blob));
        sendToBackend(blob);
        
        // Stop camera tracks
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(t => t.stop());
        videoRef.current.srcObject = null;
      }, "image/jpeg");
    } else {
      alert("Please start the camera first.");
    }
  };

  const sendToBackend = async (file) => {
    setLoading(true);
    setResult(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Prediction failed. Ensure backend is running.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col lg:flex-row mt-16">
        
        {/* LEFT IMAGE BANNER */}
        <div className="hidden lg:flex lg:flex-1 relative overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1592982537447-6f29dfaeae23?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            alt="Crop field"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/20"></div>
          <div className="relative z-10 flex flex-col justify-center p-12 text-white">
            <h1 className="text-5xl font-bold mb-4 leading-tight">AI Diagnostic<br/>Scanner</h1>
            <p className="text-lg text-slate-200 opacity-90 max-w-md">Instantly detect crop diseases with over 90% accuracy using computer vision. Upload a photo or use your device's camera.</p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 flex justify-center items-start lg:items-center py-10 lg:py-0 bg-slate-50 relative">
          
          <div className="w-full max-w-lg p-8 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] animate-fade-in border border-slate-100 mx-4">

            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 p-3 rounded-full text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Scan Crop</h2>
            </div>
            
            {/* Upload Area */}
            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 mb-6 text-center hover:bg-slate-50 transition-colors relative">
              <input type="file" onChange={handleFile} accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <div className="text-slate-500 flex flex-col items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mb-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                <span className="font-semibold text-slate-700">Click to upload JPEG/PNG</span>
                <span className="text-sm">or drag and drop</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="h-px bg-slate-200 flex-1"></span>
              <span className="text-slate-400 text-sm px-3 uppercase tracking-wider font-semibold">OR</span>
              <span className="h-px bg-slate-200 flex-1"></span>
            </div>

            <div className="w-full bg-slate-900 rounded-2xl overflow-hidden shadow-inner relative min-h-[200px] flex items-center justify-center mb-4">
               <video ref={videoRef} autoPlay className="w-full h-full object-cover absolute inset-0"></video>
               {!videoRef.current?.srcObject && <span className="text-white/50 text-sm relative z-10">Camera Off</span>}
            </div>

            <div className="flex gap-3 mb-8">
              <button onClick={startCamera} className="flex-1 bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-xl font-medium transition-colors shadow-md hover-lift">Start Camera</button>
              <button onClick={captureImage} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition-colors shadow-md hover-lift">Take Photo</button>
            </div>

            {loading && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600 mx-auto mb-2"></div>
                <p className="text-slate-500 font-medium animate-pulse">Analyzing image...</p>
              </div>
            )}

            {preview && !loading && !result && (
              <div className="text-center">
                 <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-xl mx-auto shadow-md border-4 border-white" />
              </div>
            )}

            {/* RESULT */}
            {result && (
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 mt-4 animate-fade-in shadow-inner relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: result.status === "HEALTHY" ? '#10b981' : '#ef4444' }}></div>
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">Detected Class</span>
                    <h2 className="text-xl font-extrabold text-slate-900">{result.crop}</h2>
                  </div>
                  <div className={`px-4 py-1 rounded-full text-sm font-bold shadow-sm ${result.status === "HEALTHY" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {result.status === "HEALTHY" ? "🌿 Healthy" : "⚠ Diseased"}
                  </div>
                </div>

                {/* CONFIDENCE BAR */}
                <div className="mb-4">
                   <div className="flex justify-between text-sm font-semibold mb-1 text-slate-600">
                     <span>Confidence Level</span>
                     <span style={{ color: result.confidence > 80 ? '#10b981' : '#f59e0b' }}>{result.confidence}%</span>
                   </div>
                   <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000" 
                        style={{ width: `${result.confidence}%`, backgroundColor: result.confidence > 80 ? '#10b981' : '#f59e0b' }}
                      ></div>
                   </div>
                </div>

                {/* TOP 3 */}
                <div className="mt-5 pt-4 border-t border-slate-200">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Other Possibilities</h3>
                  <div className="space-y-2">
                    {result.top3.map((item, i) => (
                      i > 0 && item.confidence > 0.05 && (
                        <div key={i} className="flex items-center text-sm">
                          <span className="text-slate-600 w-32 truncate" title={item.label.split("___")[0]}>{item.label.split("___")[0].replace("_", " ")}</span>
                          <div className="flex-1 h-1.5 bg-slate-200 rounded-full mx-3">
                            <div className="h-full bg-slate-400 rounded-full" style={{ width: `${item.confidence}%` }}></div>
                          </div>
                          <span className="text-slate-500 font-medium w-12 text-right">{item.confidence}%</span>
                        </div>
                      )
                    ))}
                  </div>
                </div>

                {/* GET SOLUTION BUTTON */}
                {result.status !== "HEALTHY" && (
                  <button 
                    onClick={() => navigate(`/solution?disease=${result.full_label}`)}
                    className="mt-6 w-full py-3 bg-gradient-premium text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all outline-none"
                  >
                    Get Treatment Solution →
                  </button>
                )}
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}