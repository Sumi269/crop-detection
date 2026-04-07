import { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [result, setResult] = useState(null);
  const [weather, setWeather] = useState(null);
  const [solution, setSolution] = useState(null);

  return (
    <AppContext.Provider value={{
      result, setResult,
      weather, setWeather,
      solution, setSolution
    }}>
      {children}
    </AppContext.Provider>
  );
}