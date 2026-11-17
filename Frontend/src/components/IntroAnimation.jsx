// components/IntroAnimation.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Styles/IntroAnimation.css";
import logoImg from "../assets/Belkids-Images/image7.png";

export default function IntroAnimation({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0); 

  useEffect(() => {
    // Progress bar: fills over exactly 2 seconds (20ms * 50 increments of 2%)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    // Close exactly at 3.5 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 3500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 800);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{
            y: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
            opacity: { duration: 0.8 }
          }}
        >
          <button className="intro-skip" onClick={handleClose}>
            Skip Intro →
          </button>

          <div className="intro-content">
            <motion.div
              className="intro-logo-wrap"
              initial={{ opacity: 0, rotateY: -180, scale: 0.9 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              transition={{
                duration: 1.2,
                ease: "easeInOut",
                delay: 0.1
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <img src={logoImg} alt="Belkids Logo" className="intro-logo" />
            </motion.div>

            <motion.p
              className="intro-tagline"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6, ease: "easeOut" }}
            >
              Where memories begin...
            </motion.p>
          </div>

          <div className="intro-loader-wrap">
            <div className="intro-loader-bar">
              <motion.div
                className="intro-loader-fill"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <span className="intro-percentage">{progress}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}