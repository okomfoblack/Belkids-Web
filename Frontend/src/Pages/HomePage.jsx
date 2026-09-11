// Pages/HomePage.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaHandsWash,
  FaSmile,
  FaBookOpen,
  FaMusic,
  FaChild,
  FaGamepad,
  FaSwimmingPool,
  FaHome,
  FaPaintBrush,
  FaUtensilSpoon,
  FaMapMarkerAlt,
  FaClock,
  FaHeart,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaTiktok,
  FaYoutube
} from "react-icons/fa";
import "./Styles/HomePage.css";
import heroImg from "../assets/Belkids-Images/banner3.jpeg";
import celebrateImg from "../assets/Belkids-Images/next.jpeg";

function HomePage() {
  const promises = [
    { icon: FaShieldAlt, title: "Safety", text: "Secure supervised play zones and family-friendly facilities." },
    { icon: FaHandsWash, title: "Hygiene", text: "Immaculate facilities with strict cleaning protocols." },
    { icon: FaSmile, title: "Fun", text: "Bright, exciting activities for every age." },
    { icon: FaBookOpen, title: "Learning", text: "Play-based experiences that encourage creativity." },
    { icon: FaMusic, title: "Entertainment", text: "Magical parties, arts and crafts, always something to celebrate." }
  ];

  const zones = [
    { icon: FaChild, title: "Toddler Zone", text: "Specially designed for our youngest explorers." },
    { icon: FaGamepad, title: "Soft Play Zone", text: "Play, Climb, Slide and Have Fun." },
    { icon: FaSwimmingPool, title: "Swimming Pool", text: "Splash, Swim, and Cool Off." },
    { icon: FaHome, title: "The Play House", text: "A magical role-play adventure." },
    { icon: FaPaintBrush, title: "Arts & Crafts", text: "A creative space for imagination." },
    { icon: FaUtensilSpoon, title: "BK Café", text: "Relax with coffee, snacks, and free Wi-Fi." }
  ];

  return (
    <div className="home-page">

      {/* ===== HERO BANNER ===== */}
      <section className="hero">
        <img src={heroImg} alt="Welcome to Belkids Playground" className="hero-img" />
        <div className="hero-overlay">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to Belkids Playground
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Designed for children to have fun and make memories.
          </motion.p>
        </div>
      </section>

      {/* ===== PROMISE + ZONES (SIDE BY SIDE) ===== */}
      <section className="two-col">
        <motion.div
          className="col-card"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>Our Promise:</h2>
          <p className="col-intro">
            At Belkids Playground, we believe in creating experiences that families will treasure forever.
            Everything we do is built on these pillars:
          </p>
          <ul className="pillar-list">
            {promises.map((p, i) => (
              <li key={i}>
                <span className="pillar-icon"><p.icon /></span>
                <span className="pillar-text">
                  <strong>{p.title}:</strong> {p.text}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="col-card"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>Discover our Play Zones:</h2>
          <p className="col-intro">
            From toddlers to ten-year-olds, there's something for every child:
          </p>
          <ul className="pillar-list">
            {zones.map((z, i) => (
              <li key={i}>
                <span className="pillar-icon"><z.icon /></span>
                <span className="pillar-text">
                  <strong>{z.title}:</strong> {z.text}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* ===== STORY ===== */}
      <section className="story">
        <div className="story-inner">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Step into the Belkids World
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Once upon a time, a family dreamed of a place where children could play freely,
            learn joyfully, and make memories that last forever… that dream became Belkids Playground.
            Home to Bella the Bear, Kiki the Kid, and their silly friend Mr. Mango, these lovable
            characters bring the Belkids story to life, and they can't wait to welcome your family.
          </motion.p>
          <Link to="/memories" className="story-btn">Meet the Belkids Family</Link>
        </div>
      </section>

      {/* ===== CELEBRATE ===== */}
<section className="celebrate">
  <div className="celebrate-container">

    {/* LEFT: TEXT */}
    <motion.div
      className="celebrate-text"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="celebrate-title">
        <span className="letter">C</span>
        <span className="letter">e</span>
        <span className="letter">l</span>
        <span className="letter">e</span>
        <span className="letter">b</span>
        <span className="letter">r</span>
        <span className="letter">a</span>
        <span className="letter">t</span>
        <span className="letter">e</span>
        <span className="space">&nbsp;</span>
        <span className="letter">w</span>
        <span className="letter">i</span>
        <span className="letter">t</span>
        <span className="letter">h</span>
        <span className="space">&nbsp;</span>
        <span className="letter">U</span>
        <span className="letter">s</span>
      </h2>
<p className="celebrate-paragraph">
  <span className="word">Founded</span>
  <span className="word">by</span>
  <span className="word highlight">MzBel</span>
  <span className="word">in</span>
  <span className="word">Gbawe,</span>
  <span className="word">Belkids</span>
  <span className="word">Playground</span>
  <span className="word">has</span>
  <span className="word">become</span>
  <span className="word">a</span>
  <span className="word highlight">beloved</span>
  <span className="word">destination</span>
  <span className="word">for</span>
  <span className="word">families</span>
  <span className="word">across</span>
  <span className="word">Accra.</span>
  <span className="word">With</span>
  <span className="word">affordable</span>
  <span className="word">entry</span>
  <span className="word">and</span>
  <span className="word">a</span>
  <span className="word">warm,</span>
  <span className="word">welcoming</span>
  <span className="word">atmosphere,</span>
  <span className="word">it's</span>
  <span className="word">a</span>
  <span className="word">place</span>
  <span className="word">where</span>
  <span className="word">kids</span>
  <span className="word">play</span>
  <span className="word">freely</span>
  <span className="word">while</span>
  <span className="word">parents</span>
  <span className="word">relax</span>
  <span className="word">and</span>
  <span className="word">connect.</span>
</p>
      <Link to="/parties" className="celebrate-btn">Book a Party</Link>
    </motion.div>

    {/* RIGHT: IMAGE */}
    <motion.div
      className="celebrate-image-wrap"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <img
        src={celebrateImg}
        alt="Celebrate at Belkids Playground"
        className="celebrate-img"
      />
    </motion.div>

  </div>
</section>
      {/* ===== PLAN YOUR VISIT ===== */}
      <section className="visit">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Plan Your Visit
        </motion.h2>

        <div className="visit-grid">
          <motion.div className="visit-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0, duration: 0.6 }} viewport={{ once: true }}>
            <div className="visit-icon"><FaMapMarkerAlt /></div>
            <h3>Location</h3>
            <p>HPH3+RQM, Lane 1, Gbawe<br />Accra, Ghana</p>
          </motion.div>

          <motion.div className="visit-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }} viewport={{ once: true }}>
            <div className="visit-icon"><FaClock /></div>
            <h3>Opening Hours</h3>
            <p>Wed – Sun<br />10:00 am – 7:00 pm</p>
          </motion.div>

          <motion.div className="visit-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} viewport={{ once: true }}>
            <div className="visit-icon"><FaHeart /></div>
            <h3>Coming Soon</h3>
            <p>New locations<br />Stay tuned!</p>
          </motion.div>
        </div>

        <div className="visit-cta">
          <Link to="/locations" className="visit-btn">Get Directions</Link>
        </div>
      </section>

      {/* ===== NEWSLETTER STRIP ===== */}
      <section className="newsletter">
        <Link to="/signup" className="newsletter-btn">Register Now</Link>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <h3>Belkids Playground</h3>
            <p>Where magical memories are made.</p>
          </div>

          <div className="footer-links">
            <h4>About Us</h4>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/parties">Parties</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/contact">Contact us</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Belkids Playground. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;