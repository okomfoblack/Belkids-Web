// src/components/ResetPassword.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaLock, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        setVerifying(true);
        console.log('🔍 Verifying token:', token);
        
        const res = await axios.get(
          `http://localhost:5000/api/auth/verify-reset-token/${token}`
        );

        console.log('✅ Verification response:', res.data);

        if (res.data.success) {
          setTokenValid(true);
          toast.success("Token verified! Please set your new password.");
        }
      } catch (error) {
        console.error('❌ Verification error:', error);
        if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        } else if (error.code === 'ERR_NETWORK') {
          toast.error("Cannot connect to server. Please check if backend is running.");
        } else {
          toast.error("Invalid or expired reset link");
        }
        setTokenValid(false);
      } finally {
        setVerifying(false);
      }
    };

    if (token) {
      verifyToken();
    } else {
      toast.error("No token provided");
      setTokenValid(false);
      setVerifying(false);
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain an uppercase letter");
      return;
    }

    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain a lowercase letter");
      return;
    }

    if (!/[0-9]/.test(password)) {
      toast.error("Password must contain a number");
      return;
    }

    if (!/[!@#$%^&*]/.test(password)) {
      toast.error("Password must contain a special character");
      return;
    }

    try {
      setLoading(true);
      
      const res = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        { password, confirmPassword }
      );

      toast.success("Password reset successful! Redirecting to login...");
      
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      setTimeout(() => {
        navigate("/login");
      }, 3000);

    } catch (error) {
      console.error('❌ Reset password error:', error);
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (verifying) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.spinnerContainer}>
            <FaSpinner style={styles.spinner} />
            <p style={styles.text}>Verifying your reset link...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (!tokenValid) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.errorIcon}>✗</div>
          <h2 style={styles.errorTitle}>Invalid or Expired Link</h2>
          <p style={styles.text}>The password reset link is invalid or has expired.</p>
          <Link to="/forgot-password" style={styles.link}>
            Request a new reset link
          </Link>
        </div>
      </div>
    );
  }

  // Form state
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Set New Password</h2>
        <p style={styles.subtitle}>Enter your new password below</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
            <span 
              style={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>

          <div style={styles.passwordRules}>
            <p style={password.length >= 8 ? styles.valid : styles.invalid}>
              {password.length >= 8 ? "✅" : "⬜"} At least 8 characters
            </p>
            <p style={/[A-Z]/.test(password) ? styles.valid : styles.invalid}>
              {/[A-Z]/.test(password) ? "✅" : "⬜"} Uppercase letter
            </p>
            <p style={/[a-z]/.test(password) ? styles.valid : styles.invalid}>
              {/[a-z]/.test(password) ? "✅" : "⬜"} Lowercase letter
            </p>
            <p style={/[0-9]/.test(password) ? styles.valid : styles.invalid}>
              {/[0-9]/.test(password) ? "✅" : "⬜"} Number
            </p>
            <p style={/[!@#$%^&*]/.test(password) ? styles.valid : styles.invalid}>
              {/[!@#$%^&*]/.test(password) ? "✅" : "⬜"} Special character
            </p>
          </div>

          <div style={styles.inputGroup}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
              required
            />
            <span 
              style={styles.eyeIcon}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>

          {confirmPassword && (
            <p style={password === confirmPassword ? styles.match : styles.noMatch}>
              {password === confirmPassword ? "✅ Passwords match" : "❌ Passwords do not match"}
            </p>
          )}

          <button 
            type="submit" 
            disabled={loading}
            style={styles.button}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <Link to="/login" style={styles.link}>
          ← Back to Login
        </Link>
      </div>
    </div>
  );
}

// Inline styles
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    background: 'linear-gradient(135deg, #0f172a, #1e293b)',
  },
  card: {
    width: '100%',
    maxWidth: '440px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '24px',
    padding: '40px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  },
  title: {
    color: 'white',
    fontSize: '1.8rem',
    marginBottom: '8px',
  },
  subtitle: {
    color: '#9ca3af',
    fontSize: '0.95rem',
    marginBottom: '30px',
  },
  text: {
    color: '#d1d5db',
    fontSize: '1rem',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  inputGroup: {
    position: 'relative',
    width: '100%',
  },
  input: {
    width: '100%',
    padding: '14px 48px 14px 16px',
    background: 'rgba(255, 255, 255, 0.06)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease',
  },
  eyeIcon: {
    position: 'absolute',
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    fontSize: '1.2rem',
  },
  passwordRules: {
    margin: '5px 0 10px',
  },
  valid: {
    color: '#22c55e',
    fontSize: '13px',
    margin: '4px 0',
  },
  invalid: {
    color: '#6b7280',
    fontSize: '13px',
    margin: '4px 0',
  },
  match: {
    color: '#22c55e',
    fontSize: '14px',
    margin: '-5px 0 0',
  },
  noMatch: {
    color: '#ef4444',
    fontSize: '14px',
    margin: '-5px 0 0',
  },
  button: {
    padding: '14px',
    background: 'linear-gradient(135deg, #ff7739, #ff5733)',
    border: 'none',
    borderRadius: '12px',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'all 0.3s ease',
  },
  link: {
    display: 'block',
    textAlign: 'center',
    marginTop: '16px',
    color: '#9ca3af',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
  spinnerContainer: {
    textAlign: 'center',
    padding: '20px 0',
  },
  spinner: {
    animation: 'spin 1s linear infinite',
    fontSize: '2.5rem',
    color: '#ff7739',
  },
  errorIcon: {
    width: '60px',
    height: '60px',
    background: '#ef4444',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    color: 'white',
    margin: '0 auto 20px',
  },
  errorTitle: {
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: '10px',
  },
};

export default ResetPassword;