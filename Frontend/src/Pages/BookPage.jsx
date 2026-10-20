import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaBirthdayCake,
  FaCheck,
  FaTimes,
  FaCrown,
  FaUsers,
  FaPhoneAlt,
  FaWhatsapp,
  FaStar,
  FaHeart,
  FaSmile,
  FaInfoCircle,
  FaChevronDown,
  FaMusic,
  FaUtensils,
  FaCamera,
  FaUserTie
} from "react-icons/fa";
import "./Styles/BookPage.css";

function BookPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const fullPackage = {
    id: "full",
    name: "Full Birthday Package",
    price: "GH₵10,000",
    priceNote: "private booking",
    includes: [
      "Exclusive private booking of the whole venue (except customers that pay entre fee)",
      "Unlimited playground access for all guests",
      "Bring and set up your own decorations",
      "Bring your own food and drinks (no alcohol)",
      "Bring your own birthday cake",
      "Bring your own DJ or music",
      "Dedicated event coordinator",
    ],
    notIncluded: [
      "No alcohol allowed — strictly enforced"
    ]
  };

  const features = [
    { icon: FaBirthdayCake, text: "Exclusive private venue booking (except customers that pay entre fee)" },
    { icon: FaUsers, text: "Unlimited playground access for all guests" },
    { icon: FaHeart, text: "Bring your own decorations & cake" },
    { icon: FaUtensils, text: "Bring your own food & drinks (no alcohol)" },
    { icon: FaMusic, text: "Bring your own DJ / music" },
    { icon: FaUserTie, text: "Bring your own pastels" },
    { icon: FaCamera, text: "Photography & videography allowed" },
  ];

  const faqs = [
    {
      q: "What does the Full Birthday Package include?",
      a: "The Full Birthday Package gives you exclusive private use of the entire venue, unlimited playground access for all guests, freedom to bring your own decorations, food, drinks (no alcohol), cake, and DJ, plus a dedicated event coordinator."
    },
    {
      q: "Can I bring my own food and drinks?",
      a: "Yes! With the Full Birthday Package you can bring your own food and drinks — but alcohol is strictly not allowed."
    },
    {
      q: "Is alcohol allowed?",
      a: "No. Alcohol is strictly not allowed — no exceptions."
    },
    {
      q: "How far in advance should I book?",
      a: "We recommend booking at least 2 weeks in advance to secure your preferred date."
    },
    {
      q: "How many guests can I invite?",
      a: "The Full Birthday Package gives you unlimited playground access for all your guests — invite as many as you like!"
    }
  ];

  return (
    <div className="book-page">

      {/* HERO */}
      <section className="book-hero">
        <div className="book-hero-overlay"></div>
        <motion.div
          className="book-hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="book-hero-tag"><FaBirthdayCake /> Book Your Birthday</span>
          <h1>Let's Make It <span>Unforgettable</span></h1>
          <p>One premium package. One unforgettable day.</p>
          <div className="book-hero-badges">
            <span className="book-hero-badge"><FaStar /> Family-Friendly</span>
            <span className="book-hero-badge"><FaHeart /> Safe & Supervised</span>
            <span className="book-hero-badge"><FaSmile /> Unlimited Fun</span>
          </div>
        </motion.div>
      </section>

      {/* PACKAGE — Rectangular centered card */}
      <section className="book-packages">
        <div className="book-packages-inner">
          <div className="book-section-header">
            <span className="book-section-tag">Our Package</span>
            <h2>The Full Birthday Experience</h2>
            <p>Everything you need for an unforgettable celebration — the whole venue, all yours.</p>
          </div>

          <div className="packages-grid-single">
            <motion.div
              className="package-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="package-ribbon"><FaCrown /> Premium</div>

              <div className="package-body">
                <h3 className="package-name">{fullPackage.name}</h3>

                <div className="package-price">
                  <span className="package-price-amount">{fullPackage.price}</span>
                  <span className="package-price-note">{fullPackage.priceNote}</span>
                </div>

                <div className="package-includes">
                  <h4>Included:</h4>
                  <ul>
                    {fullPackage.includes.map((item, i) => (
                      <li key={i}>
                        <FaCheck className="include-icon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="package-not-included">
                  <h4>Not Included:</h4>
                  <ul>
                    {fullPackage.notIncluded.map((item, i) => (
                      <li key={i}>
                        <FaTimes className="exclude-icon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ===== CONTACT TO BOOK ===== */}
                <a href="tel:+233244701007" className="package-btn package-btn-primary">
                  <FaPhoneAlt /> Call to Book This Package
                </a>
              </div>
            </motion.div>
          </div>

          {/* Contact alternative */}
          <div className="payment-contact-alt">
            <p>Ready to book? Reach out to us directly:</p>
            <div className="payment-contact-buttons">
              <a href="tel:+233244701007" className="payment-contact-btn">
                <FaPhoneAlt /> Call: +233 244 701 007
              </a>
              <a
                href="https://wa.me/233244701007"
                target="_blank"
                rel="noreferrer"
                className="payment-contact-btn payment-contact-wa"
              >
                <FaWhatsapp /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="book-comparison">
        <div className="book-comparison-inner">
          <div className="book-section-header">
            <span className="book-section-tag">Everything You Get</span>
            <h2>What's Included</h2>
          </div>

          <div className="feature-grid">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="feature-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="feature-icon">
                  <feature.icon />
                </div>
                <span>{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RULES */}
      <section className="book-rules">
        <div className="book-rules-inner">
          <div className="book-section-header">
            <span className="book-section-tag"><FaInfoCircle /> Rules</span>
            <h2>House Rules</h2>
          </div>

          <div className="rules-grid">
            <div className="rule-card rule-allowed">
              <h3><FaCheck /> Allowed</h3>
              <ul>
                <li>Birthday cake</li>
                <li>Own decorations</li>
                <li>Own food & drinks — no alcohol</li>
                <li>Own DJ / music</li>
                <li>Camera & photography</li>
                <li>Swimwear</li>
              </ul>
            </div>

            <div className="rule-card rule-not-allowed">
              <h3><FaTimes /> Not Allowed</h3>
              <ul>
                <li>Alcohol — strictly prohibited</li>
                <li>Smoking</li>
                <li>Pets (except service animals)</li>
                <li>Glass in play areas</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="book-faq">
        <div className="book-faq-inner">
          <div className="book-section-header">
            <span className="book-section-tag">FAQ</span>
            <h2>Common Questions</h2>
          </div>

          <div className="book-faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className={`book-faq-item ${openFaq === i ? "open" : ""}`}>
                <button
                  className="book-faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <FaChevronDown className="book-faq-arrow" />
                </button>
                <div className="book-faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="book-cta">
        <div className="book-cta-inner">
          <h2>Ready to Give Your Child the Best Birthday?</h2>
          <div className="book-cta-buttons">
            <a href="tel:+233244701007" className="book-cta-btn book-cta-primary">
              <FaPhoneAlt /> Call Now
            </a>
            <a
              href="https://wa.me/233244701007"
              target="_blank"
              rel="noreferrer"
              className="book-cta-btn book-cta-outline"
            >
              <FaWhatsapp /> WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

export default BookPage;