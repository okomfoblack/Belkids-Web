// Pages/About.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import {
  FaHeart,
  FaShieldAlt,
  FaHandsWash,
  FaSmile,
  FaBookOpen,
  FaMusic,
  FaChild,
  FaSwimmingPool,
  FaGamepad,
  FaUtensils,
  FaLeaf,
  FaStar,
  FaUsers,
  FaAward,
  FaQuoteLeft,
  FaArrowRight
} from "react-icons/fa";
import "./Styles/AboutPage.css";

// 🖼️ IMAGES — swap with your own
import heroImg from "../assets/Belkids-Images/aboutbanner.jpeg";
import storyImg from "../assets/Belkids-Images/hoop.jpeg";
import founderImg from "../assets/Belkids-Images/simple2.jpeg";
import gallery1 from "../assets/Belkids-Images/image16.PNG";
import gallery2 from "../assets/Belkids-Images/image13.PNG";
import gallery3 from "../assets/Belkids-Images/image10.PNG";
import gallery4 from "../assets/Belkids-Images/simple.jpg";
import Footer from "../components/Footer";


function About() {
  const values = [
    { icon: FaShieldAlt, title: "Safety", text: "Supervised play zones and family-friendly facilities you can trust." },
    { icon: FaHandsWash, title: "Hygiene", text: "Immaculate facilities with strict cleaning protocols every day." },
    { icon: FaSmile, title: "Fun", text: "Bright, exciting activities designed for every age." },
    { icon: FaBookOpen, title: "Learning", text: "Play-based experiences that spark creativity and growth." },
    { icon: FaMusic, title: "Entertainment", text: "Magical parties and arts & crafts — always something to celebrate." }
  ];

  const milestones = [
    { year: "2021", title: "Founded", text: "Belkids Playground opens its doors in Gbawe, Accra." },
    { year: "2022", title: "Growing Fast", text: "We become a favorite spot for birthdays and school trips." },
    { year: "2023", title: "New Zones", text: "Added swimming pool, play house, and arts & crafts area." },
    { year: "2024", title: "Community", text: "Thousands of families have made memories with us." }
  ];

  const galleryImages = [gallery1, gallery2, gallery3, gallery4];

  return (
    <>
      <Header />
      <Navbar />
    <div className="about-page">

      {/* ===== HERO ===== */}
      <section className="about-hero">
        <img src={heroImg} alt="About Belkids Playground" className="about-hero-img" />
        <div className="about-hero-overlay">
          <motion.span
            className="about-hero-tag"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Where Magical <span>Memories</span> Are Made
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Belkids Playground is more than a place to play — it's where families
            come together, children grow, and every visit becomes a treasured memory.
          </motion.p>
        </div>
      </section>

      {/* ===== OUR STORY (SIDE BY SIDE) ===== */}
      <section className="about-story">
        <div className="about-story-inner">
          <motion.div
            className="about-story-image"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img src={storyImg} alt="Our story" />
          </motion.div>

          <motion.div
            className="about-story-text"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="section-tag">Our Story</span>
            <h2>A Dream Built for Families</h2>
            <p>
              Founded by MzBel in 2021, Belkids Playground began with one simple dream:
              to give the children of Accra a safe, joyful space to play freely and
              learn through fun.
            </p>
            <p>
              Today, we are proud to be a beloved destination for families across the
              city — offering swimming pools, play zones, a café, and unforgettable
              birthday celebrations.
            </p>
            <Link to="/contact" className="about-btn">
              Get In Touch <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== MISSION / VISION CARDS ===== */}
      <section className="about-mv">
        <div className="about-mv-inner">
          <motion.div
            className="about-mv-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="about-mv-icon"><FaHeart /></div>
            <h3>Our Mission</h3>
            <p>
              To create joyful, safe, and meaningful experiences for families — where
              play, learning, and celebration come together.
            </p>
          </motion.div>

          <motion.div
            className="about-mv-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="about-mv-icon"><FaStar /></div>
            <h3>Our Vision</h3>
            <p>
              To be the most loved playground in West Africa — where every child feels
              welcome and every parent feels at ease.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== OUR VALUES ===== */}
      <section className="about-values">
        <div className="about-values-inner">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="section-tag">What We Stand For</span>
            <h2>Our Promise to Families</h2>
            <p>Everything we do is built on these core values.</p>
          </motion.div>

          <div className="about-values-grid">
            {values.map((v, i) => (
              <motion.div
                key={i}
                className="about-value-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <div className="about-value-icon"><v.icon /></div>
                <h4>{v.title}</h4>
                <p>{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MILESTONES / TIMELINE ===== */}
      <section className="about-timeline">
        <div className="about-timeline-inner">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="section-tag">Our Journey</span>
            <h2>Milestones We're Proud Of</h2>
          </motion.div>

          <div className="timeline-track">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                className="timeline-item"
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <span className="timeline-year">{m.year}</span>
                  <h4>{m.title}</h4>
                  <p>{m.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section className="about-gallery">
        <div className="about-gallery-inner">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="section-tag">A Look Inside</span>
            <h2>Our Playground in Pictures</h2>
          </motion.div>

          <div className="about-gallery-grid">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                className="about-gallery-item"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
              >
                <img src={img} alt={`Belkids ${i + 1}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOUNDER QUOTE ===== */}
      <section className="about-quote">
        <div className="about-quote-inner">
          <motion.div
            className="about-quote-image"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <img src={founderImg} alt="Founder" />
          </motion.div>

          <motion.div
            className="about-quote-text"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            viewport={{ once: true }}
          >
            <FaQuoteLeft className="about-quote-mark" />
            <p>
            At Belkids Playground, we teach kids how to swim and help them feel safe and confident as they explore the water. Our caring instructors use fun, gentle methods to turn fear into smiles, splashes, and skills that last a lifetime.
            </p>
            <span className="about-quote-name">MzBel</span>
            <span className="about-quote-role">Founder, Belkids Playground</span>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="about-cta">
        <motion.div
          className="about-cta-inner"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2>Come Make Memories With Us</h2>
          <p>Join the thousands of families who've made Belkids their second home.</p>
          <Link to="/contact" className="about-cta-btn">
            Plan Your Visit <FaArrowRight />
          </Link>
        </motion.div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
    </>
  );
}

export default About;