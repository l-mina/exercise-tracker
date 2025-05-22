import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import Dashboard from "./pages/DashboardPage"

import { createBrowserRouter, RouterProvider, ScrollRestoration, Outlet, redirect } from "react-router-dom"
import { useThemeStore } from "./store/useThemeStore"

import { Toaster } from "react-hot-toast"

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
        path:'/dashboard',
        element:<Dashboard />,
        loader: async() => {
          const isAuthenticated = true;
          if(!isAuthenticated){
            return redirect('/login');
          }
          return null;
        },
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

  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme={theme.theme}>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
