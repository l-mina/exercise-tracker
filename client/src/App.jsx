import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"

import { createBrowserRouter, RouterProvider, ScrollRestoration, Outlet } from "react-router-dom"
import { useThemeStore } from "./store/useThemeStore"

const HeaderLayout = () => (
  <>
    <header>
      <Navbar />
    </header>
    <ScrollRestoration />
    <Outlet />
    <Footer />
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
