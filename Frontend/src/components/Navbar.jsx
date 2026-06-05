import { Link } from "react-router-dom"
import "../Styles/Navbar.css"

function Navbar() {
  return (

    <nav className="Navbar">

      <div className="Nav-logo">
        <h2>ShopSphere</h2>
      </div>

      <div className="Nav-links">

        <Link to="/" className="nav-link">
          Home
        </Link>

        <Link to="/products" className="nav-link">
          Products
        </Link>

        <Link to="/cart" className="nav-link">
          Cart
        </Link>

        <Link to="/login" className="nav-link login-btn">
          Login
        </Link>

        <Link to="/signup" className="nav-link signup-btn">
          Signup
        </Link>

      </div>

    </nav>

  )
}

export default Navbar