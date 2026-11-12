// Pages/GalleryPage.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaCamera,
  FaStar
} from "react-icons/fa";
import "./Styles/GalleryPage.css";

// 🖼️ IMPORT IMAGES — replace with your own
import img1 from "../assets/Belkids-Images/image16.PNG";
import img2 from "../assets/Belkids-Images/image13.PNG";
import img3 from "../assets/Belkids-Images/image10.PNG";
import img4 from "../assets/Belkids-Images/image11.PNG";
import img5 from "../assets/Belkids-Images/web1.jpeg";
import img6 from "../assets/Belkids-Images/web2.jpeg";
import img7 from "../assets/Belkids-Images/web3.jpeg";
import img8 from "../assets/Belkids-Images/web7.jpeg";
import img9 from "../assets/Belkids-Images/web5.jpeg";
import img10 from "../assets/Belkids-Images/web6.jpeg";
import img11 from "../assets/Belkids-Images/web8.jpeg";
import img12 from "../assets/Belkids-Images/image15.PNG";
import Footer from "../components/Footer";

// 🎬 IMPORT VIDEOS (optional — remove if no videos yet)
// import video1 from "../assets/Belkids-Images/video1.mp4";

function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const galleryItems = [
    { id: 1, src: img1, title: "Birthday Celebration" },
    { id: 2, src: img2, title: "Pool Fun" },
    { id: 3, src: img3, title: "Games Area" },
    { id: 4, src: img4, title: "Snack Bar" },
    { id: 5, src: img5, title: "Playground Views" },
    { id: 6, src: img6, title: "Party Setup" },
    { id: 7, src: img7, title: "Swimming Time" },
    { id: 8, src: img8, title: "Play Zone" },
    { id: 9, src: img9, title: "Garden Area" },
    { id: 10, src: img10, title: "Tasty Treats" },
    { id: 11, src: img11, title: "Happy Kids" },
    { id: 12, src: img12, title: "Family Day Out" }
  ];

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const prevImage = () => {
    setLightboxIndex(
      (prev) => (prev - 1 + galleryItems.length) % galleryItems.length
    );
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className="gallery-page">

      {/* ===== HERO ===== */}
      <section className="gallery-hero">
        <div className="gallery-hero-overlay"></div>
        <motion.div
          className="gallery-hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="gallery-hero-tag">
            <FaCamera /> Our Gallery
          </span>
          <h1>Moments of <span>Joy & Wonder</span></h1>
          <p>
            Take a peek into the magical moments we create every day at
            Belkids Playground — from splashes in the pool to unforgettable
            birthday celebrations.
          </p>
        </motion.div>
      </section>

      {/* ===== GALLERY GRID ===== */}
      <section className="gallery-grid-section">
        <div className="gallery-grid-inner">
          <motion.div layout className="gallery-grid">
            <AnimatePresence mode="popLayout">
              {galleryItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="gallery-item"
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -8 }}
                  onClick={() => openLightbox(index)}
                >
                  <img src={item.src} alt={item.title} loading="lazy" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ===== LIGHTBOX ===== */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button className="lightbox-close" onClick={closeLightbox}>
              <FaTimes />
            </button>
            <button
              className="lightbox-arrow lightbox-prev"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <FaChevronLeft />
            </button>
            <button
              className="lightbox-arrow lightbox-next"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <FaChevronRight />
            </button>

            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryItems[lightboxIndex].src}
                alt={galleryItems[lightboxIndex].title}
              />
              <div className="lightbox-caption">
                <span>{galleryItems[lightboxIndex].title}</span>
                <span className="lightbox-counter">
                  {lightboxIndex + 1} / {galleryItems.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== CTA ===== */}
      <section className="gallery-cta">
        <motion.div
          className="gallery-cta-inner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>Want to Create Your Own Memories?</h2>
          <p>
            Book your visit or plan a party with us — and let's make magic
            together.
          </p>
          <a
            href="tel:+233244701007"
            className="gallery-cta-btn"
          >
            <FaStar /> Book Your Visit
          </a>
        </motion.div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  </>
  );
}

export default GalleryPage;