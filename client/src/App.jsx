import Navbar from "./components/Navbar"

import HomePage from "./pages/HomePage"

import { Routes, Route } from "react-router-dom";
import { useThemeStore } from "./store/useThemeStore"

function App() {

  const theme = useThemeStore();
  console.log(theme.theme);
  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme={theme.theme}>
      <Navbar />
      <div className="text-red-500">hello there</div>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App
