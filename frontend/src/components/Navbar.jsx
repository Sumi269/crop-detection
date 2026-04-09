import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const navLinks = [
    { path: "/home", label: "Home" },
    { path: "/detect", label: "Detect" },
    { path: "/solution", label: "Solution" },
    { path: "/weather", label: "Weather" },
    { path: "/videos", label: "Videos" },
    { path: "/admin", label: "Admin" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/home" className="flex items-center gap-2 group">
           <span className="text-2xl group-hover:rotate-12 transition-transform">🌱</span>
           <span className="font-extrabold text-xl tracking-tight text-slate-900">Crop<span className="text-green-600">AI</span></span>
        </Link>
        
        <div className="hidden md:flex gap-1">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                location.pathname.startsWith(link.path) 
                  ? "bg-slate-900 text-white shadow-sm" 
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
           {/* Mock Avatar for Admin/User */}
           <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
             AD
           </div>
           
           <button 
             onClick={logout}
             className="text-sm font-semibold text-slate-500 hover:text-red-600 transition-colors"
           >
             Logout
           </button>
        </div>
      </div>
    </nav>
  );
}