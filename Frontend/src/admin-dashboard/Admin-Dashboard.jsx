// AdminDashboard.jsx
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import api from "../utils/api";
import {
  FaUsers,
  FaBirthdayCake,
  FaUtensils,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaDollarSign,
  FaCalendarAlt,
  FaClock,
  FaCheck,
  FaArrowUp,
  FaPhoneAlt,
  FaSync,
  FaSearch,
  FaUser,
  FaEnvelope,
  FaCalendarCheck,
  FaTimesCircle
} from "react-icons/fa";
import "./Styles/AdminDashboard.css";

const navItems = [
  { key: "overview", label: "Overview", icon: FaChartBar },
  { key: "users", label: "Users", icon: FaUsers },
  { key: "bookings", label: "Bookings", icon: FaBirthdayCake },
  { key: "orders", label: "Payments", icon: FaUtensils },
  { key: "settings", label: "Settings", icon: FaCog }
];

function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Users section state
  const [userSearch, setUserSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  // Auth guard
  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (!raw) return navigate("/login");
    try {
      const parsed = JSON.parse(raw);
      if (parsed.role !== "admin") return navigate("/user-dashboard");
      setUser(parsed);
    } catch {
      navigate("/login");
    }
  }, [navigate]);

  // Load all admin data
  const loadData = async () => {
    setLoading(true);
    try {
      const [uRes, bRes, pRes] = await Promise.all([
        api.getAllUsers().catch(() => ({ data: [] })),
        api.getAllBookings().catch(() => ({ data: [] })),
        api.getAllPayments().catch(() => ({ data: [] }))
      ]);
      setUsers(uRes.data || []);
      setBookings(bRes.data || []);
      setPayments(pRes.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Could not load admin data");
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
    navigate("/login");
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await api.updateBookingStatus(bookingId, newStatus);
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, status: newStatus } : b
        )
      );
      toast.success(`Booking → ${newStatus}`);
    } catch (err) {
      toast.error(err.message || "Update failed");
    }
  };

  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric"
        })
      : "—";

  const formatDateTime = (d) =>
    d
      ? new Date(d).toLocaleString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })
      : "—";

  // Safe string conversion helper
  const toLower = (val) => (val == null ? "" : String(val).toLowerCase());

  // Filter users by search (username, name, email, phone, etc.)
  const filteredUsers = useMemo(() => {
    const q = userSearch.trim().toLowerCase();
    if (!q) return users;

    return users.filter((u) => {
      const fields = [
        u.username,
        u.name,
        u.fullName,
        u.email,
        u.phone,
        u.phoneNumber,
        u.mobile,
        u.contact
      ];
      return fields.some((field) => toLower(field).includes(q));
    });
  }, [users, userSearch]);

  // Get bookings belonging to a specific user
  const getUserBookings = (u) =>
    bookings.filter(
      (b) =>
        b.user?._id === u._id ||
        b.user === u._id ||
        b.email === u.email
    );

  if (!user) return null;

  const totalRevenue = payments
    .filter((p) => p.status === "success")
    .reduce((s, p) => s + p.amount / 100, 0);

  const overviewCards = [
    { icon: FaUsers, label: "Total Users", value: users.length, trend: "live" },
    { icon: FaBirthdayCake, label: "Bookings", value: bookings.length, trend: "live" },
    { icon: FaUtensils, label: "Payments", value: payments.length, trend: "live" },
    {
      icon: FaDollarSign,
      label: "Revenue (GH₵)",
      value: totalRevenue.toLocaleString(),
      trend: "live"
    }
  ];

  return (
    <>
      <div className="admin-dashboard">
        <button
          className="admin-mobile-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className="admin-layout">
          {/* SIDEBAR */}
          <AnimatePresence>
            {(sidebarOpen || window.innerWidth > 900) && (
              <motion.aside
                className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -40, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="admin-profile">
                  <img
                    src={
                      user.profileImage ||
                      `https://ui-avatars.com/api/?name=${user.username}&background=5D4037&color=fff`
                    }
                    alt={user.username}
                    className="admin-avatar"
                  />
                  <h3>{user.username}</h3>
                  <p>{user.email}</p>
                  <span className="admin-role-badge">Admin</span>
                </div>

                <nav className="admin-nav">
                  {navItems.map((item) => (
                    <button
                      key={item.key}
                      className={`admin-nav-item ${
                        tab === item.key ? "active" : ""
                      }`}
                      onClick={() => {
                        setTab(item.key);
                        setSidebarOpen(false);
                      }}
                    >
                      <item.icon className="admin-nav-icon" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                  <button
                    className="admin-nav-item logout"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="admin-nav-icon" />
                    <span>Logout</span>
                  </button>
                </nav>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* MAIN */}
          <main className="admin-main">
            <AnimatePresence mode="wait">
              {/* OVERVIEW */}
              {tab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="admin-page-header">
                    <div>
                      <span className="admin-tag">Admin Panel</span>
                      <h1>
                        Welcome back, <span>{user.username}</span>
                      </h1>
                      <p>Here's what's happening at Belkids today.</p>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button
                        className="admin-primary-btn"
                        onClick={loadData}
                        disabled={loading}
                      >
                        <FaSync className={loading ? "spinning" : ""} />{" "}
                        Refresh
                      </button>
                    </div>
                  </div>

                  <div className="admin-stats-grid">
                    {overviewCards.map((c, i) => (
                      <motion.div
                        key={i}
                        className="admin-stat-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.4 }}
                      >
                        <div className="admin-stat-icon">
                          <c.icon />
                        </div>
                        <div>
                          <p>{c.label}</p>
                          <h2>{c.value}</h2>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="admin-two-col">
                    <div className="admin-panel">
                      <div className="admin-panel-header">
                        <h2>Recent Bookings</h2>
                        <button
                          className="admin-panel-link"
                          onClick={() => setTab("bookings")}
                        >
                          View all
                        </button>
                      </div>
                      <div className="admin-table-wrap">
                        {loading ? (
                          <p className="empty-msg">Loading…</p>
                        ) : bookings.length === 0 ? (
                          <p className="empty-msg">No bookings yet.</p>
                        ) : (
                          <table className="admin-table">
                            <thead>
                              <tr>
                                <th>User</th>
                                <th>Date</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {bookings.slice(0, 4).map((b) => (
                                <tr key={b._id}>
                                  <td>{b.user?.username || b.user?.name || "—"}</td>
                                  <td>{formatDate(b.createdAt)}</td>
                                  <td>
                                    <span
                                      className={`admin-status ${
                                        b.status === "confirmed"
                                          ? "ok"
                                          : b.status === "cancelled"
                                          ? "pending"
                                          : "pending"
                                      }`}
                                    >
                                      {b.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>

                    <div className="admin-panel">
                      <div className="admin-panel-header">
                        <h2>Recent Payments</h2>
                        <button
                          className="admin-panel-link"
                          onClick={() => setTab("orders")}
                        >
                          View all
                        </button>
                      </div>
                      <div className="admin-table-wrap">
                        {loading ? (
                          <p className="empty-msg">Loading…</p>
                        ) : payments.length === 0 ? (
                          <p className="empty-msg">No payments yet.</p>
                        ) : (
                          <table className="admin-table">
                            <thead>
                              <tr>
                                <th>Reference</th>
                                <th>Status</th>
                                <th>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {payments.slice(0, 4).map((p) => (
                                <tr key={p._id}>
                                  <td>{p.reference}</td>
                                  <td>
                                    <span
                                      className={`admin-status ${
                                        p.status === "success"
                                          ? "ok"
                                          : "pending"
                                      }`}
                                    >
                                      {p.status}
                                    </span>
                                  </td>
                                  <td>
                                    GH₵
                                    {(p.amount / 100).toLocaleString()}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* USERS */}
              {tab === "users" && (
                <motion.div
                  key="users"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="admin-page-header">
                    <div>
                      <span className="admin-tag">User Management</span>
                      <h1>Registered Users</h1>
                      <p>
                        Search, view and manage all families registered at
                        Belkids.
                      </p>
                    </div>
                  </div>

                  <div className="admin-panel">
                    {/* SEARCH BAR */}
                    <div className="admin-search-wrap">
                      <FaSearch className="admin-search-icon" />
                      <input
                        type="text"
                        className="admin-search-input"
                        placeholder="Search by name, email or phone…"
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                      />
                      {userSearch && (
                        <button
                          className="admin-search-clear"
                          onClick={() => setUserSearch("")}
                          title="Clear search"
                        >
                          <FaTimesCircle />
                        </button>
                      )}
                    </div>

                    <div className="admin-table-wrap">
                      {loading ? (
                        <p className="empty-msg">Loading…</p>
                      ) : users.length === 0 ? (
                        <p className="empty-msg">No users yet.</p>
                      ) : filteredUsers.length === 0 ? (
                        <p className="empty-msg">
                          No users match "{userSearch}".
                        </p>
                      ) : (
                        <table className="admin-table">
                          <thead>
                            <tr>
                              <th>Username</th>
                              <th>Email</th>
                              <th>Phone</th>
                              <th>Role</th>
                              <th>Joined</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredUsers.map((u) => (
                              <tr
                                key={u._id}
                                className="admin-clickable-row"
                                onClick={() => setSelectedUser(u)}
                                title="View user details"
                              >
                                <td>
                                  <div className="admin-user-cell">
                                    <img
                                      src={
                                        u.profileImage ||
                                        `https://ui-avatars.com/api/?name=${
                                          u.username || u.name || "User"
                                        }&background=2E7D32&color=fff&size=40`
                                      }
                                      alt={u.username || u.name || "User"}
                                    />
                                    <span>
                                      {u.username || u.name || "—"}
                                    </span>
                                  </div>
                                </td>
                                <td>{u.email || "—"}</td>
                                <td>
                                  {u.phone ||
                                    u.phoneNumber ||
                                    u.mobile ||
                                    "—"}
                                </td>
                                <td>
                                  <span className="admin-status ok">
                                    {u.role || "user"}
                                  </span>
                                </td>
                                <td>{formatDate(u.createdAt)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* BOOKINGS */}
              {tab === "bookings" && (
                <motion.div
                  key="bookings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="admin-page-header">
                    <div>
                      <span className="admin-tag">Bookings</span>
                      <h1>Birthday Bookings</h1>
                      <p>Approve, confirm, or cancel bookings.</p>
                    </div>
                  </div>

                  <div className="admin-panel">
                    <div className="admin-table-wrap">
                      {loading ? (
                        <p className="empty-msg">Loading…</p>
                      ) : bookings.length === 0 ? (
                        <p className="empty-msg">No bookings yet.</p>
                      ) : (
                        <table className="admin-table">
                          <thead>
                            <tr>
                              <th>User</th>
                              <th>Package</th>
                              <th>Amount</th>
                              <th>Date</th>
                              <th>Status</th>
                              <th>Change</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bookings.map((b) => (
                              <tr key={b._id}>
                                <td>{b.user?.username || b.user?.name || "—"}</td>
                                <td>{b.packageName}</td>
                                <td>GH₵{b.amount.toLocaleString()}</td>
                                <td>{formatDate(b.createdAt)}</td>
                                <td>
                                  <span
                                    className={`admin-status ${
                                      b.status === "confirmed"
                                        ? "ok"
                                        : b.status === "cancelled"
                                        ? "pending"
                                        : "pending"
                                    }`}
                                  >
                                    {b.status}
                                  </span>
                                </td>
                                <td>
                                  <select
                                    className="status-select"
                                    value={b.status}
                                    onChange={(e) =>
                                      handleStatusChange(
                                        b._id,
                                        e.target.value
                                      )
                                    }
                                  >
                                    <option value="pending">pending</option>
                                    <option value="confirmed">
                                      confirmed
                                    </option>
                                    <option value="cancelled">
                                      cancelled
                                    </option>
                                    <option value="completed">
                                      completed
                                    </option>
                                  </select>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* PAYMENTS / ORDERS */}
              {tab === "orders" && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="admin-page-header">
                    <div>
                      <span className="admin-tag">Payments</span>
                      <h1>All Transactions</h1>
                      <p>Every Paystack transaction recorded on the site.</p>
                    </div>
                  </div>

                  <div className="admin-panel">
                    <div className="admin-table-wrap">
                      {loading ? (
                        <p className="empty-msg">Loading…</p>
                      ) : payments.length === 0 ? (
                        <p className="empty-msg">No payments yet.</p>
                      ) : (
                        <table className="admin-table">
                          <thead>
                            <tr>
                              <th>Reference</th>
                              <th>User</th>
                              <th>Package</th>
                              <th>Amount</th>
                              <th>Status</th>
                              <th>Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {payments.map((p) => (
                              <tr key={p._id}>
                                <td
                                  style={{
                                    fontFamily: "monospace",
                                    fontSize: 12
                                  }}
                                >
                                  {p.reference}
                                </td>
                                <td>{p.user?.username || p.user?.name || "guest"}</td>
                                <td>{p.packageName}</td>
                                <td>
                                  GH₵{(p.amount / 100).toLocaleString()}
                                </td>
                                <td>
                                  <span
                                    className={`admin-status ${
                                      p.status === "success"
                                        ? "ok"
                                        : "pending"
                                    }`}
                                  >
                                    {p.status}
                                  </span>
                                </td>
                                <td>{formatDate(p.createdAt)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SETTINGS */}
              {tab === "settings" && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="admin-page-header">
                    <div>
                      <span className="admin-tag">Settings</span>
                      <h1>Site Settings</h1>
                      <p>Manage your Belkids configuration.</p>
                    </div>
                  </div>

                  <div className="admin-settings-grid">
                    <div className="admin-panel">
                      <h3 className="admin-panel-title">
                        <FaPhoneAlt /> Contact Info
                      </h3>
                      <p className="admin-setting-row">
                        <span>Phone:</span>{" "}
                        <strong>+233 244 701 007</strong>
                      </p>
                      <p className="admin-setting-row">
                        <span>WhatsApp:</span>{" "}
                        <strong>+233 244 701 007</strong>
                      </p>
                      <p className="admin-setting-row">
                        <span>Email:</span>{" "}
                        <strong>hello@belkids.gh</strong>
                      </p>
                    </div>
                    <div className="admin-panel">
                      <h3 className="admin-panel-title">
                        <FaClock /> Hours
                      </h3>
                      <p className="admin-setting-row">
                        <span>Mon – Tue:</span> <strong>Closed</strong>
                      </p>
                      <p className="admin-setting-row">
                        <span>Wed – Sun:</span> <strong>9 AM – 6 PM</strong>
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* USER DETAIL MODAL */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            className="admin-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedUser(null)}
          >
            <motion.div
              className="admin-modal"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="admin-modal-close"
                onClick={() => setSelectedUser(null)}
                title="Close"
              >
                <FaTimes />
              </button>

              <div className="admin-modal-header">
                <img
                  src={
                    selectedUser.profileImage ||
                    `https://ui-avatars.com/api/?name=${
                      selectedUser.username || selectedUser.name || "User"
                    }&background=2E7D32&color=fff&size=96`
                  }
                  alt={selectedUser.username || selectedUser.name || "User"}
                  className="admin-modal-avatar"
                />
                <div>
                  <h2>
                    {selectedUser.username || selectedUser.name || "—"}
                  </h2>
                  <span className="admin-role-badge">
                    {selectedUser.role || "user"}
                  </span>
                </div>
              </div>

              <div className="admin-modal-body">
                <h3 className="admin-modal-section-title">
                  <FaUser /> Account Details
                </h3>

                <div className="admin-detail-row">
                  <FaUser className="admin-detail-icon" />
                  <div>
                    <span>Username</span>
                    <strong>
                      {selectedUser.username || selectedUser.name || "—"}
                    </strong>
                  </div>
                </div>

                {(selectedUser.fullName || selectedUser.name) && (
                  <div className="admin-detail-row">
                    <FaUser className="admin-detail-icon" />
                    <div>
                      <span>Full Name</span>
                      <strong>
                        {selectedUser.fullName || selectedUser.name}
                      </strong>
                    </div>
                  </div>
                )}

                <div className="admin-detail-row">
                  <FaEnvelope className="admin-detail-icon" />
                  <div>
                    <span>Email</span>
                    <strong>{selectedUser.email || "—"}</strong>
                  </div>
                </div>

                <div className="admin-detail-row">
                  <FaPhoneAlt className="admin-detail-icon" />
                  <div>
                    <span>Phone</span>
                    <strong>
                      {selectedUser.phone ||
                        selectedUser.phoneNumber ||
                        selectedUser.mobile ||
                        "Not provided"}
                    </strong>
                  </div>
                </div>

                <div className="admin-detail-row">
                  <FaCalendarCheck className="admin-detail-icon" />
                  <div>
                    <span>Joined</span>
                    <strong>
                      {formatDateTime(selectedUser.createdAt)}
                    </strong>
                  </div>
                </div>

                <h3 className="admin-modal-section-title">
                  <FaBirthdayCake /> Bookings
                </h3>

                {(() => {
                  const userBookings = getUserBookings(selectedUser);
                  if (userBookings.length === 0) {
                    return (
                      <p className="admin-modal-empty">
                        No bookings made by this user yet.
                      </p>
                    );
                  }
                  return (
                    <ul className="admin-modal-list">
                      {userBookings.map((b) => (
                        <li key={b._id}>
                          <div>
                            <strong>{b.packageName}</strong>
                            <span>
                              {formatDate(b.eventDate || b.createdAt)} • GH₵
                              {b.amount.toLocaleString()}
                            </span>
                          </div>
                          <span
                            className={`admin-status ${
                              b.status === "confirmed" ? "ok" : "pending"
                            }`}
                          >
                            {b.status}
                          </span>
                        </li>
                      ))}
                    </ul>
                  );
                })()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AdminDashboard;