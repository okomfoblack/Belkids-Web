// Navbar.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { 
  FaHome, 
  FaCalendarCheck, 
  FaUtensils, 
  FaSwimmingPool, 
  FaShoppingBag, 
  FaUser, 
  FaUserCog, 
  FaSignOutAlt, 
  FaChevronDown,
  FaBars,
  FaTimes,
  FaBirthdayCake,
  FaSchool,
  FaPhoneAlt,
  FaCocktail,
  FaDumbbell,
  FaIceCream,
  FaCandyCane,
  FaSwimmer,
  FaConciergeBell,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock
} from "react-icons/fa";
import { GiPopcorn } from "react-icons/gi";
import "./Styles/Navbar.css";

import logo from "../assets/Belkids-Images/image7.PNG";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownTimeoutRef = useRef(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    }

    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      if (updatedUser) {
        setUser(JSON.parse(updatedUser));
      } else {
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdownEnter = (itemPath) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(itemPath);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 200);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const getProfileImage = () => {
    if (user?.profileImage) return user.profileImage;
    return `https://ui-avatars.com/api/?name=${user?.username || "User"}&background=4CAF50&color=fff&size=40`;
  };

  const getDashboardLink = () => {
    return user?.role === "admin" ? "/admin-dashboard" : "/user-dashboard";
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };
  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">
        {/* ===== LOGO ===== */}
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <div className="logo-icon-wrapper">
            <img 
              src={logo} 
              alt="Belkids Playground" 
              className="logo-img" 
            />
          </div>
          <div className="logo-text">
            <h2>Belkids Playground</h2>
            <span className="logo-tagline">Playground & Events</span>
          </div>
        </Link>

        {/* ===== MOBILE MENU TOGGLE ===== */}
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* ===== NAVIGATION LINKS ===== */}
        <div className={`navbar-links ${mobileMenuOpen ? "mobile-menu-open" : ""}`}>
          <ul className="nav-list">
            {/* ===== HOME ===== */}
            <li className="nav-item">
              <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`} onClick={closeMobileMenu}>
                <FaHome className="nav-icon" />
                <span>Home</span>
              </Link>
            </li>

            {/* ===== EVENTS - REGULAR LINK (NOT DROPDOWN) ===== */}
            <li className="nav-item">
              <Link 
                to="/events" 
                className={`nav-link ${isActive("/events") ? "active" : ""}`}
                onClick={closeMobileMenu}
              >
                <FaCalendarCheck className="nav-icon" />
                <span>Events</span>
              </Link>
            </li>

            {/* ===== SERVICES DROPDOWN ===== */}
            <li 
              className="nav-item has-dropdown"
              onMouseEnter={() => handleDropdownEnter("/services")}
              onMouseLeave={handleDropdownLeave}
            >
              <Link 
                to="/services" 
                className={`nav-link ${isActive("/services") ? "active" : ""}`}
                onClick={closeMobileMenu}
              >
                <FaConciergeBell className="nav-icon" />
                <span>Services</span>
                <FaChevronDown className="dropdown-arrow-indicator" />
              </Link>
              <div className={`dropdown-menu-container ${activeDropdown === "/services" ? "dropdown-open" : ""}`}>
                <Link to="/restaurant" className="dropdown-menu-item" onClick={closeMobileMenu}>
                  <div className="dropdown-item-icon-wrapper">
                    <FaUtensils className="dropdown-item-icon" />
                  </div>
                  <span className="dropdown-item-label">Restaurant</span>
                </Link>
                <Link to="/pool" className="dropdown-menu-item" onClick={closeMobileMenu}>
                  <div className="dropdown-item-icon-wrapper">
                    <FaSwimmingPool className="dropdown-item-icon" />
                  </div>
                  <span className="dropdown-item-label">Swimming Pool</span>
                </Link>
                <Link to="/pool/equipment" className="dropdown-menu-item" onClick={closeMobileMenu}>
                  <div className="dropdown-item-icon-wrapper">
                    <FaDumbbell className="dropdown-item-icon" />
                  </div>
                  <span className="dropdown-item-label">Swim Gear</span>
                </Link>
                <Link to="/pool/lessons" className="dropdown-menu-item" onClick={closeMobileMenu}>
                  <div className="dropdown-item-icon-wrapper">
                    <FaSwimmer className="dropdown-item-icon" />
                  </div>
                  <span className="dropdown-item-label">Swim Lessons</span>
                </Link>
              </div>
            </li>

            {/* ===== SNACKS - REGULAR LINK (NOT DROPDOWN) ===== */}
            <li className="nav-item">
              <Link 
                to="/snacks" 
                className={`nav-link ${isActive("/snacks") ? "active" : ""}`}
                onClick={closeMobileMenu}
              >
                <FaCocktail className="nav-icon" />
                <span>Snacks</span>
              </Link>
            </li>

            {/* ===== SHOP ===== */}
            <li className="nav-item">
              <Link to="/shop" className={`nav-link ${isActive("/shop") ? "active" : ""}`} onClick={closeMobileMenu}>
                <FaShoppingBag className="nav-icon" />
                <span>Shop</span>
              </Link>
            </li>

            {/* ===== CONTACT - DROPDOWN (NOT A LINK) ===== */}
            <li 
              className="nav-item has-dropdown contact-dropdown"
              onMouseEnter={() => handleDropdownEnter("/contact")}
              onMouseLeave={handleDropdownLeave}
            >
              <span 
                className={`nav-link contact-trigger ${activeDropdown === "/contact" ? "active" : ""}`}
              >
                <FaPhoneAlt className="nav-icon" />
                <span>Contact</span>
                <FaChevronDown className="dropdown-arrow-indicator" />
              </span>
              <div className={`dropdown-menu-container contact-dropdown-menu ${activeDropdown === "/contact" ? "dropdown-open" : ""}`}>
                <div className="contact-dropdown-content">
                  <div className="contact-info-item">
                    <div className="contact-icon-wrapper">
                      <FaPhoneAlt className="contact-icon" />
                    </div>
                    <div>
                      <span className="contact-label">Phone</span>
                      <span className="contact-value">+233 24 123 4567</span>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-icon-wrapper">
                      <FaWhatsapp className="contact-icon" />
                    </div>
                    <div>
                      <span className="contact-label">WhatsApp</span>
                      <span className="contact-value">+233 24 123 4567</span>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-icon-wrapper">
                      <FaEnvelope className="contact-icon" />
                    </div>
                    <div>
                      <span className="contact-label">Email</span>
                      <span className="contact-value">info@belkids.com</span>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-icon-wrapper">
                      <FaMapMarkerAlt className="contact-icon" />
                    </div>
                    <div>
                      <span className="contact-label">Location</span>
                      <span className="contact-value">123 Main Street, Accra</span>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-icon-wrapper">
                      <FaClock className="contact-icon" />
                    </div>
                    <div>
                      <span className="contact-label">Hours</span>
                      <span className="contact-value">Mon-Sun: 8AM - 8PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            {/* ===== AUTH LINKS - MOBILE ===== */}
            {user ? (
              <>
                <li className="nav-item mobile-dashboard-link">
                  <Link 
                    to={getDashboardLink()} 
                    className={`nav-link ${isActive(getDashboardLink()) ? "active" : ""}`}
                    onClick={closeMobileMenu}
                  >
                    <FaUserCog className="nav-icon" />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li className="nav-item mobile-logout-link">
                  <button onClick={handleLogout} className="nav-link logout-btn-mobile">
                    <FaSignOutAlt className="nav-icon" />
                    <span>Logout</span>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link 
                    to="/login" 
                    className={`nav-link login-btn ${isActive("/login") ? "active" : ""}`}
                    onClick={closeMobileMenu}
                  >
                    <FaUser className="nav-icon" />
                    <span>Login</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    to="/signup" 
                    className={`nav-link signup-btn ${isActive("/signup") ? "active" : ""}`}
                    onClick={closeMobileMenu}
                  >
                    <span>Book Now</span>
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* ===== DESKTOP PROFILE ===== */}
          {user && (
            <div className="nav-profile">
              <div className="profile-container" onClick={toggleDropdown}>
                <img
                  src={getProfileImage()}
                  alt={user.username}
                  className="profile-avatar"
                  loading="lazy"
                />
                <span className="profile-username">{user.username}</span>
                <FaChevronDown className={`dropdown-arrow ${dropdownOpen ? "open" : ""}`} />
              </div>

              {dropdownOpen && (
                <div className="dropdown-menu">
                  <Link to={getDashboardLink()} className="dropdown-item">
                    <FaUserCog className="dropdown-icon" />
                    Dashboard
                  </Link>
                  <Link to="/profile" className="dropdown-item">
                    <FaUser className="dropdown-icon" />
                    Profile Settings
                  </Link>
                  <Link to="/my-bookings" className="dropdown-item">
                    <FaCalendarCheck className="dropdown-icon" />
                    My Bookings
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button onClick={handleLogout} className="dropdown-item logout-btn">
                    <FaSignOutAlt className="dropdown-icon" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;