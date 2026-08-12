// src/components/ForgotPassword.jsx
import { useState } from "react";
import { Link } from "react-router-dom"; // ✅ Removed useNavigate since it's not used
import { 
  FaEnvelope, 
  FaArrowLeft, 
  FaCheckCircle, 
  FaSpinner,
  FaLock
} from "react-icons/fa";
import { toast } from "react-toastify"; 
import axios from "axios";
import "./Styles/ForgotPassword.css";

function ForgotPassword() {
  // ✅ Removed navigate since it's not used
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email },
        {
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      
      if (response.data.success) {
        setEmailSent(true);
        toast.success("Password reset link sent to your email!");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      
      if (error.code === 'ERR_NETWORK') {
        toast.error("Cannot connect to server. Please make sure the backend is running on port 5000.");
        console.error("Network error - Backend might not be running");
      } else if (error.response?.status === 404) {
        toast.error("No account found with this email address");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("No response from server. Please check if backend is running.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setEmailSent(false);
    setEmail("");
  };

  return (
    <section className="forgot-password-page">
      <div className="forgot-password-card">
        {/* Back Button */}
        <Link to="/login" className="back-link">
          <FaArrowLeft className="back-icon" />
          Back to Login
        </Link>

        {/* Header */}
        <div className="forgot-password-header">
          <div className="header-icon">
            <FaLock />
          </div>
          <h2>Forgot Password</h2>
          <p>
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        {!emailSent ? (
          // Form
          <form onSubmit={handleSubmit} className="forgot-password-form">
            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={handleEmailChange}
                className={emailError ? "error" : ""}
                disabled={loading}
                autoFocus
                required
              />
              {emailError && <span className="error-message">{emailError}</span>}
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading || !email || !!emailError}
            >
              {loading ? (
                <>
                  <FaSpinner className="spinner" />
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>

            <div className="form-footer">
              <p>
                Remember your password?{" "}
                <Link to="/login" className="login-link">
                  Login
                </Link>
              </p>
            </div>
          </form>
        ) : (
          // Success Message
          <div className="success-message">
            <div className="success-icon">
              <FaCheckCircle />
            </div>
            <h3>Check Your Email</h3>
            <p>
              We've sent a password reset link to
              <br />
              <strong>{email}</strong>
            </p>
            <div className="success-actions">
              <button onClick={handleResend} className="resend-btn">
                Didn't receive the email? Try again
              </button>
              <Link to="/login" className="back-to-login-btn">
                Back to Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ForgotPassword;