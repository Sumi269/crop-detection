import React from "react";

export default function SolutionCard({ solution, forDisease }) {
  if (!solution) return null;

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover-lift isolate">
      
      {/* Header Banner */}
      <div className="bg-gradient-premium p-6 relative">
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
        <h2 className="text-2xl font-bold text-white relative z-10 flex items-center gap-2">
          <span>🛡️</span> Recommended Action Plan
        </h2>
        {forDisease && (
          <p className="text-green-50 font-medium relative z-10 mt-1 opacity-90">
            For: {forDisease.replace(/_/g, " ")}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="space-y-6">
          
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Prevention Strategy
            </h3>
            <p className="text-slate-700 text-lg leading-relaxed">{solution.text}</p>
          </div>
          
          <div className="h-px bg-slate-100 w-full my-4"></div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Optimal Timing
            </h3>
            <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl text-amber-900 font-medium">
              ⏰ {solution.time}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}