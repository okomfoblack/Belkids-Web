// components/Header.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  FaUser,
  FaUserPlus,
  FaUserCog,
  FaSignOutAlt,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";

import "./Styles/Header.css";
import logo from "../assets/Belkids-Images/image7.PNG";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const getDashboardLink = () =>
    user?.role === "admin" ? "/admin-dashboard" : "/user-dashboard";

  return (
    <header className="header">
      <div className="header-container">

        {/* LOGO */}
        <Link
          to="/"
          className="header-logo logo-anim-wobble"
          aria-label="Belkids Playground Home"
        >
          <div className="logo-icon-wrapper">
            <img src={logo} alt="Belkids Playground" className="logo-img" />
          </div>
        </Link>

        {/* RIGHT SIDE — desktop only */}
        <div className="header-right">

          {/* Socials */}
          <div className="header-socials">
            <a
              href="https://www.facebook.com/share/19Ma3XGNEW/?mibextid=wwXIfr"
              target="_blank" rel="noopener noreferrer"
              className="social-icon facebook-icon" aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/belkids_playground/?hl=en"
              target="_blank" rel="noopener noreferrer"
              className="social-icon instagram-icon" aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@belkidsplayground?is_from_webapp=1&sender_device=pc"
              target="_blank" rel="noopener noreferrer"
              className="social-icon tiktok-icon" aria-label="TikTok"
            >
              <FaTiktok />
            </a>
          </div>

          {/* Auth */}
          <div className="header-auth">
            {user ? (
              <>
                <Link
                  to={getDashboardLink()}
                  className="header-btn header-btn-outline"
                  aria-label="Dashboard"
                >
                  <FaUserCog className="btn-icon" />
                  <span className="btn-text">Dashboard</span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="header-btn header-btn-logout"
                  aria-label="Logout"
                >
                  <FaSignOutAlt className="btn-icon" />
                  <span className="btn-text">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="header-btn header-btn-outline"
                  aria-label="Login"
                >
                  <FaUser className="btn-icon" />
                  <span className="btn-text">Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="header-btn header-btn-solid"
                  aria-label="Sign Up"
                >
                  <FaUserPlus className="btn-icon" />
                  <span className="btn-text">Sign Up</span>
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;