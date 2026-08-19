// LandingPage.jsx
import { motion } from "framer-motion";
import { 
  FaBirthdayCake, 
  FaSwimmingPool, 
  FaGamepad, 
  FaUtensils,
  FaCalendarCheck,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaStar,
  FaUsers,
  FaSmile,
  FaAward,
  FaArrowRight,
  FaPlay
} from "react-icons/fa";
import { useState } from "react";
import "../Styles/LandingPage.css";

// 🖼️ IMPORT IMAGES
import heroBg from "../assets/Belkids-Images/image16.PNG"; // Assuming this is the hero background image
import birthdayPartyImg from "../assets/Belkids-Images/image17.PNG"; // Assuming this is the birthday party image
import swimmingPoolImg from "../assets/Belkids-Images/image10.PNG";
import gamesAreaImg from "../assets/Belkids-Images/image11.PNG";
import restaurantImg from "../assets/Belkids-Images/image15.PNG";
import gallery1 from "../assets/Belkids-Images/image16.PNG";
import gallery2 from "../assets/Belkids-Images/image13.PNG";
import gallery3 from "../assets/Belkids-Images/image2.PNG";
import gallery4 from "../assets/Belkids-Images/image1.PNG";
import gallery5 from "../assets/Belkids-Images/image3.PNG";
import gallery6 from "../assets/Belkids-Images/image9.PNG";
import aboutImg from "../assets/Belkids-Images/image4.PNG";
import ctaBg from "../assets/Belkids-Images/image5.PNG";


