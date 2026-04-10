import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/history", {
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => res.json())
      .then(data => {
        setHistory(data);
        setLoading(false);
      })
      .catch(err => setLoading(false));
  }, []);

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this scan?")) return;
    try {
      await fetch(`http://localhost:5000/api/history/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      setHistory(history.filter(h => h._id !== id));
    } catch(err) { alert("Failed to delete"); }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="pt-24 px-6 max-w-6xl mx-auto animate-fade-in pb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">My Detection History</h1>

        {loading ? (
             <div className="text-center p-20 animate-pulse text-slate-500 font-bold">Loading...</div>
        ) : history.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-200">
               <div className="text-5xl mb-4">📷</div>
               <h2 className="text-xl font-bold text-slate-800 mb-2">No scans yet</h2>
               <p className="text-slate-500">Go to the Detect page to run your first crop disease analysis!</p>
            </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((item) => (
              <div key={item._id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition-all group">
                <div className="aspect-video bg-slate-900 relative">
                   {/* Backend is on 5000, serve images from there */}
                   <img src={`http://localhost:5000${item.image_url}`} alt="crop" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                   <button onClick={() => deleteItem(item._id)} className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-600 text-white p-2 rounded-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      🗑
                   </button>
                </div>
                <div className="p-5">
                   <div className="flex justify-between items-start mb-2">
                     <h3 className="font-bold text-slate-900">{item.crop.replace(/_/g, " ")}</h3>
                     <span className={`text-xs font-bold px-2 py-1 rounded-md ${item.solution.includes("healthy") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                       {(item.confidence * 1).toFixed(1)}%
                     </span>
                   </div>
                   <p className="text-sm font-semibold text-slate-600 mb-3">{item.disease.replace(/_/g, " ")}</p>
                   <p className="text-xs text-slate-500 italic line-clamp-2">{item.solution}</p>
                   <div className="mt-4 text-xs text-slate-400 font-medium">
                     {new Date(item.timestamp).toLocaleDateString()} at {new Date(item.timestamp).toLocaleTimeString()}
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
