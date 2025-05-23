import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ProtectedRoute from "./components/ProtectedRoute"

import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import Dashboard from "./pages/DashboardPage"

import { userLogin } from "./store/userLogin"

import { createBrowserRouter, RouterProvider, ScrollRestoration, Outlet } from "react-router-dom"
import { useThemeStore } from "./store/useThemeStore"


import { Toaster } from "react-hot-toast"
import { useEffect } from "react"

const HeaderLayout = () => (
  <>
    <header>
      <Navbar />
    </header>
    <ScrollRestoration />
    <Outlet />
    <Footer />
    <Toaster />
  </>
);

const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    children: [
      {
        path:'/', 
        element:<HomePage />
      },
      {
        path:'/login',
        element:<LoginPage />
      },
      {
        path:'/signup',
        element:<RegisterPage />
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/dashboard',
            element: <Dashboard />
          }
        ],
      },
      {
        path:'/*',
        element:<HomePage />
      }
    ]
  },
  
]);

function App() {

  const theme = useThemeStore();
  const initAuth = userLogin((state) => state.initAuth);
  const initialized = userLogin((state) => state.initialized);

  useEffect(() => {
    initAuth();
  }, []); 

  if(!initialized) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme={theme.theme}>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
