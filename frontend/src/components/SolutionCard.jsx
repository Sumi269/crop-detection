export default function SolutionCard({ solution }) {
  if (!solution) return null;

  return (
    <div className="p-4 border rounded">
      <h2 className="font-bold">Solution</h2>
      <p>{solution.text}</p>
      <p className="mt-2">Best Time: {solution.time}</p>
    </div>
  );
}