// Pages/LocationPage.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import {
  FaMapMarkerAlt,
  FaClock,
  FaHeart,
  FaStar,
  FaPhoneAlt,
  FaDirections,
  FaFacebookF,
  FaInstagram,
  FaTiktok
} from "react-icons/fa";
import "./Styles/LocationPage.css";
import heroBanner from "../assets/Belkids-Images/location.png";
import Footer from "../components/Footer";

function LocationPage() {
  // ===== BELKIDS PLAYGROUND — GBAWE, ACCRA =====
  // Google Plus Code for Belkids Playground
  const ADDRESS = "HPH3+RQM, Lane 1, Gbawe, Ghana";
  const MAP_QUERY = "Belkids Playground, Gbawe, Ghana";

  // Embedded map centered on Belkids Playground (searched by name)
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=16&output=embed`;

  // Directions link to Belkids Playground
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAP_QUERY)}`;

  const hours = [
    { day: "Monday", time: "Closed", closed: true },
    { day: "Tuesday", time: "Closed", closed: true },
    { day: "Wednesday", time: "9:00 AM – 6:00 PM" },
    { day: "Thursday", time: "9:00 AM – 6:00 PM" },
    { day: "Friday", time: "9:00 AM – 6:00 PM" },
    { day: "Saturday", time: "9:00 AM – 6:00 PM" },
    { day: "Sunday", time: "9:00 AM – 6:00 PM" }
  ];

  const features = [
    "Founded by MzBel in 2021",
    "Safe playground for children",
    "Tasty food available for adults",
    "Affordable entry (GH₵30 per child)",
    "Accommodating staff & clean facilities",
    "Birthday parties & school bookings"
  ];

  return (
    <>
      <Header />
      <Navbar />
    <div className="locations-page">

      {/* ===== HERO ===== */}
      <section className="locations-hero">
        <img src={heroBanner} alt="Belkids Playground Location" className="locations-hero-img" />
        <div className="locations-hero-overlay">
          <motion.span
            className="locations-hero-tag"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Location
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Find Us in Accra
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Belkids Playground is growing! Our center is designed to bring families
            together in a safe, exciting, and imaginative environment.
          </motion.p>
        </div>
      </section>

      {/* ===== PAGE TITLE ===== */}
      <section className="locations-title">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Find a Belkids Near You</h2>
          <p>From the heart of Gbawe to families across Accra — we're here to play.</p>
        </motion.div>
      </section>

      {/* ===== LOCATION DETAIL ===== */}
      <section className="location-detail">
        <div className="location-detail-inner">

          {/* LEFT — INFO */}
          <motion.div
            className="location-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="location-badge">Current Location</span>
            <h3>Belkids Playground</h3>

            <p className="location-address">
              <FaMapMarkerAlt className="addr-icon" />
              <span>
                {ADDRESS}<br />
                <span className="location-city">Accra, Ghana</span>
              </span>
            </p>

            <div className="location-rating">
              <FaStar className="rating-star" />
              <strong>4.30</strong>
              <span className="rating-count">(98 reviews)</span>
            </div>

            <div className="location-features">
              <h4>What to Expect</h4>
              <ul>
                {features.map((f, i) => (
                  <li key={i}>
                    <FaHeart className="feature-heart" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="location-actions">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="location-btn location-btn-primary"
              >
                <FaDirections /> Get Directions
              </a>
              <a
                href="tel:+233244701007"
                className="location-btn location-btn-outline"
              >
                <FaPhoneAlt /> Call Us
              </a>
            </div>
          </motion.div>

          {/* RIGHT — MAP + HOURS */}
          <motion.div
            className="location-side"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="location-map">
              <iframe
                title="Belkids Playground on Google Maps"
                src={mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              ></iframe>
              <div className="location-map-pin">
                <FaMapMarkerAlt />
                <span>Belkids Playground</span>
              </div>
            </div>

            <div className="location-hours">
              <h4><FaClock /> Opening Hours</h4>
              <ul>
                {hours.map((h, i) => (
                  <li key={i}>
                    <span className="day">{h.day}</span>
                    <span className={h.closed ? "time closed" : "time"}>
                      {h.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ===== COMING SOON ===== */}
      <section className="locations-coming">
        <motion.div
          className="locations-coming-inner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="locations-coming-tag">Coming Soon!</span>
          <h2>New Locations on the Way</h2>
          <p>
            Belkids Playground is expanding! Stay tuned for announcements about
            our next magical locations across Ghana.
          </p>
        </motion.div>
      </section>

      {/* ===== COMMUNITY STRIP ===== */}
      <section className="locations-community">
        <div className="locations-community-inner">
          <div className="locations-community-text">
            <h3>Be Part of the Belkids Community</h3>
            <p>Stay updated on special events, new openings, and exclusive offers.</p>
          </div>
          <Link to="/signup" className="locations-community-btn">
            Register Now
          </Link>
        </div>
      </section>
                {/* Footer */}
      <Footer />
    </div>
    </>
  );
}

export default LocationPage;