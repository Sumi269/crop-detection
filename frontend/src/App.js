import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Home from "./pages/Home";
import Detect from "./pages/Detect";
import Weather from "./pages/Weather";
import Solution from "./pages/Solution";
import Videos from "./pages/Videos";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>

        {/* 🔥 DEFAULT ROUTE */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* PROTECTED */}
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/detect" element={<ProtectedRoute><Detect /></ProtectedRoute>} />
        <Route path="/weather" element={<ProtectedRoute><Weather /></ProtectedRoute>} />
        <Route path="/solution" element={<ProtectedRoute><Solution /></ProtectedRoute>} />
        <Route path="/videos" element={<ProtectedRoute><Videos /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />

      </Routes>
    </Router>
  );
}

export default App;