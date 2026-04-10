import { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/Home.css"; // Borrow home style to revert it to the visual theme

export default function Weather() {
  const [city, setCity] = useState("San Francisco");
  const [data, setData] = useState({
     temp: 24,
     humidity: 60,
     rain: "scattered clouds",
     alert: "✅ Weather is good for crops",
     mitigation: "Continue regular watering and fertilization schedules to maintain healthy growth."
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

      // Generate localized solutions based on weather
      let alertMsg = "✅ Weather is good for crops";
      let mitigationMsg = "Continue standard maintenance. No immediate action needed.";

      if (result.main.temp > 35) {
          alertMsg = "⚠ High temperature - Heatwave Warning";
          mitigationMsg = "[AI Solution]: Increase irrigation frequency immediately. Apply mulch to retain soil moisture and consider deploying shade nets over delicate crops.";
      } else if (result.weather[0].main === "Rain") {
          alertMsg = "🌧 Heavy Rain/Flooding Risk";
          mitigationMsg = "[AI Solution]: Halt all irrigation. Clear drainage trenches to prevent waterlogging. Delay any fertilizer applications until soil dries.";
      } else if (result.main.temp < 5) {
          alertMsg = "❄ Frost Warning";
          mitigationMsg = "[AI Solution]: Cover sensitive plants overnight. Use anti-frost heaters or spray crops lightly with water before dawn to prevent tissue freezing.";
      }

      const formatted = {
        temp: result.main.temp,
        humidity: result.main.humidity,
        rain: result.weather[0].description,
        alert: alertMsg,
        mitigation: mitigationMsg
      };

      setData(formatted);
    } catch (err) {
      alert("Error fetching weather");
    }
  };

  return (
    <div className="home-container" style={{ display:'block', minHeight: '100vh', padding: '40px' }}>
      <Navbar />
      
      <div style={{ maxWidth: '800px', margin: '60px auto 0', textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>🌦 Precision Weather Insights</h1>
        <p style={{ opacity: 0.8, marginBottom: '40px', fontSize: '18px' }}>Enter your farming region for localized climate threats and AI mitigation strategies.</p>

        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '15px', marginBottom: '40px' }}>
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{ flex: 1, padding: '15px', background: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', marginRight: '10px' }}
          />
          <button onClick={fetchWeather} style={{ background: '#22c55e', color: 'white', border: 'none', padding: '0 30px', borderRadius: '10px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }}>
            Get Insights
          </button>
        </div>

        {data && (
           <div style={{ background: 'white', color: 'black', borderRadius: '20px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', textAlign: 'center' }}>
             <div style={{ fontSize: '70px', marginBottom: '20px' }}>
                 {data.rain.includes('rain') ? '🌧' : data.temp > 30 ? '🔥' : '⛅'}
             </div>
             <h2 style={{ textTransform: 'capitalize', fontSize: '28px', margin: '0 0 30px 0' }}>{data.rain}</h2>
             
             <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '30px' }}>
                <div>
                   <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase' }}>Temperature</div>
                   <div style={{ fontSize: '36px', fontWeight: '900', color: '#222' }}>{Math.round(data.temp)}°C</div>
                </div>
                <div style={{ width: '2px', background: '#eee' }}></div>
                <div>
                   <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase' }}>Humidity</div>
                   <div style={{ fontSize: '36px', fontWeight: '900', color: '#222' }}>{data.humidity}%</div>
                </div>
             </div>
             
             {/* ALERT BOX */}
             <div style={{ 
                 padding: '20px', borderRadius: '15px', fontWeight: 'bold', textAlign: 'left', fontSize: '18px', border: '2px solid transparent',
                 background: data.alert.includes('✅') ? '#f0fdf4' : data.alert.includes('🌧') ? '#eff6ff' : '#fef2f2',
                 color: data.alert.includes('✅') ? '#166534' : data.alert.includes('🌧') ? '#1e40af' : '#991b1b',
                 borderColor: data.alert.includes('✅') ? '#bbf7d0' : data.alert.includes('🌧') ? '#bfdbfe' : '#fecaca'
             }}>
                 {data.alert}
             </div>

             {/* SOLUTIONS / PRACTICES BOX */}
             <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '15px', marginTop: '20px', textAlign: 'left', border: '1px solid #e2e8f0' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#334155' }}>💡 Recommended Practice</h3>
                <p style={{ margin: 0, fontSize: '16px', color: '#475569', lineHeight: '1.6' }}>{data.mitigation}</p>
             </div>
           </div>
        )}
      </div>
    </div>
  );
}
