export default function WeatherCard({ data }) {
  if (!data) return null;

  return (
    <div className="p-5 rounded-2xl shadow-lg bg-green-50 border border-green-200">
      <h2 className="text-xl font-bold text-green-700 mb-3">
        🌦️ Crop Weather Insights
      </h2>

      <div className="space-y-1 text-gray-700">
        <p>🌡 Temperature: <b>{data.temp}°C</b></p>
        <p>💧 Humidity: <b>{data.humidity}%</b></p>
        <p>🌧 Rainfall: <b>{data.rain} mm</b></p>
        <p>🌬 Wind Speed: <b>{data.wind} km/h</b></p>
      </div>

      {/* Crop Alert */}
      {data.alert && (
        <div className="mt-3 p-2 bg-red-100 text-red-600 rounded">
          ⚠️ {data.alert}
        </div>
      )}

      {/* Farming Suggestion */}
      {data.advice && (
        <div className="mt-3 p-2 bg-green-100 text-green-700 rounded">
          🌱 {data.advice}
        </div>
      )}
    </div>
  );
}
