import { Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"

import LandingPage from "./pages/LandingPage"
import Login from "./pages/Login"
import Signup from "./pages/Signup" 
import AdminDashboard from "./admin-dashboard/Admin-Dashboard" 
import UserDashboard from "./user-dashboard/UserDashboard"
import "./Styles/global.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <>
      <Navbar />
      <ToastContainer 
      position="top-right"
        autoClose={3000}
        theme="dark" />

    
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>
    </>
  )
}

export default App