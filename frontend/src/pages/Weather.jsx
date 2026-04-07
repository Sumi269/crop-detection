import { useEffect, useState } from "react";
import WeatherCard from "../components/WeatherCard";

export default function Weather() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/weather")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div className="p-6">
      <WeatherCard data={data} />
    </div>
  );
}