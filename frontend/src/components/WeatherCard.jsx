export default function WeatherCard({ data }) {
  if (!data) return null;

  return (
    <div className="p-4 border rounded">
      <h2 className="font-bold">Weather</h2>
      <p>Temperature: {data.temp}°C</p>
      <p>Humidity: {data.humidity}%</p>
      <p>Rain: {data.rain}</p>

      <p className="mt-2 text-red-500">{data.alert}</p>
    </div>
  );
}