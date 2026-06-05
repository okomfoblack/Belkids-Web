import { motion } from "framer-motion"
import "../Styles/LandingPage.css"    

function LandingPage() {
  return (

    <section className="hero">

      <div className="overlay"></div>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >

        <h1>
          Elevate Your Style With StyleWave
        </h1>

        <p>
          Discover premium fashion, trending collections,
          and unbeatable deals crafted for modern lifestyles.
          Shop smarter, faster, and better with StyleWave.
        </p>

        <div className="hero-buttons">

          <button className="shop-btn">
            Shop Now
          </button>

          <button className="explore-btn">
            Explore Collections
          </button>

        </div>

      </motion.div>

    </section>

  )
}

export default LandingPage