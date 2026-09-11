// components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Styles/Navbar.css";

function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About us" },
    { path: "/locations", label: "Locations" },
    { path: "/gallery", label: "Gallery" },
    { path: "/contact", label: "Contact us" },
    { path: "/book", label: "Book Now" }
  ];

  const toggle = () => setMobileMenuOpen(!mobileMenuOpen);
  const close = () => setMobileMenuOpen(false);
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button className="mobile-menu-toggle" onClick={toggle}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={`nav-list ${mobileMenuOpen ? "mobile-menu-open" : ""}`}>
          {navLinks.map((link) => (
            <li key={link.path} className="nav-item">
              <Link
                to={link.path}
                className={`nav-link ${isActive(link.path) ? "active" : ""}`}
                onClick={close}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;