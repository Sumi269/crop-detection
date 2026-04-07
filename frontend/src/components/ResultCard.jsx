export default function ResultCard({ result }) {
  if (!result) return null;

  return (
    <div className="p-4 border rounded mt-4">
      <h2 className="font-bold text-lg">Result</h2>
      <p>Crop: {result.crop}</p>
      <p>Condition: {result.condition}</p>
      <p>Status: {result.status}</p>
      <p>Confidence: {result.confidence}%</p>

      <h3 className="mt-2 font-semibold">Top Predictions:</h3>
      {result.top3.map((item, i) => (
        <p key={i}>
          {item.name} - {item.value}%
        </p>
      ))}
    </div>
  );
}