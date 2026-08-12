// Navbar.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { 
  FaHome, 
  FaCalendarCheck, 
  FaUtensils, 
  FaSwimmingPool, 
  FaGamepad, 
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
  FaFutbol,
  FaBasketballBall,
  FaTableTennis,
  FaConciergeBell,
  FaStore
} from "react-icons/fa";
import { GiPopcorn } from "react-icons/gi";
import "../Styles/Navbar.css";

// ===== IMPORT YOUR LOGO IMAGE =====
import logo from "../assets/Belkids-Images/image7.PNG"; // ✅ CORRECT: Import the image

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownTimeoutRef = useRef(null);

  const navItems = [
    { path: "/", label: "Home", icon: FaHome, hasDropdown: false },
    { 
      path: "/events", 
      label: "Events", 
      icon: FaCalendarCheck,
      hasDropdown: true,
      subItems: [
        { path: "/events/birthday", label: "Birthday Parties", icon: FaBirthdayCake },
        { path: "/events/school", label: "School Bookings", icon: FaSchool },
        { path: "/events/corporate", label: "Corporate Events", icon: FaUser }
      ]
    },
    { 
      path: "/services", 
      label: "Services", 
      icon: FaConciergeBell,
      hasDropdown: true,
      subItems: [
        { path: "/restaurant", label: "Restaurant", icon: FaUtensils },
        { path: "/pool", label: "Swimming Pool", icon: FaSwimmingPool },
        { path: "/pool/equipment", label: "Swim Gear", icon: FaDumbbell },
        { path: "/pool/lessons", label: "Swim Lessons", icon: FaSwimmer }
      ]
    },
    { 
      path: "/games", 
      label: "Games", 
      icon: FaGamepad,
      hasDropdown: true,
      subItems: [
        { path: "/games/foosball", label: "Foosball", icon: FaTableTennis },
        { path: "/games/pool", label: "Pool Table", icon: FaGamepad },
        { path: "/games/football", label: "Football", icon: FaFutbol },
        { path: "/games/basketball", label: "Basketball", icon: FaBasketballBall }
      ]
    },
    { 
      path: "/snackbar", 
      label: "Snacks", 
      icon: FaCocktail,
      hasDropdown: true,
      subItems: [
        { path: "/snackbar/popcorn", label: "Popcorn", icon: GiPopcorn },
        { path: "/snackbar/cotton-candy", label: "Cotton Candy", icon: FaCandyCane },
        { path: "/snackbar/ice-cream", label: "Ice Cream", icon: FaIceCream },
        { path: "/snackbar/drinks", label: "Soft Drinks", icon: FaCocktail }
      ]
    },
    { path: "/shop", label: "Shop", icon: FaShoppingBag, hasDropdown: false },
    { path: "/contact", label: "Contact", icon: FaPhoneAlt, hasDropdown: false }
  ];

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
        {/* ========== LOGO WITH IMPORTED IMAGE ========== */}
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <div className="logo-icon-wrapper">
            {/* ✅ NOW USING THE IMPORTED LOGO */}
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

        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links */}
        <div className={`navbar-links ${mobileMenuOpen ? "mobile-menu-open" : ""}`}>
          <ul className="nav-list">
            {navItems.map((item) => (
              <li 
                key={item.path} 
                className={`nav-item ${item.hasDropdown ? "has-dropdown" : ""}`}
                onMouseEnter={() => item.hasDropdown && handleDropdownEnter(item.path)}
                onMouseLeave={handleDropdownLeave}
              >
                <Link 
                  to={item.path} 
                  className={`nav-link ${isActive(item.path) ? "active" : ""}`}
                  onClick={closeMobileMenu}
                >
                  <item.icon className="nav-icon" />
                  <span>{item.label}</span>
                  {item.hasDropdown && <FaChevronDown className="dropdown-arrow-indicator" />}
                </Link>

                {item.hasDropdown && (
                  <div className={`dropdown-menu-container ${activeDropdown === item.path ? "dropdown-open" : ""}`}>
                    {item.subItems.map((subItem) => (
                      <Link 
                        key={subItem.path} 
                        to={subItem.path} 
                        className="dropdown-menu-item"
                        onClick={closeMobileMenu}
                      >
                        <div className="dropdown-item-icon-wrapper">
                          <subItem.icon className="dropdown-item-icon" />
                        </div>
                        <span className="dropdown-item-label">{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}

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

          {/* Desktop Profile */}
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
                    <FaUserCog className="dropdown-icon" /> Dashboard
                  </Link>
                  <Link to="/profile" className="dropdown-item">
                    <FaUser className="dropdown-icon" /> Profile Settings
                  </Link>  /
                  <Link to="/my-bookings" className="dropdown-item">
                    <FaCalendarCheck className="dropdown-icon" /> My Bookings
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button onClick={handleLogout} className="dropdown-item logout-btn">
                    <FaSignOutAlt className="dropdown-icon" /> Logout
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
