import { useEffect, useState } from "react";
import SolutionCard from "../components/SolutionCard";

export default function Solution() {
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/solution?disease=Late_blight")
      .then((res) => res.json())
      .then(setSolution);
  }, []);

  return (
    <div className="p-6">
      <SolutionCard solution={solution} />
    </div>
  );
}