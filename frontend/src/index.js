import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import AppProvider from "./context/AppContext";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <AppProvider>   {/* 🔥 THIS WAS MISSING */}
      <App />
    </AppProvider>
  </AuthProvider>
);