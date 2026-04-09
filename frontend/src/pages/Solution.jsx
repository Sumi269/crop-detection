import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SolutionCard from "../components/SolutionCard";
import VoiceInput from "../components/VoiceInput";
import Navbar from "../components/Navbar";

export default function Solution() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [solution, setSolution] = useState(null);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("disease") || "");
  const [loading, setLoading] = useState(false);

  // Fetch solution whenever disease param changes
  useEffect(() => {
    const diseaseParam = searchParams.get("disease");
    if (diseaseParam) {
      setSearchQuery(diseaseParam);
      fetchSolution(diseaseParam);
    }
  }, [searchParams]);

  const fetchSolution = async (query) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/solution?disease=${query}`);
      const data = await res.json();
      setSolution(data);
    } catch (error) {
      console.error("Error fetching solution", error);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ disease: searchQuery });
    }
  };

  const handleVoiceResult = (text) => {
    setSearchQuery(text);
    setSearchParams({ disease: text });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-24 px-6 max-w-4xl mx-auto animate-fade-in">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 text-gradient inline-block">AI Smart Solutions</h1>
          <p className="text-slate-600 text-lg">Search a crop condition manually or use voice input to receive instant preventions.</p>
        </div>

        {/* Search Bar section */}
        <form onSubmit={handleSearch} className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-md border border-slate-100 focus-within:ring-2 focus-within:ring-green-500 transition-all mb-10">
          <input
            type="text"
            placeholder="E.g., Tomato Late Blight, Apple Scab..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none py-3 px-4 text-slate-800 placeholder-slate-400"
          />
          <VoiceInput onResult={handleVoiceResult} />
          <button 
            type="submit" 
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-md hover:shadow-lg"
          >
            Search
          </button>
        </form>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : solution ? (
           <SolutionCard solution={solution} forDisease={searchQuery} />
        ) : (
          <div className="text-center p-10 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <span className="text-4xl mb-4 block">🔍</span>
            <p className="text-slate-500 font-medium text-lg">Enter a crop or disease name to find the best solutions.</p>
          </div>
        )}

      </div>
    </div>
  );
}