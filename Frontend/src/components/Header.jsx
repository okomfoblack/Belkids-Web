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

  /* =========================================
     CHECK LOGGED-IN USER
  ========================================= */

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Invalid user data:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  /* =========================================
     LOGOUT
  ========================================= */

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    navigate("/login");
  };

  /* =========================================
     DASHBOARD LINK
  ========================================= */

  const getDashboardLink = () => {
    return user?.role === "admin"
      ? "/admin-dashboard"
      : "/user-dashboard";
  };

  return (
    <header className="header">

      <div className="header-container">

        {/* =====================================
            LOGO
        ===================================== */}

        <Link
          to="/"
          className="header-logo logo-anim-wobble"
          aria-label="Belkids Playground Home"
        >
          <div className="logo-icon-wrapper">

            <img
              src={logo}
              alt="Belkids Playground"
              className="logo-img"
            />

          </div>
        </Link>


        {/* =====================================
            RIGHT SIDE
        ===================================== */}

        <div className="header-right">


          {/* ===================================
              SOCIAL MEDIA
          =================================== */}

          <div className="header-socials">

            {/* FACEBOOK */}
            <a
              href="https://www.facebook.com/share/19Ma3XGNEW/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon facebook-icon"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>


            {/* INSTAGRAM */}
            <a
              href="https://www.instagram.com/belkids_playground/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon instagram-icon"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>


            {/* TIKTOK */}
            <a
              href="https://www.tiktok.com/@belkidsplayground?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon tiktok-icon"
              aria-label="TikTok"
            >
              <FaTiktok />
            </a>

          </div>


          {/* ===================================
              AUTH BUTTONS
          =================================== */}

          <div className="header-auth">

            {user ? (
              <>

                {/* DASHBOARD */}
                <Link
                  to={getDashboardLink()}
                  className="header-btn header-btn-outline"
                  aria-label="Dashboard"
                >
                  <FaUserCog className="btn-icon" />

                  <span className="btn-text">
                    Dashboard
                  </span>
                </Link>


                {/* LOGOUT */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="header-btn header-btn-logout"
                  aria-label="Logout"
                >
                  <FaSignOutAlt className="btn-icon" />

                  <span className="btn-text">
                    Logout
                  </span>
                </button>

              </>
            ) : (
              <>

                {/* LOGIN */}
                <Link
                  to="/login"
                  className="header-btn header-btn-outline"
                  aria-label="Login"
                >
                  <FaUser className="btn-icon" />

                  <span className="btn-text">
                    Login
                  </span>
                </Link>


                {/* SIGN UP */}
                <Link
                  to="/signup"
                  className="header-btn header-btn-solid"
                  aria-label="Sign Up"
                >
                  <FaUserPlus className="btn-icon" />

                  <span className="btn-text">
                    Sign Up
                  </span>
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