function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Features data (unchanged)
  const features = [
    { 
      icon: FaBirthdayCake, 
      title: "Birthday Parties", 
      description: "Create unforgettable memories with our all-inclusive party packages",
      color: "#5D4037",
      image: birthdayPartyImg
    },
    { 
      icon: FaSwimmingPool, 
      title: "Swimming Pools", 
      description: "Two sparkling pools with equipment rentals and swim lessons",
      color: "#2E7D32",
      image: swimmingPoolImg
    },
    { 
      icon: FaGamepad, 
      title: "Games & Fun", 
      description: "Foosball, pool table, football, basketball & more",
      color: "#5D4037",
      image: gamesAreaImg
    },
    { 
      icon: FaUtensils, 
      title: "Restaurant & Snacks", 
      description: "Delicious meals, fresh snacks, and tasty treats",
      color: "#2E7D32",
      image: restaurantImg
    }
  ];

  // Updated Gallery Items: 6 Images + 3 Videos (spread)
  const galleryItems = [
    { id: 1, label: "Birthday Party", type: "image", src: gallery1 },
    { id: 2, label: "Swimming Pool", type: "image", src: gallery2 },
    { id: 3, label: "Games Area", type: "image", src: gallery3 },
    { id: 4, label: "Restaurant", type: "image", src: gallery4 },
    { id: 5, label: "Snack Bar", type: "image", src: gallery5 },
    { id: 6, label: "Playground", type: "image", src: gallery6 },
    // Videos interleaved
    
  ];

  // Testimonials (unchanged)
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Mother of 2",
      text: "Belkids Playground made my daughter's birthday absolutely magical! The staff was amazing and the facilities were spotless.",
      rating: 5
    },
    {
      name: "Michael Thompson",
      role: "School Teacher",
      text: "Our school field trip was a huge success. The kids had so much fun and learned swimming basics too!",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Event Planner",
      text: "I've planned events at many venues, but Belkids stands out with their exceptional service and attention to detail.",
      rating: 5
    }
  ];

  // Highlights (unchanged)
  const highlights = [
    { icon: FaStar, label: "Est. 2021", detail: "Serving families since 2021" },
    { icon: FaUsers, label: "School Bookings", detail: "Trusted by local schools" },
    { icon: FaSmile, label: "Family Fun", detail: "Safe & exciting environment" },
    { icon: FaAward, label: "Premium Service", detail: "Quality facilities & staff" }
  ];

  return (
    <div className="landing-page">
      {/* ====== HERO SECTION ====== */}
      <section className="hero">
        <div 
          className="hero-image-bg" 
          style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        ></div>
        <div className="hero-overlay"></div>
        <div className="floating-decoration deco-1">🎈</div>
        <div className="floating-decoration deco-2">🎪</div>
        <div className="floating-decoration deco-3">🏊</div>
        <div className="floating-decoration deco-4">⚽</div>

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <span className="badge-icon">🎪</span>
            <span>Welcome to Belkids Playground</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Where Every Day is a
            <span className="highlight-text"> Celebration!</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            The ultimate playground for birthday parties, school events, and family fun! 
            Enjoy our swimming pools, games, restaurant, and snack bar — all in one 
            safe and exciting venue.
          </motion.p>

          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <button className="primary-btn">
              <FaBirthdayCake className="btn-icon" />
              Book a Party
            </button>
            <button className="secondary-btn">
              Explore Activities
              <FaCalendarCheck className="btn-icon" />
            </button>
          </motion.div>

          <motion.div 
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            {highlights.map((item, index) => (
              <div key={index} className="stat-item">
                <item.icon className="stat-icon" />
                <div className="stat-info">
                  <span className="stat-label">{item.label}</span>
                  <span className="stat-detail">{item.detail}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ====== FEATURES SECTION ====== */}
      <section className="features-section">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="section-tag">What We Offer</span>
            <h2>Everything for a Perfect Day Out</h2>
            <p>From splashy pools to exciting games — we've got it all for your family's enjoyment</p>
          </motion.div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div 
                  className="feature-image-placeholder" 
                  style={{ 
                    backgroundImage: `url(${feature.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <div className="feature-icon-wrapper" style={{ background: `${feature.color}15` }}>
                  <feature.icon className="feature-icon" style={{ color: feature.color }} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className="feature-link">
                  <span>Learn More</span>
                  <FaArrowRight className="feature-arrow" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== GALLERY SECTION (updated with videos) ====== */}
      <section className="gallery-section">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="section-tag">Our Facilities</span>
            <h2>See Our Playground in Action</h2>
            <p>Take a peek at what makes Belkids Playground the perfect place for family fun</p>
          </motion.div>

          <div className="gallery-grid">
            {galleryItems.map((item, index) => (
              <motion.div 
                key={item.id}
                className="gallery-item"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                {item.type === "image" ? (
                  <div 
                    className="gallery-image-placeholder" 
                    style={{
                      backgroundImage: `url(${item.src})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      border: 'none'
                    }}
                  />
                ) : (
                  // Video item with play button overlay
                  <div className="gallery-video-wrapper">
                    <video 
                      className="gallery-video"
                      src={item.src}
                      poster={item.poster || undefined}
                      controls
                      muted
                      playsInline
                      preload="metadata"
                    />
                    <div className="gallery-video-overlay">
                      <FaPlay className="gallery-play-icon" />
                      <span className="gallery-video-label">{item.label}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== WHY CHOOSE US ====== */}
      <section className="why-choose-section">
        <div className="section-container">
          <motion.div 
            className="why-choose-content"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="why-choose-text">
              <span className="section-tag">Why Families Love Us</span>
              <h2>Creating Joy Since 2021</h2>
              <p>
                Belkids Playground is more than just a venue — it's where families 
                come together to celebrate, play, and create lasting memories. 
                With our dedicated staff, safe environment, and endless activities, 
                we make every visit special.
              </p>
              <div className="why-features">
                <div className="why-feature">
                  <FaStar className="why-icon" />
                  <div>
                    <h4>Safe & Secure</h4>
                    <p>Supervised facilities with child-safe equipment</p>
                  </div>
                </div>
                <div className="why-feature">
                  <FaClock className="why-icon" />
                  <div>
                    <h4>Flexible Hours</h4>
                    <p>Open for private events and school bookings</p>
                  </div>
                </div>
                <div className="why-feature">
                  <FaMapMarkerAlt className="why-icon" />
                  <div>
                    <h4>Convenient Location</h4>
                    <p>Easily accessible with ample parking space</p>
                  </div>
                </div>
              </div>
              <button className="primary-btn">
                <FaPhoneAlt className="btn-icon" />
                Contact Us Today
              </button>
            </div>
            <div className="why-choose-image">
              <div 
                className="image-placeholder" 
                style={{
                  backgroundImage: `url(${aboutImg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: 'none'
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== TESTIMONIALS ====== */}
      <section className="testimonials-section">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="section-tag">Testimonials</span>
            <h2>What Our Families Say</h2>
            <p>Real stories from happy parents, teachers, and event planners</p>
          </motion.div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                className="testimonial-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="testimonial-avatar">
                  <span className="avatar-emoji">👤</span>
                </div>
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="star-filled" />
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="cta-section">
        <div 
          className="cta-bg-image" 
          style={{
            backgroundImage: `url(${ctaBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="cta-overlay"></div>
        <div className="cta-container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Make Memories?</h2>
            <p>Book your next birthday party, school event, or family day out with us!</p>
            <div className="cta-buttons">
              <button className="cta-primary">
                <FaCalendarCheck className="btn-icon" />
                Book Now
              </button>
              <button className="cta-secondary">
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

export default LandingPage;