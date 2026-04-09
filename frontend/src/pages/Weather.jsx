import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Weather() {
  const [city, setCity] = useState("San Francisco");
  const [data, setData] = useState({
     // Default mocked data for preview before using real API
     temp: 24,
     humidity: 60,
     rain: "scattered clouds",
     alert: "✅ Weather is good for crops"
  });

  const API_KEY = "b9f3d655ab397f16afcdce8b0e4e2d9e"; // put your API key

  const fetchWeather = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const result = await res.json();
      
      if (result.cod !== 200) {
          alert(result.message);
          return;
      }

      // convert into your WeatherCard format
      const formatted = {
        temp: result.main.temp,
        humidity: result.main.humidity,
        rain: result.weather[0].description,
        alert:
          result.main.temp > 35
            ? "⚠ High temperature - risk for crops"
            : result.weather[0].main === "Rain"
            ? "🌧 Rain expected - reduce irrigation"
            : "✅ Weather is good for crops",
      };

      setData(formatted);
    } catch (err) {
      alert("Error fetching weather");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="pt-24 px-6 max-w-lg mx-auto animate-fade-in text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">🌦 Precision Weather</h1>
        <p className="text-slate-500 mb-8">Enter your farming region for localized climate threats.</p>

        <div className="flex bg-white rounded-xl shadow-sm border border-slate-200 p-2 mb-8 mx-auto">
          <input
            type="text"
            placeholder="Enter city..."
            className="flex-1 bg-transparent border-none outline-none px-4 text-slate-800"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            onClick={fetchWeather}
            className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Check
          </button>
        </div>

        {data && (
           <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover-lift transition-transform">
             <div className="text-6xl mb-4">
                 {data.rain.includes('rain') ? '🌧' : data.temp > 30 ? '🔥' : '⛅'}
             </div>
             <h2 className="text-2xl font-bold text-slate-900 capitalize mb-1">{data.rain}</h2>
             <div className="flex justify-center gap-6 mt-6 mb-8">
                <div className="text-center">
                   <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Temp</div>
                   <div className="text-3xl font-bold text-slate-800">{Math.round(data.temp)}°C</div>
                </div>
                <div className="w-px bg-slate-200"></div>
                <div className="text-center">
                   <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Hum.</div>
                   <div className="text-3xl font-bold text-slate-800">{data.humidity}%</div>
                </div>
             </div>
             
             <div className={`p-4 rounded-xl font-semibold text-left border ${
                data.alert.includes('✅') ? 'bg-green-50 text-green-700 border-green-100' :
                data.alert.includes('🌧') ? 'bg-blue-50 text-blue-700 border-blue-100' :
                'bg-red-50 text-red-700 border-red-100'
             }`}>
                 {data.alert}
             </div>
           </div>
        )}
      </div>
    </div>
  );
}
