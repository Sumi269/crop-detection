import Navbar from "../components/Navbar";

export default function Videos() {
  const videos = [
    {
      id: "dQw4w9WgXcQ", // Replace with real links if needed
      title: "Protecting Crops During Flash Floods",
      tag: "Floods Risk",
      color: "blue"
    },
    {
      id: "V-_O7nl0Ii0", 
      title: "Saving Harvests from Heavy Rainfall",
      tag: "Heavy Rain",
      color: "indigo"
    },
    {
      id: "jNQXAC9IVRw",
      title: "Extreme Headwave Management",
      tag: "Drought",
      color: "orange"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="pt-24 px-6 max-w-6xl mx-auto animate-fade-in">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">AI Weather Advisories</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Expert video guides and AI recommendations on how to prepare and protect your agricultural assets during severe weather.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((vid, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-lg transition-shadow">
              
              {/* Fake iframe / thumbnail for demo - using responsive wrapper */}
              <div className="aspect-video bg-slate-900 relative">
                 <iframe 
                   className="absolute inset-0 w-full h-full"
                   src={`https://www.youtube.com/embed/${vid.id}`} 
                   title={vid.title}
                   frameBorder="0" 
                   allowFullScreen
                 ></iframe>
              </div>

              <div className="p-6">
                <span className={`inline-block px-3 py-1 bg-${vid.color}-100 text-${vid.color}-700 text-xs font-bold uppercase rounded-full mb-3 tracking-wider`}>
                  {vid.tag}
                </span>
                <h3 className="text-xl font-bold text-slate-900 leading-tight">{vid.title}</h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}