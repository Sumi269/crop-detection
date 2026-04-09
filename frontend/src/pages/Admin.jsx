import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Admin() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/history")
      .then(res => res.json())
      .then(data => {
        setHistory(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch history", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="pt-24 px-6 max-w-7xl mx-auto animate-fade-in">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-500 mt-1">Global view of recent crop scans and AI detections.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm font-semibold text-slate-700">
            Total Scans: {history.length}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center p-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-900"></div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-xs tracking-wider">
                    <th className="p-4 font-semibold">Image</th>
                    <th className="p-4 font-semibold">Detected Crop / Disease</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold">Confidence</th>
                    <th className="p-4 font-semibold">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {history.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <img 
                          src={row.image} 
                          alt="Crop scan" 
                          className="w-16 h-16 object-cover rounded-lg border border-slate-200 shadow-sm"
                        />
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-slate-900">{row.crop.replace(/_/g, " ")}</div>
                        <div className="text-sm text-slate-500">{row.user}</div>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 ${
                          row.status === "HEALTHY" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}>
                          {row.status === "HEALTHY" ? "✓ Healthy" : "⚠ Diseased"}
                        </span>
                      </td>
                      <td className="p-4 font-medium text-slate-700">
                        {row.confidence}%
                      </td>
                      <td className="p-4 text-slate-500 text-sm">
                        {new Date(row.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  
                  {history.length === 0 && (
                     <tr>
                        <td colSpan="5" className="p-8 text-center text-slate-500">
                           No detection history found.
                        </td>
                     </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}