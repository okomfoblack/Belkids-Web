// UserDashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../utils/api";
import {
  FaChild,
  FaBirthdayCake,
  FaUtensils,
  FaCalendarCheck,
  FaSignOutAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaClock,
  FaStar,
  FaHeart,
  FaCamera,
  FaChevronRight,
  FaSync
} from "react-icons/fa";
import "./Styles/UserDashboard.css";

function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (!raw) return navigate("/login");

    try {
      setUser(JSON.parse(raw));
    } catch {
      return navigate("/login");
    }
  }, [navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [bRes, pRes] = await Promise.all([
        api.getMyBookings().catch(() => ({ data: [] })),
        api.getMyPayments().catch(() => ({ data: [] }))
      ]);
      setBookings(bRes.data || []);
      setPayments(pRes.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Could not load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) loadData();
    // eslint-disable-next-line
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const getProfileImage = () => {
    if (user?.profileImage) return user.profileImage;
    return `https://ui-avatars.com/api/?name=${user?.username || "User"}&background=2E7D32&color=fff&size=128`;
  };

  const totalSpent = payments
    .filter((p) => p.status === "success")
    .reduce((sum, p) => sum + p.amount / 100, 0);

  const upcoming = bookings.filter(
    (b) => b.status === "pending" || b.status === "confirmed"
  );

  const stats = [
    { icon: FaBirthdayCake, value: bookings.length, label: "Total Bookings", color: "#E91E63" },
    { icon: FaCalendarCheck, value: upcoming.length, label: "Upcoming Events", color: "#2E7D32" },
    { icon: FaUtensils, value: payments.filter((p) => p.status === "success").length, label: "Paid Orders", color: "#F57C00" },
    { icon: FaStar, value: `GH₵${totalSpent.toLocaleString()}`, label: "Total Spent", color: "#5D4037" }
  ];

  const quickActions = [
    { icon: FaBirthdayCake, label: "Book a Party", to: "/book", primary: true },
    { icon: FaUtensils, label: "View Snack Menu", to: "/snacks" },
    { icon: FaMapMarkerAlt, label: "Find Us", to: "/locations" },
    { icon: FaCamera, label: "Browse Gallery", to: "/gallery" }
  ];

  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric"
        })
      : "—";

  if (!user) return null;

  return (
    <>
      <Header />
      <Navbar />
      <div className="user-dashboard">
        <div className="user-dashboard-inner">
          {/* HEADER */}
          <motion.div
            className="dashboard-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="header-left">
              <span className="dashboard-tag">
                <FaStar /> My Dashboard
              </span>
              <h1>
                Welcome back, <span>{user.username}</span>
              </h1>
              <p>
                Manage your Belkids Playground visits, birthday events and
                restaurant reservations — all in one place.
              </p>
            </div>
            <div className="header-right">
              <img
                src={getProfileImage()}
                alt={user.username}
                className="dashboard-profile-image"
              />
              <button
                className="logout-icon-btn"
                onClick={handleLogout}
                title="Logout"
              >
                <FaSignOutAlt />
              </button>
            </div>
          </motion.div>

          {/* STATS */}
          <div className="dashboard-stats">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                className="stat-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="stat-icon" style={{ color: s.color }}>
                  <s.icon />
                </div>
                <h2>{s.value}</h2>
                <p>{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* CONTENT */}
          <div className="dashboard-content">
            {/* Upcoming activities */}
            <motion.div
              className="dashboard-box"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="box-header">
                <h2>Upcoming Activities</h2>
                <button
                  className="box-link"
                  onClick={loadData}
                  disabled={loading}
                >
                  <FaSync className={loading ? "spinning" : ""} /> Refresh
                </button>
              </div>

              {loading ? (
                <p className="empty-msg">Loading…</p>
              ) : upcoming.length === 0 ? (
                <p className="empty-msg">
                  No upcoming bookings yet.{" "}
                  <Link to="/book" className="empty-link">
                    Book one now →
                  </Link>
                </p>
              ) : (
                <ul className="activity-list">
                  {upcoming.map((b) => (
                    <li key={b._id}>
                      <div className="activity-dot" />
                      <div className="activity-info">
                        <strong>{b.packageName}</strong>
                        <span>
                          <FaClock />{" "}
                          {b.eventDate
                            ? formatDate(b.eventDate)
                            : `Booked ${formatDate(b.createdAt)}`}
                        </span>
                      </div>
                      <span
                        className={`activity-tag ${b.status}`}
                      >
                        {b.status}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>

            {/* Payment history */}
            <motion.div
              className="dashboard-box"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="box-header">
                <h2>Payment History</h2>
              </div>
              {loading ? (
                <p className="empty-msg">Loading…</p>
              ) : payments.length === 0 ? (
                <p className="empty-msg">No payments yet.</p>
              ) : (
                <ul className="activity-list">
                  {payments.slice(0, 5).map((p) => (
                    <li key={p._id}>
                      <div className="activity-dot" />
                      <div className="activity-info">
                        <strong>{p.packageName}</strong>
                        <span>
                          <FaClock /> {formatDate(p.createdAt)} •{" "}
                          GH₵{(p.amount / 100).toLocaleString()}
                        </span>
                      </div>
                      <span className={`activity-tag ${p.status}`}>
                        {p.status}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </div>

          {/* QUICK ACTIONS */}
          <motion.div
            className="quick-actions-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2>Quick Actions</h2>
            <div className="action-buttons">
              {quickActions.map((a, i) => (
                <Link
                  key={i}
                  to={a.to}
                  className={`action-btn ${a.primary ? "primary" : "secondary"}`}
                >
                  <a.icon />
                  <span>{a.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* SUPPORT */}
          <motion.div
            className="support-strip"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div>
              <h3>Need help planning your visit?</h3>
              <p>Our team is here for you — call or WhatsApp us anytime.</p>
            </div>
            <div className="support-actions">
              <a href="tel:+233244701007" className="support-btn">
                <FaPhoneAlt /> Call
              </a>
              <a
                href="https://wa.me/233244701007"
                target="_blank"
                rel="noreferrer"
                className="support-btn support-btn-wa"
              >
                <FaWhatsapp /> WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserDashboard;