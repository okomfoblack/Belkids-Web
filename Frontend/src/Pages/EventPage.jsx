// Events.jsx
import { motion } from "framer-motion";
import { 
  FaBirthdayCake, 
  FaSchool, 
  FaUsers, 
  FaCalendarAlt, 
  FaClock, 
  FaMapMarkerAlt, 
  FaPhoneAlt,
  FaArrowRight,
  FaStar,
  FaUtensils,
  FaSwimmingPool,
  FaGamepad,
  FaMusic,
  FaCamera,
  FaUserFriends,
  FaChalkboardTeacher
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../Pages/Styles/Event.css";

// Import your images
import birthdayImg from "../assets/Belkids-Images/image1.PNG";
import schoolImg from "../assets/Belkids-Images/image2.PNG";
import corporateImg from "../assets/Belkids-Images/image3.PNG";

function Events() {
  const events = [
    {
      id: 1,
      title: "Birthday Parties",
      icon: FaBirthdayCake,
      image: birthdayImg,
      description: "Create unforgettable memories with our all-inclusive birthday party packages. From decorations to entertainment, we handle everything!",
      features: [
        "Custom decorations",
        "Party host & entertainment",
        "Food & drinks included",
        "Party favors for guests",
        "2 hours of exclusive access"
      ],
      price: "From $250",
      duration: "2-3 hours",
      capacity: "Up to 30 guests",
      color: "#5D4037"
    },
    {
      id: 2,
      title: "School Bookings",
      icon: FaSchool,
      image: schoolImg,
      description: "Educational and fun field trips for schools. Our playground offers a safe, engaging environment for students to learn and play.",
      features: [
        "Educational activities",
        "Swim lessons available",
        "Team building games",
        "Lunch included",
        "Certified instructors"
      ],
      price: "From $15/student",
      duration: "3-4 hours",
      capacity: "Up to 100 students",
      color: "#2E7D32"
    },
    {
      id: 3,
      title: "Corporate Events",
      icon: FaUsers,
      image: corporateImg,
      description: "Team building, company parties, and corporate gatherings. Strengthen your team in a fun, relaxed environment.",
      features: [
        "Team building activities",
        "Catering services",
        "Meeting spaces",
        "Pool & games access",
        "Event coordination"
      ],
      price: "Custom quote",
      duration: "4-6 hours",
      capacity: "Up to 150 guests",
      color: "#5D4037"
    }
  ];

  const packages = [
    {
      title: "Silver Package",
      price: "$250",
      features: [
        "2 hours exclusive access",
        "Basic decorations",
        "Party host",
        "Snacks & drinks",
        "Digital invitations"
      ],
      recommended: false,
      color: "#8D6E63"
    },
    {
      title: "Gold Package",
      price: "$450",
      features: [
        "3 hours exclusive access",
        "Premium decorations",
        "Professional party host",
        "Full catering",
        "Custom cake included",
        "Photography service",
        "Party favors for all"
      ],
      recommended: true,
      color: "#2E7D32"
    },
    {
      title: "Platinum Package",
      price: "$650",
      features: [
        "4 hours exclusive access",
        "Luxury decorations",
        "2 professional hosts",
        "Gourmet catering",
        "Custom cake & desserts",
        "Professional photos",
        "Swim party add-on",
        "Goodie bags for all"
      ],
      recommended: false,
      color: "#5D4037"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Happy Mother",
      text: "My daughter's birthday was absolutely magical! The staff went above and beyond to make it special."
    },
    {
      name: "Mr. Thompson",
      role: "School Principal",
      text: "Our school field trip was a huge success. The kids loved every moment and learned so much!"
    },
    {
      name: "Emily Rodriguez",
      role: "Corporate Event Planner",
      text: "The team building event was exceptional. Everyone had a blast and the food was amazing!"
    }
  ];

  return (
    <div className="events-page">
      {/* ===== HERO SECTION ===== */}
      <section className="events-hero">
        <div className="events-hero-overlay"></div>
        <div className="events-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="events-hero-badge">Plan Your Event</span>
            <h1>Create <span className="highlight-text">Unforgettable</span> Moments</h1>
            <p>
              From birthday parties to corporate events, we provide the perfect venue 
              and services to make your special occasion truly memorable.
            </p>
            <div className="events-hero-buttons">
              <button className="btn-primary">
                <FaCalendarAlt className="btn-icon" />
                Book Now
              </button>
              <button className="btn-secondary">
                <FaPhoneAlt className="btn-icon" />
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== EVENT CARDS ===== */}
      <section className="events-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="section-tag">Our Events</span>
            <h2>Choose Your Perfect Event</h2>
            <p>We offer a variety of event packages tailored to your needs</p>
          </motion.div>

          <div className="events-grid">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                className="event-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="event-card-image">
                  <img src={event.image} alt={event.title} />
                  <div className="event-card-overlay">
                    <event.icon className="event-card-icon" style={{ color: event.color }} />
                    <span className="event-card-price">{event.price}</span>
                  </div>
                </div>
                <div className="event-card-content">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <div className="event-card-details">
                    <div className="event-detail">
                      <FaClock className="detail-icon" />
                      <span>{event.duration}</span>
                    </div>
                    <div className="event-detail">
                      <FaUsers className="detail-icon" />
                      <span>{event.capacity}</span>
                    </div>
                  </div>
                  <ul className="event-features">
                    {event.features.map((feature, i) => (
                      <li key={i}>
                        <FaStar className="feature-icon" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="event-card-btn">
                    Book This Event
                    <FaArrowRight className="btn-arrow" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PACKAGES SECTION ===== */}
      <section className="packages-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="section-tag">Packages</span>
            <h2>Choose Your Package</h2>
            <p>Select the perfect package for your event</p>
          </motion.div>

          <div className="packages-grid">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                className={`package-card ${pkg.recommended ? "recommended" : ""}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                {pkg.recommended && (
                  <div className="recommended-badge">⭐ Most Popular</div>
                )}
                <div className="package-header" style={{ background: pkg.color }}>
                  <h3>{pkg.title}</h3>
                  <div className="package-price">
                    <span className="price-amount">{pkg.price}</span>
                  </div>
                </div>
                <ul className="package-features">
                  {pkg.features.map((feature, i) => (
                    <li key={i}>
                      <FaStar className="package-feature-icon" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`package-btn ${pkg.recommended ? "btn-primary" : "btn-outline"}`}>
                  Choose Package
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="section-tag">Testimonials</span>
            <h2>What Our Clients Say</h2>
          </motion.div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="testimonial-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="testimonial-quote">"</div>
                <p>{testimonial.text}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    <span>{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="cta-section">
        <div className="cta-overlay"></div>
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Plan Your Event?</h2>
            <p>Contact us today to start planning your perfect event</p>
            <div className="cta-buttons">
              <button className="btn-primary">
                <FaCalendarAlt className="btn-icon" />
                Book Now
              </button>
              <button className="btn-secondary">
                <FaPhoneAlt className="btn-icon" />
                Call Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Events;