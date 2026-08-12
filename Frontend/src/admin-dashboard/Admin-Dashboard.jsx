// AdminDashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaBox, FaShoppingCart, FaChartBar, FaCog, FaSignOutAlt } from "react-icons/fa";
import "./Styles/AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }
    try {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role !== "admin") {
        navigate("/user-dashboard");
        return;
      }
      setUser(parsedUser);
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar admin-sidebar">
        <div className="dashboard-profile">
          <img
            src={user.profileImage || `https://ui-avatars.com/api/?name=${user.username}&background=ff7739&color=fff`}
            alt={user.username}
            className="dashboard-avatar"
          />
          <h3>{user.username}</h3>
          <p>{user.email}</p>
          <span className="user-role admin-role">Admin</span>
        </div>
        <div className="dashboard-menu">
          <button className="dashboard-menu-item active">
            <FaChartBar className="menu-icon" />
            Dashboard
          </button>
          <button className="dashboard-menu-item">
            <FaUsers className="menu-icon" />
            Users
          </button>
          <button className="dashboard-menu-item">
            <FaBox className="menu-icon" />
            Products
          </button>
          <button className="dashboard-menu-item">
            <FaShoppingCart className="menu-icon" />
            Orders
          </button>
          <button className="dashboard-menu-item">
            <FaCog className="menu-icon" />
            Settings
          </button>
          <button className="dashboard-menu-item logout" onClick={handleLogout}>
            <FaSignOutAlt className="menu-icon" />
            Logout
          </button>
        </div>
      </div>
      <div className="dashboard-content">
        <h1>Admin Dashboard</h1>
        <p>Welcome back, {user.username}! Here you can manage your store.</p>
      </div>
    </div>
  );
}

export default AdminDashboard;