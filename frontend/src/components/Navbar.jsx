import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const navLinks = [
    { path: "/home", label: "Home" },
    { path: "/detect", label: "Detect" },
    { path: "/chat", label: "Chatbot" },
    { path: "/weather", label: "Weather" },
    { path: "/profile", label: "Profile" }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-slate-900/80 backdrop-blur-lg shadow-lg border-b border-white/5 py-4" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.5)]">
            <span className="text-xl">🌱</span>
          </div>
          <span className="text-2xl font-black tracking-tight text-white font-['Outfit']">
            Crop <span className="text-emerald-400">AI</span>
          </span>
        </Link>
        
        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.path} 
                to={link.path}
                className={`relative font-semibold transition-colors duration-300 ${isActive ? "text-emerald-400" : "text-slate-300 hover:text-white"}`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
                )}
              </Link>
            )
          })}
          
          {user?.role === 'admin' && (
            <Link to="/admin" className="text-amber-400 font-semibold hover:text-amber-300 transition-colors">Admin Dashboard</Link>
          )}
        </div>

        {/* LOGOUT BUTTON */}
        <button 
          onClick={logout} 
          className="hidden md:block px-6 py-2.5 rounded-full font-bold text-sm bg-white/10 hover:bg-red-500/80 text-white border border-white/10 hover:border-red-400 transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}