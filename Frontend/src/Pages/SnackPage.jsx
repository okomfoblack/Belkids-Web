// Snacks.jsx
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  FaStar,
  FaPhoneAlt,
  FaCalendarAlt,
  FaTag,
  FaShoppingCart
} from "react-icons/fa";
import { GiPopcorn, GiCandyCanes } from "react-icons/gi";
import { FaLemon, FaBeer } from "react-icons/fa";
import "./Styles/Snacks.css";

import popcornImg from "../assets/Belkids-Images/popcorn.png";
import cottonCandyImg from "../assets/Belkids-Images/cotton.webp";
import maltImg from "../assets/Belkids-Images/malt.png";
import fantaImg from "../assets/Belkids-Images/fanta.webp";
import spriteImg from "../assets/Belkids-Images/sprite.jpg";
import cokeImg from "../assets/Belkids-Images/coke.jpg";
import yogurtImg from "../assets/Belkids-Images/yogo.jpg";
import orangeJuiceImg from "../assets/Belkids-Images/orange.avif";
import watermelonJuiceImg from "../assets/Belkids-Images/melon.jpg";

function Snacks() {
  const snacks = [
    {
      id: 1,
      title: "Popcorn",
      icon: GiPopcorn,
      image: popcornImg,
      description: "Freshly popped, buttery popcorn made to perfection. Available in sweet and salted varieties.",
      category: "Snacks",
      popular: true,
      color: "#5D4037"
    },
    {
      id: 2,
      title: "Cotton Candy",
      icon: GiCandyCanes,
      image: cottonCandyImg,
      description: "Fluffy, melt-in-your-mouth cotton candy in pink, blue, or rainbow colors.",
      category: "Sweets",
      popular: true,
      color: "#E91E63"
    },
    // ===== DRINKS =====
    {
      id: 3,
      title: "Malt",
      icon: FaBeer,
      image: maltImg,
      description: "Rich and creamy malt drink, perfect for a refreshing treat.",
      category: "Drinks",
      popular: true,
      color: "#5D4037"
    },
    {
      id: 4,
      title: "Fanta",
      icon: FaLemon,
      image: fantaImg,
      description: "Sparkling orange soda with a refreshing citrus taste.",
      category: "Drinks",
      popular: true,
      color: "#FF6F00"
    },
    {
      id: 5,
      title: "Sprite",
      icon: FaLemon,
      image: spriteImg,
      description: "Crisp, clean lemon-lime soda that refreshes and quenches thirst.",
      category: "Drinks",
      popular: false,
      color: "#1A237E"
    },
    {
      id: 6,
      title: "Coca-Cola",
      icon: FaBeer,
      image: cokeImg,
      description: "Classic, refreshing cola drink enjoyed by everyone.",
      category: "Drinks",
      popular: true,
      color: "#C62828"
    },
    {
      id: 7,
      title: "Yogurt",
      icon: FaLemon,
      image: yogurtImg,
      description: "Creamy, delicious yogurt in various flavors. A healthy and tasty snack.",
      category: "Snacks",
      popular: false,
      color: "#2E7D32"
    },
    {
      id: 8,
      title: "Orange Juice",
      icon: FaLemon,
      image: orangeJuiceImg,
      description: "Freshly squeezed orange juice, packed with vitamin C and natural sweetness.",
      category: "Drinks",
      popular: true,
      color: "#F57C00"
    },
    {
      id: 9,
      title: "Watermelon Juice",
      icon: FaLemon,
      image: watermelonJuiceImg,
      description: "Refreshing watermelon juice, naturally sweet and perfect for a hot day.",
      category: "Drinks",
      popular: true,
      color: "#D32F2F"
    }
  ];

  const categories = ["All", "Snacks", "Sweets", "Drinks"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSnacks = activeCategory === "All" 
    ? snacks 
    : snacks.filter(snack => snack.category === activeCategory);

  return (
    <div className="snacks-page">
      {/* ===== HERO SECTION ===== */}
      <section className="snacks-hero">
        <div className="snacks-hero-overlay"></div>
        <div className="snacks-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="snacks-hero-badge">🍿 Our Snack Bar</span>
            <h1>Delicious <span className="highlight-text">Treats</span> & Drinks</h1>
            <p>
              From buttery popcorn to refreshing drinks, our snack bar offers a variety 
              of tasty treats and beverages to make your visit even more enjoyable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== CATEGORY FILTER ===== */}
      <section className="category-section">
        <div className="container">
          <div className="category-tabs">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-tab ${activeCategory === category ? "active" : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SNACKS GRID ===== */}
      <section className="snacks-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="section-tag">Our Menu</span>
            <h2>Snacks, Sweets & <span className="highlight-green">Drinks</span></h2>
            <p>Explore our delicious selection of snacks and beverages</p>
          </motion.div>

          <div className="snacks-grid">
            {filteredSnacks.map((snack, index) => (
              <motion.div
                key={snack.id}
                className={`snack-card ${snack.popular ? "popular" : ""}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                {snack.popular && (
                  <div className="popular-badge">
                    <FaStar className="popular-icon" />
                    Popular
                  </div>
                )}
                <div className="snack-card-image">
                  <img src={snack.image} alt={snack.title} />
                  <div className="snack-card-overlay">
                    <span className="snack-category-tag">{snack.category}</span>
                  </div>
                </div>
                <div className="snack-card-content">
                  <div className="snack-card-header">
                    <div className="snack-icon-wrapper" style={{ background: `${snack.color}20` }}>
                      <snack.icon className="snack-icon" style={{ color: snack.color }} />
                    </div>
                    <span className="snack-category">{snack.category}</span>
                  </div>
                  <h3>{snack.title}</h3>
                  <p>{snack.description}</p>
                  <div className="snack-card-footer">
                    <span className="snack-availability">Available in-store</span>
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
            <h2>Craving Something <span className="highlight-text">Delicious</span>?</h2>
            <p>Visit our snack bar today and treat yourself to something tasty</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Snacks;