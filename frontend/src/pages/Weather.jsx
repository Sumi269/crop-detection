import React, { useState } from "react";
import axios from "axios";
import WeatherCard from "../components/WeatherCard";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = "YOUR_API_KEY"; // put your key here

  const fetchWeather = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      // Format data for your WeatherCard
      const formatted = {
        temp: res.data.main.temp,
        humidity: res.data.main.humidity,
        rain: res.data.weather[0].description,
        alert:
          res.data.weather[0].main === "Rain"
            ? "Carry umbrella 🌧"
            : "Weather looks clear ☀",
      };

      setWeatherData(formatted);
    } catch (err) {
      alert("City not found ❌");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Check Weather</h1>

      <input
        type="text"
        placeholder="Enter city"
        className="border p-2 mr-2"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button
        onClick={fetchWeather}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>

      <div className="mt-5">
        <WeatherCard data={weatherData} />
      </div>
    </div>
  );
}
