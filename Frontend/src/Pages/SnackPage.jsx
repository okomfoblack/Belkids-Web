// Snacks.jsx
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  FaCocktail,
  FaIceCream,
  FaCandyCane,
  FaCoffee,
  FaShoppingCart,
  FaStar,
  FaPhoneAlt,
  FaCalendarAlt,
  FaClock,
  FaTag,
  FaHeart,
  FaGlassWhiskey,
  FaGlassMartiniAlt,
  FaMugHot,
  FaWineBottle,
  FaLemon,
  FaTint
} from "react-icons/fa";
import { GiPopcorn, GiIceCreamScoop, GiCandyCanes } from "react-icons/gi";
import { Link } from "react-router-dom";
import "./Styles/Snacks.css";

import popcornImg from "../assets/Belkids-Images/image5.PNG";
import cottonCandyImg from "../assets/Belkids-Images/image5.PNG";
import iceCreamImg from "../assets/Belkids-Images/image5.PNG";
import drinksImg from "../assets/Belkids-Images/image5.PNG";
import candyImg from "../assets/Belkids-Images/image5.PNG";
import nachosImg from "../assets/Belkids-Images/image5.PNG";

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
      icon: FaCandyCane,
      image: cottonCandyImg,
      description: "Fluffy, melt-in-your-mouth cotton candy in pink, blue, or rainbow colors.",
      category: "Sweets",
      popular: true,
      color: "#E91E63"
    },
    {
      id: 3,
      title: "Ice Cream",
      icon: FaIceCream,
      image: iceCreamImg,
      description: "Creamy, delicious ice cream with a variety of flavors. Choose from chocolate, vanilla, strawberry, and more.",
      category: "Frozen",
      popular: false,
      color: "#2E7D32"
    },
    {
      id: 4,
      title: "Nachos",
      icon: FaCoffee,
      image: nachosImg,
      description: "Crispy tortilla chips served with melted cheese, salsa, and guacamole. A perfect savory snack.",
      category: "Snacks",
      popular: false,
      color: "#BF360C"
    },
    {
      id: 5,
      title: "Candy & Sweets",
      icon: GiCandyCanes,
      image: candyImg,
      description: "A variety of colorful candies, lollipops, and sweet treats that kids and adults love.",
      category: "Sweets",
      popular: false,
      color: "#FF6F00"
    },
    // ===== DRINKS SECTION (6 drinks) =====
    {
      id: 6,
      title: "Fresh Lemonade",
      icon: FaLemon,
      image: drinksImg,
      description: "Refreshing homemade lemonade made with fresh lemons and a touch of sweetness.",
      category: "Drinks",
      popular: true,
      color: "#F9A825"
    },
    {
      id: 7,
      title: "Fruit Smoothie",
      icon: FaGlassWhiskey,
      image: drinksImg,
      description: "Blended fresh fruits with yogurt and honey. A healthy and delicious treat.",
      category: "Drinks",
      popular: false,
      color: "#E040FB"
    },
    {
      id: 8,
      title: "Iced Tea",
      icon: FaMugHot,
      image: drinksImg,
      description: "Classic iced tea served with lemon and mint leaves. Perfect for a hot day.",
      category: "Drinks",
      popular: false,
      color: "#6D4C41"
    },
    {
      id: 9,
      title: "Milkshake",
      icon: FaGlassMartiniAlt,
      image: drinksImg,
      description: "Thick and creamy milkshakes in chocolate, vanilla, and strawberry flavors.",
      category: "Drinks",
      popular: true,
      color: "#D81B60"
    },
    {
      id: 10,
      title: "Fresh Juice",
      icon: FaTint,
      image: drinksImg,
      description: "Freshly squeezed orange, apple, and mixed fruit juices. 100% natural and healthy.",
      category: "Drinks",
      popular: false,
      color: "#FF6F00"
    },
    {
      id: 11,
      title: "Sparkling Water",
      icon: FaWineBottle,
      image: drinksImg,
      description: "Refreshing sparkling water with natural fruit essences. Zero calories, all refreshment.",
      category: "Drinks",
      popular: false,
      color: "#1A237E"
    }
  ];

  const categories = ["All", "Snacks", "Sweets", "Frozen", "Drinks"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSnacks = activeCategory === "All" 
    ? snacks 
    : snacks.filter(snack => snack.category === activeCategory);

  const specials = [
    {
      title: "Family Combo",
      description: "2 Popcorns + 2 Soft Drinks"
    },
    {
      title: "Kids Special",
      description: "Cotton Candy + Ice Cream + Drink"
    },
    {
      title: "Party Platter",
      description: "Popcorn, Nachos, Candy & 4 Drinks"
    }
  ];

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
            <div className="snacks-hero-buttons">
              <button className="btn-primary">
                <FaShoppingCart className="btn-icon" />
                View Menu
              </button>
              <button className="btn-secondary">
                <FaPhoneAlt className="btn-icon" />
                Contact Us
              </button>
            </div>
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

      {/* ===== SPECIALS / DEALS ===== */}
      <section className="specials-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="section-tag">Special Deals</span>
            <h2>Value <span className="highlight-green">Combos</span></h2>
            <p>Get more for less with our special combo deals</p>
          </motion.div>

          <div className="specials-grid">
            {specials.map((special, index) => (
              <motion.div
                key={index}
                className="special-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="special-icon">
                  <FaTag />
                </div>
                <h3>{special.title}</h3>
                <p>{special.description}</p>
                <button className="special-btn">Order in Store</button>
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
            <div className="cta-buttons">
              <button className="btn-primary">
                <FaCalendarAlt className="btn-icon" />
                Visit Us
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

export default Snacks;