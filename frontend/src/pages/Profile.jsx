import { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import "../styles/Home.css"; // Reuse Home styling for layout integration

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/history", {
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => res.json())
      .then(data => {
        setHistory(Array.isArray(data) ? data : []);
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
    <div className="min-h-screen bg-slate-900 pt-24 pb-12 px-6">
      <Navbar />
      
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* User Profile Banner */}
        <div className="glass-panel rounded-3xl p-8 relative overflow-hidden flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 bg-gradient-to-tr from-emerald-500 to-green-400 rounded-full flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(16,185,129,0.4)]">
            👨‍🌾
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Welcome, {user?.name || "Farmer"}!</h1>
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full border border-emerald-500/30 text-sm font-bold uppercase tracking-wider">
               <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
               {user?.role || "USER"} ACCOUNT
            </div>
          </div>
        </div>

        <div>
           <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
              <span className="text-emerald-400">📋</span> Detection History
           </h2>

           {loading ? (
             <div className="glass-panel rounded-3xl p-12 flex flex-col items-center justify-center space-y-4">
                <span className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></span>
                <p className="text-slate-400 font-medium">Loading historical scans...</p>
             </div>
           ) : history.length === 0 ? (
              <div className="glass-panel rounded-3xl p-16 flex flex-col items-center text-center space-y-4">
                 <div className="text-6xl mb-2 opacity-50">📂</div>
                 <h2 className="text-2xl font-bold text-white">No scans on record</h2>
                 <p className="text-slate-400 max-w-sm">Head over to the Detect page to run your first AI crop disease analysis!</p>
              </div>
           ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {history.map((item) => (
                 <div key={item._id} className="glass-panel rounded-3xl overflow-hidden group hover:-translate-y-2 transition-all duration-300">
                   <div className="relative h-48 overflow-hidden">
                      <img src={`http://localhost:5000${item.image_url}`} alt="crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
                      <button 
                         onClick={() => deleteItem(item._id)} 
                         className="absolute top-4 right-4 bg-red-500/80 hover:bg-red-500 text-white backdrop-blur-md px-3 py-1.5 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
                      >
                         Delete
                      </button>
                      <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white capitalize">{item.crop.replace(/_/g, " ")}</h3>
                   </div>
                   <div className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <p className="font-semibold text-slate-200 capitalize w-2/3">{item.disease.replace(/_/g, " ")}</p>
                        <span className={`px-2 py-1 rounded text-xs font-bold ${item.solution.includes("healthy") ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                          {(item.confidence * 1).toFixed(1)}%
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 line-clamp-3">{item.solution}</p>
                      <div className="pt-4 border-t border-white/10">
                        <p className="text-xs text-slate-500 font-medium">
                          {new Date(item.timestamp).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                        </p>
                      </div>
                   </div>
                 </div>
               ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
