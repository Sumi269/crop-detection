import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Home from "./pages/Home";
import Detect from "./pages/Detect";
import Weather from "./pages/Weather";
import Admin from "./pages/Admin";
import Chatbot from "./pages/Chatbot";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>

        {/* 🔥 DEFAULT ROUTE */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* PUBLIC */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* PROTECTED */}
        <Route path="/detect" element={<ProtectedRoute><Detect /></ProtectedRoute>} />
        <Route path="/weather" element={<ProtectedRoute><Weather /></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><Chatbot /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />

      </Routes>
    </Router>
  );
}

export default App;