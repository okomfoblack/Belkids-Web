// Pages/ContactPage.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaDirections,
  FaBirthdayCake,
  FaSchool,
  FaUsers,
  FaChevronDown,
  FaHeart
} from "react-icons/fa";
import "./Styles/ContactPage.css";
import Footer from "../components/Footer";
function ContactPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const contactCards = [
    {
      icon: FaMapMarkerAlt,
      title: "Visit Us",
      lines: ["HPH3+RQM, Lane 1, Gbawe", "Accra, Ghana"],
      action: {
        label: "Get Directions",
        href: "https://www.google.com/maps/search/?api=1&query=Belkids+Playground+Gbawe+Ghana",
        external: true
      }
    },
    {
      icon: FaPhoneAlt,
      title: "Call Us",
      lines: ["+233 244 701 007", "Wed – Sun, 9AM – 6PM"],
      action: { label: "Call Now", href: "tel:+233244701007" }
    },
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      lines: ["+233 244 701 007", "Chat with us anytime"],
      action: { label: "Start Chat", href: "https://wa.me/233244701007", external: true }
    }
  ];

  const hours = [
    { day: "Monday", time: "Closed", closed: true },
    { day: "Tuesday", time: "Closed", closed: true },
    { day: "Wednesday", time: "9:00 AM – 6:00 PM" },
    { day: "Thursday", time: "9:00 AM – 6:00 PM" },
    { day: "Friday", time: "9:00 AM – 6:00 PM" },
    { day: "Saturday", time: "9:00 AM – 6:00 PM" },
    { day: "Sunday", time: "9:00 AM – 6:00 PM" }
  ];

  const inquiryTypes = [
    {
      icon: FaBirthdayCake,
      title: "Birthday Parties",
      text: "Plan a magical celebration with custom packages."
    },
    {
      icon: FaSchool,
      title: "School Trips",
      text: "Field trips and educational play for groups."
    },
    {
      icon: FaUsers,
      title: "Group Bookings",
      text: "Corporate events, team outings, and private hires."
    },
    {
      icon: FaHeart,
      title: "General Inquiry",
      text: "Questions about visits, pricing, or anything else."
    }
  ];

  const faqs = [
    {
      q: "What are your opening hours?",
      a: "We're open Wednesday to Sunday from 9:00 AM to 6:00 PM. We're closed on Mondays and Tuesdays."
    },
    {
      q: "How much is entry?",
      a: "Entry is GH₵100 per child. Adults enter free."
    },
    {
      q: "Can I book the venue for a private event?",
      a: "Absolutely! We host birthday parties, school trips, corporate outings, and private hires. Call us on +233 244 701 007 for a custom quote."
    },
    {
      q: "Is there food available?",
      a: "Yes — we offer a variety of food and snacks on-site. You place your order when you arrive at the playground."
    },
    {
      q: "Do you have parking?",
      a: "Yes, there's ample parking on-site at our Gbawe location."
    },
    {
      q: "Are the facilities safe for younger children?",
      a: "Safety is our top priority. All play zones are supervised, and we maintain strict hygiene and safety protocols."
    }
  ];

  return (
    <>
      <Header />
      <Navbar />
      <div className="contact-page">

      {/* ===== HERO ===== */}
      <section className="contact-hero">
        <div className="contact-hero-overlay"></div>
        <motion.div
          className="contact-hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="contact-hero-tag">Get in Touch</span>
          <h1>We'd Love to <span>Hear From You</span></h1>
          <p>
            Whether you're planning a party, booking a school trip, or just want
            to say hello — our team is here to help.
          </p>
        </motion.div>
      </section>

      {/* ===== CONTACT CARDS ===== */}
      <section className="contact-cards-section">
        <div className="contact-cards-inner">
          {contactCards.map((card, i) => (
            <motion.div
              key={i}
              className="contact-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <div className="contact-card-icon">
                <card.icon />
              </div>
              <h3>{card.title}</h3>
              {card.lines.map((line, j) => (
                <p key={j} className="contact-card-line">{line}</p>
              ))}
              <a
                href={card.action.href}
                target={card.action.external ? "_blank" : undefined}
                rel={card.action.external ? "noreferrer" : undefined}
                className="contact-card-btn"
              >
                {card.action.label} →
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== MAIN CONTACT INFO ===== */}
      <section className="contact-main">
        <div className="contact-main-inner">

          {/* LEFT — HOW WE HELP */}
          <motion.div
            className="contact-info-block"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="contact-section-tag">How Can We Help?</span>
            <h2>Let's Plan Something Special</h2>
            <p className="contact-intro">
              From birthday parties to school trips, we help families across Accra
              create unforgettable memories. Give us a call or send a WhatsApp
              message — we're always happy to chat.
            </p>

            <div className="contact-inquiry-grid">
              {inquiryTypes.map((type, i) => (
                <div key={i} className="contact-inquiry-item">
                  <div className="contact-inquiry-icon">
                    <type.icon />
                  </div>
                  <div>
                    <h4>{type.title}</h4>
                    <p>{type.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — HOURS + QUICK CONTACT */}
          <motion.div
            className="contact-side-block"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="contact-hours-block">
              <h3><FaClock /> Opening Hours</h3>
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

            <div className="contact-quick-block">
              <h3>Quick Contact</h3>
              <p>Reach us instantly through either channel below.</p>

              <a href="tel:+233244701007" className="contact-quick-btn contact-quick-primary">
                <FaPhoneAlt /> Call +233 244 701 007
              </a>

              <a
                href="https://wa.me/233244701007"
                target="_blank"
                rel="noreferrer"
                className="contact-quick-btn contact-quick-outline"
              >
                <FaWhatsapp /> Chat on WhatsApp
              </a>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ===== MAP SECTION ===== */}
      <section className="contact-map-section">
        <div className="contact-map-inner">
          <motion.div
            className="contact-map-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="contact-section-tag">Find Us</span>
            <h2>Visit Our Playground</h2>
            <p>
              We're located in the heart of Gbawe, Accra — easily accessible
              with ample parking for families.
            </p>

            <div className="contact-map-address">
              <FaMapMarkerAlt />
              <div>
                <strong>Belkids Playground</strong>
                <span>HPH3+RQM, Lane 1, Gbawe</span>
                <span>Accra, Ghana</span>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Belkids+Playground+Gbawe+Ghana"
              target="_blank"
              rel="noreferrer"
              className="contact-map-btn"
            >
              <FaDirections /> Get Directions
            </a>
          </motion.div>

          <motion.div
            className="contact-map-embed"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <iframe
              title="Belkids Playground Location"
              src="https://www.google.com/maps?q=Belkids+Playground+Gbawe+Ghana&z=16&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="contact-faq">
        <div className="contact-faq-inner">
          <motion.div
            className="contact-faq-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="contact-section-tag">Common Questions</span>
            <h2>Frequently Asked Questions</h2>
            <p>Quick answers to the questions we hear most often.</p>
          </motion.div>

          <div className="contact-faq-list">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className={`contact-faq-item ${openFaq === i ? "open" : ""}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <button
                  className="contact-faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <FaChevronDown className="contact-faq-arrow" />
                </button>
                <div className="contact-faq-answer">
                  <p>{faq.a}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOCIAL STRIP ===== */}
      <section className="contact-socials">
        <div className="contact-socials-inner">
          <h3>Follow Us on Social Media</h3>
          <p>Get daily updates, photos, and special offers.</p>
          <div className="contact-socials-icons">
            <a
              href="https://www.facebook.com/share/19Ma3XGNEW/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/belkids_playground/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@belkidsplayground"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
            >
              <FaTiktok />
            </a>
            <a
              href="https://wa.me/233244701007"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="contact-cta">
        <motion.div
          className="contact-cta-inner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Make Memories?</h2>
          <p>Book your visit or event today and let's start planning.</p>
          <div className="contact-cta-buttons">
            <a href="tel:+233244701007" className="contact-cta-btn contact-cta-primary">
              <FaPhoneAlt /> Call Now
            </a>
            <Link to="/parties" className="contact-cta-btn contact-cta-outline">
              <FaBirthdayCake /> Book a Party
            </Link>
          </div>
        </motion.div>
      </section>
{/* footer */}
      <Footer />
    </div>
    </>
  );
}

export default ContactPage;