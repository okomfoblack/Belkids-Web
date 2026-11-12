import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import "./Styles/Footer.css";


export default function Footer() {
  return (
    <footer className="locations-footer">
      <div className="locations-footer-inner">
        <div className="locations-footer-brand">
          <h3>Belkids Playground</h3>
          <p>Creating Memories</p>
        </div>

        <div className="locations-footer-discover">
          <h4>Discover the World of Belkids Playground</h4>
          <p>
            Whether you're booking your child's dream birthday party, planning
            your next family day out, or exploring exciting business
            opportunities, Belkids is here to make it magical.
          </p>
        </div>

        <div className="locations-footer-links">
          <h4>About Us</h4>
          <ul>
            <li><Link to="/parties">Parties</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact us</Link></li>
          </ul>

          <h4 className="footer-follow">Follow us on</h4>
          <div className="footer-socials">
            <a
              href="https://www.facebook.com/share/19Ma3XGNEW/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/belkids_playground/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@belkidsplayground"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>

      <div className="locations-footer-bottom">
        <p>© {new Date().getFullYear()} Belkids Playground. All rights reserved.</p>
      </div>
    </footer>
  );
}