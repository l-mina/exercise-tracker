import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ProtectedRoute from "./components/ProtectedRoute"

import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import Dashboard from "./pages/DashboardPage"
import Session from "./pages/SessionPage"

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
            path:'/dashboard',
            element: <Dashboard />
          },
          {
            path:'/session',
            element: <Session />
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

  const checkAuth = userLogin((state) => state.checkAuth);
  const initialized = userLogin((state) => state.initialized);

  useEffect(() => {
    checkAuth();
  }, []); 

  if(!initialized) return <div className="text-xl">Loading... <span className="loading loading-spinner loading-md"></span></div>;

  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme={theme.theme}>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
