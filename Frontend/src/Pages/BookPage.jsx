// Pages/BookPage.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
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
  FaUserTie,
  FaCreditCard,
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaChild,
  FaTicketAlt,
  FaMapMarkerAlt
} from "react-icons/fa";
import "./Styles/BookPage.css";
import Footer from "../components/Footer";
import api from "../utils/api";
import { toast } from "react-toastify";

const isValidPhone = (raw) => {
  if (!raw) return false;
  const cleaned = raw.replace(/[\s\-()]/g, "");
  if (!/^\+?\d{7,15}$/.test(cleaned)) return false;
  const digits = cleaned.replace(/^\+/, "");
  if (/^(\d)\1+$/.test(digits)) return false;
  if (/^0?1234567/.test(digits)) return false;
  return true;
};

const parseLocalDate = (yyyyMmDd) => {
  if (!yyyyMmDd) return null;
  const [y, m, d] = yyyyMmDd.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
};

const isClosedDay = (yyyyMmDd) => {
  const d = parseLocalDate(yyyyMmDd);
  if (!d) return false;
  const day = d.getDay();
  return day === 1 || day === 2;
};

const todayISO = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

function BookPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    eventDate: "",
    kidsCount: 1,
    rulesAccepted: false
  });

  const fullPackage = {
    id: "full",
    name: "Full Birthday Package",
    price: "GH₵10,000",
    amount: 10000,
    priceNote: "private booking",
    includes: [
      "Exclusive private booking of the whole venue (except customers that pay entre fee)",
      "Unlimited playground access for all guests",
      "Bring and set up your own decorations",
      "Bring your own food and drinks (no alcohol)",
      "Bring your own birthday cake",
      "Bring your own DJ or music",
      "Dedicated event coordinator"
    ],
    notIncluded: ["No alcohol allowed — strictly enforced"]
  };

  const features = [
    { icon: FaBirthdayCake, text: "Exclusive private venue booking (except customers that pay entre fee)" },
    { icon: FaUsers, text: "Unlimited playground access for all guests" },
    { icon: FaHeart, text: "Bring your own decorations & cake" },
    { icon: FaUtensils, text: "Bring your own food & drinks (no alcohol)" },
    { icon: FaMusic, text: "Bring your own DJ / music" },
    { icon: FaUserTie, text: "Bring your own pastels" },
    { icon: FaCamera, text: "Photography & videography allowed" }
  ];

  const faqs = [
    { q: "What does the Full Birthday Package include?", a: "The Full Birthday Package gives you exclusive private use of the entire venue, unlimited playground access for all guests, freedom to bring your own decorations, food, drinks (no alcohol), cake, and DJ, plus a dedicated event coordinator." },
    { q: "Can I bring my own food and drinks?", a: "Yes! With the Full Birthday Package you can bring your own food and drinks — but alcohol is strictly not allowed." },
    { q: "Is alcohol allowed?", a: "No. Alcohol is strictly not allowed — no exceptions." },
    { q: "How far in advance should I book?", a: "We recommend booking at least 2 weeks in advance to secure your preferred date." },
    { q: "How many guests can I invite?", a: "The Full Birthday Package gives you unlimited playground access for all your guests — invite as many as you like!" }
  ];

  const getCurrentUser = () => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) return JSON.parse(raw);
      const email = localStorage.getItem("email");
      const token = localStorage.getItem("token");
      if (email || token) return { email };
      return null;
    } catch {
      return null;
    }
  };

  const handleBookClick = () => {
    const u = getCurrentUser();
    if (!u?.email) {
      setError("Please log in first — we need your account to book.");
      return;
    }
    setError("");
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.fullName.trim())
      return toast.error("Please enter your full name");
    if (!isValidPhone(form.phone))
      return toast.error("Please enter a valid phone number");
    if (!form.eventDate) return toast.error("Please choose an event date");
    if (isClosedDay(form.eventDate))
      return toast.error("We are closed on Mondays and Tuesdays");
    if (!form.kidsCount || Number(form.kidsCount) < 1)
      return toast.error("Please enter the number of kids attending");
    if (!form.rulesAccepted)
      return toast.error("Please accept the house rules to continue");

    setSubmitting(true);
    try {
      const bookingRes = await api.createBooking({
        packageName: fullPackage.name,
        amount: fullPackage.amount,
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        eventDate: form.eventDate,
        kidsCount: Number(form.kidsCount)
      });

      const bookingId = bookingRes.data?._id;

      const pay = await api.initializePayment({
        email: form.email || getCurrentUser()?.email,
        amount: fullPackage.amount,
        packageName: fullPackage.name,
        bookingId
      });

      window.location.href = pay.authorization_url;
    } catch (err) {
      console.error("Booking flow error:", err);
      toast.error(err.message || "Something went wrong");
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <Navbar />
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
            <span className="book-hero-tag">
              <FaBirthdayCake /> Book Your Birthday
            </span>
            <h1>
              Let's Make It <span>Unforgettable</span>
            </h1>
            <p>One premium package. One unforgettable day.</p>
            <div className="book-hero-badges">
              <span className="book-hero-badge">
                <FaStar /> Family-Friendly
              </span>
              <span className="book-hero-badge">
                <FaHeart /> Safe & Supervised
              </span>
              <span className="book-hero-badge">
                <FaSmile /> Unlimited Fun
              </span>
            </div>
          </motion.div>
        </section>

        {/* PACKAGE */}
        <section className="book-packages">
          <div className="book-packages-inner">
            <div className="book-section-header">
              <span className="book-section-tag">Our Package</span>
              <h2>The Full Birthday Experience</h2>
              <p>
                Everything you need for an unforgettable celebration — the whole
                venue, all yours.
              </p>
            </div>

            <div className="packages-grid-single">
              <motion.div
                className="package-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <div className="package-ribbon">
                  <FaCrown /> Premium
                </div>

                <div className="package-body">
                  <h3 className="package-name">{fullPackage.name}</h3>

                  <div className="package-price">
                    <span className="package-price-amount">
                      {fullPackage.price}
                    </span>
                    <span className="package-price-note">
                      {fullPackage.priceNote}
                    </span>
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

                  <div className="package-payment">
                    {error && <p className="package-payment-error">{error}</p>}

                    {!showForm ? (
                      <button
                        type="button"
                        onClick={handleBookClick}
                        className="package-btn package-btn-primary package-btn-pay"
                      >
                        <FaCreditCard /> Book Now — Fill Your Details
                      </button>
                    ) : (
                      <motion.form
                        className="booking-form"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="booking-form-header">
                          <h4>Complete Your Booking</h4>
                          <button
                            type="button"
                            className="booking-form-close"
                            onClick={() => setShowForm(false)}
                          >
                            <FaTimes />
                          </button>
                        </div>

                        <div className="booking-form-grid">
                          <div className="input-group">
                            <FaUser className="input-icon" />
                            <input
                              type="text"
                              name="fullName"
                              placeholder="Full Name"
                              value={form.fullName}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="input-group">
                            <FaPhoneAlt className="input-icon" />
                            <input
                              type="tel"
                              name="phone"
                              placeholder="Phone Number"
                              value={form.phone}
                              onChange={handleChange}
                              inputMode="tel"
                            />
                          </div>

                          <div className="input-group">
                            <FaEnvelope className="input-icon" />
                            <input
                              type="email"
                              name="email"
                              placeholder="Email"
                              value={form.email}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="input-group">
                            <FaCalendarAlt className="input-icon" />
                            <input
                              type="date"
                              name="eventDate"
                              min={todayISO()}
                              value={form.eventDate}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="input-group">
                            <FaChild className="input-icon" />
                            <input
                              type="number"
                              name="kidsCount"
                              placeholder="Number of kids"
                              min={1}
                              value={form.kidsCount}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <p className="booking-day-note">
                          <FaInfoCircle /> We're closed on{" "}
                          <strong>Mondays &amp; Tuesdays</strong> — please book
                          Wednesday to Sunday.
                        </p>

                        {form.eventDate && isClosedDay(form.eventDate) && (
                          <p className="booking-msg booking-msg-error">
                            That day is not available. Please pick Wednesday to
                            Sunday.
                          </p>
                        )}

                        <label className="booking-rules">
                          <input
                            type="checkbox"
                            name="rulesAccepted"
                            checked={form.rulesAccepted}
                            onChange={handleChange}
                          />
                          <span>
                            I have read and accept the house rules (no alcohol,
                            etc.)
                          </span>
                        </label>

                        <button
                          type="submit"
                          className="package-btn package-btn-primary"
                          disabled={
                            submitting ||
                            (form.eventDate && isClosedDay(form.eventDate))
                          }
                        >
                          <FaCreditCard />
                          {submitting
                            ? "Redirecting to Paystack…"
                            : `Pay GH₵${fullPackage.amount.toLocaleString()}`}
                        </button>
                      </motion.form>
                    )}
                  </div>

                  <a
                    href="tel:+233244701007"
                    className="package-btn package-btn-outline"
                  >
                    <FaPhoneAlt /> Or Call to Book
                  </a>
                </div>
              </motion.div>
            </div>

            <div className="payment-contact-alt">
              <p>Prefer to talk first? Reach out to us directly:</p>
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
              <span className="book-section-tag">
                <FaInfoCircle /> Rules
              </span>
              <h2>House Rules</h2>
            </div>

            <div className="rules-grid">
              <div className="rule-card rule-allowed">
                <h3>
                  <FaCheck /> Allowed
                </h3>
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
                <h3>
                  <FaTimes /> Not Allowed
                </h3>
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
                <div
                  key={i}
                  className={`book-faq-item ${openFaq === i ? "open" : ""}`}
                >
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

        {/* ===== NEW DAILY WALK-IN SECTION ===== */}
        <section className="book-daily-walkin">
          <div className="book-daily-walkin-inner">
            <motion.div 
              className="daily-walkin-card"
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.7 }} 
              viewport={{ once: true }}
            >
              <div className="daily-walkin-icon">
                <FaTicketAlt />
              </div>
              <div className="daily-walkin-content">
                <span className="daily-walkin-tag">No Booking Needed</span>
                <h2>Just Coming to Play?</h2>
                <p>
                  You don't need to book online if you just want to bring your kids for a fun day out. 
                  Simply walk in and pay at the gate. Note : we also have a restursant where we sell food at afordable price and we also have a snack bar where we sell soft drinks popcorn, cotton candy etc.
                </p>
                <div className="daily-walkin-price-row">
                  <span className="daily-walkin-amount">GH₵100</span>
                  <span className="daily-walkin-per">per child / all day</span>
                </div>
                <p className="daily-walkin-note">
                  <FaMapMarkerAlt /> Paid in person at the playground. Online booking is only for private birthday parties.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="book-cta">
          <div className="book-cta-inner">
            <h2>Ready to Give Your Child the Best Birthday?</h2>
            <div className="book-cta-buttons">
              <a
                href="tel:+233244701007"
                className="book-cta-btn book-cta-primary"
              >
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

        <Footer />
      </div>
    </>
  );
}

export default BookPage;