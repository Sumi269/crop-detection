import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-green-200 selection:text-green-900">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 opacity-20 pointer-events-none">
           <div className="w-96 h-96 bg-green-400 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 opacity-20 pointer-events-none">
           <div className="w-[500px] h-[500px] bg-blue-400 rounded-full blur-3xl"></div>
        </div>

        <div className="px-6 mx-auto max-w-7xl relative z-10 text-center animate-fade-in">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 font-semibold text-sm tracking-wide">
            Next-Gen Agriculture AI v2.0
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
            Smart Crop Intelligence <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">
              For Modern Farming
            </span>
          </h1>
          <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
            Secure your yield with instant AI-powered disease detection, precision weather insights, and actionable prevention solutions.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button 
              onClick={() => navigate("/detect")}
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.1)] transition-transform hover:-translate-y-1 text-lg"
            >
              Start Detection
            </button>
            <button 
              onClick={() => navigate("/weather")}
              className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 hover:border-green-500 text-slate-800 font-bold rounded-xl shadow-sm hover:shadow-md transition-all text-lg group flex items-center justify-center gap-2"
            >
              Weather Insights <span className="text-green-500 group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Powerful Tools for Farmers</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '📷', title: 'Disease Diagnostics', desc: 'Scan crops with your phone camera for instant analysis.' },
              { icon: '🌦', title: 'Weather Alerts', desc: 'Actionable intelligence based on real-time climate data.' },
              { icon: '💡', title: 'Smart Solutions', desc: 'Step-by-step treatments to save your harvests.' },
              { icon: '🎥', title: 'Advisory Videos', desc: 'AI curated video guides for protective farming.' }
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-green-50/50 hover:border-green-100 transition-colors group cursor-pointer">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">{f.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}