// UserDashboard.jsx
import {
    FaUserCircle,
    FaChild,
    FaBirthdayCake,
    FaUtensils,
    FaCalendarCheck,
    FaSignOutAlt
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Styles/UserDashboard.css";

function UserDashboard() {
    const navigate = useNavigate();
    
    // Get user data from localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged out successfully");
        navigate("/login");
    };

    // Get profile image URL
    const getProfileImage = () => {
        if (user?.profileImage) {
            return user.profileImage;
        }
        return `https://ui-avatars.com/api/?name=${user?.username || "User"}&background=ff7739&color=fff&size=128`;
    };

    return (
        <section className="user-dashboard">
            {/* Dashboard Header with Profile Image */}
            <div className="dashboard-header">
                <div className="header-left">
                    <h1>
                        Welcome
                        <span> {user?.username}</span>
                    </h1>
                    <p>
                        Manage your Belkids Playground visits,
                        birthday events and restaurant reservations.
                    </p>
                </div>
                <div className="header-right">
                    <img
                        src={getProfileImage()}
                        alt={user?.username}
                        className="dashboard-profile-image"
                    />
                    <button className="logout-icon-btn" onClick={handleLogout}>
                        <FaSignOutAlt />
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="dashboard-stats">
                <div className="stat-card">
                    <FaChild />
                    <h2>24</h2>
                    <p>Play Sessions</p>
                </div>
                <div className="stat-card">
                    <FaBirthdayCake />
                    <h2>8</h2>
                    <p>Birthday Events</p>
                </div>
                <div className="stat-card">
                    <FaUtensils />
                    <h2>15</h2>
                    <p>Restaurant Orders</p>
                </div>
                <div className="stat-card">
                    <FaCalendarCheck />
                    <h2>6</h2>
                    <p>Upcoming Bookings</p>
                </div>
            </div>

            {/* Content Boxes */}
            <div className="dashboard-content">
                <div className="dashboard-box">
                    <h2>Upcoming Activities</h2>
                    <ul>
                        <li>Family Fun Day</li>
                        <li>Birthday Party Reservation</li>
                        <li>Weekend Restaurant Booking</li>
                        <li>Kids Adventure Event</li>
                    </ul>
                </div>
                <div className="dashboard-box">
                    <h2>Account Information</h2>
                    <div className="account-info">
                        <p>
                            <strong>Name:</strong> 
                            <span>{user?.username}</span>
                        </p>
                        <p>
                            <strong>Email:</strong> 
                            <span>{user?.email}</span>
                        </p>
                        <p>
                            <strong>Membership:</strong> 
                            <span>Premium Family</span>
                        </p>
                        <p>
                            <strong>Role:</strong> 
                            <span className="role-badge">{user?.role || "User"}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
                <button className="action-btn primary">
                    Book Playground
                </button>
                <button className="action-btn secondary">
                    Birthday Packages
                </button>
                <button className="action-btn secondary">
                    Restaurant Menu
                </button>
                <button className="action-btn secondary">
                    View Profile
                </button>
            </div>
        </section>
    );
}

export default UserDashboard;