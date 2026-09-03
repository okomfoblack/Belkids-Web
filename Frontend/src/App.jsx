// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import UserDashboard from "./user-dashboard/UserDashboard";
import AdminDashboard from "./admin-dashboard/Admin-Dashboard";
import EventPage from "./Pages/EventPage";  
import SnackPage from "./Pages/SnackPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>  {/* ✅ ONLY ONE Router - right here */}
      <Navbar />
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/snacks" element={<SnackPage />} />
      </Routes>
    </Router>
  );
}

export default App;