import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"

import { Routes, Route, ScrollRestoration } from "react-router-dom"
import { useThemeStore } from "./store/useThemeStore"

function App() {

  const theme = useThemeStore();

  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme={theme.theme}>

      <Navbar />
      
      <Routes>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      
      <Footer />
    </div>
  )
}

export default App
