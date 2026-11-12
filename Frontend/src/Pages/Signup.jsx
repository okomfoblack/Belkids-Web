import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCamera,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "./Styles/Signup.css";

const API_URL = "http://localhost:5000";

function Signup() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profileImage, setProfileImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setFormData({ ...formData, username: value.replace(/\s/g, "") });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleImageClick = () => fileInputRef.current.click();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 1 * 1024 * 1024) {
      toast.error("Image size should be less than 1MB");
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const { username, email, password, confirmPassword } = formData;
    if (!username.trim()) { toast.error("Username is required"); return false; }
    if (!email.trim()) { toast.error("Email is required"); return false; }
    if (!password) { toast.error("Password is required"); return false; }
    if (!confirmPassword) { toast.error("Confirm Password is required"); return false; }
    if (username.length < 3) { toast.error("Username must be at least 3 characters"); return false; }
    if (username.length > 20) { toast.error("Username cannot exceed 20 characters"); return false; }
    if (!/^(?=.*[a-zA-Z])[a-zA-Z0-9_]+$/.test(username)) {
      toast.error("Username must contain letters, numbers, and underscores only");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { toast.error("Please enter a valid email"); return false; }
    if (password.length < 8) { toast.error("Password must be at least 8 characters"); return false; }
    if (!/[A-Z]/.test(password)) { toast.error("Password must contain an uppercase letter"); return false; }
    if (!/[a-z]/.test(password)) { toast.error("Password must contain a lowercase letter"); return false; }
    if (!/[0-9]/.test(password)) { toast.error("Password must contain a number"); return false; }
    if (!/[!@#$%^&*]/.test(password)) { toast.error("Password must contain a special character"); return false; }
    if (password !== confirmPassword) { toast.error("Passwords do not match"); return false; }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/api/auth/signup`, {
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        profileImage: profileImage,
      });
      toast.success(res.data.message || "Account created successfully");
      if (res.data.token) localStorage.setItem("token", res.data.token);
      if (res.data.user) localStorage.setItem("user", JSON.stringify(res.data.user));
      setFormData({ username: "", email: "", password: "", confirmPassword: "" });
      setProfileImage("");
      setImagePreview("");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const isFormComplete =
    formData.username && formData.email && formData.password && formData.confirmPassword;

  const getImageSource = () => {
    if (imagePreview) return imagePreview;
    return `https://ui-avatars.com/api/?name=${formData.username || "User"}&background=2E7D32&color=fff`;
  };

  return (
    <section className="signup-page">
      <div className="signup-card">
        <div className="signup-left">
          <h1>Join Belkids</h1>
          <p>Create an account and start exploring amazing experiences at Belkids Playground.</p>
        </div>
        <div className="signup-right">
          <h2>Create Account</h2>

          <div className="profile-upload">
            <div className="profile-image-container" onClick={handleImageClick}>
              <img src={getImageSource()} alt="Profile Preview" className="profile-preview" />
              <div className="profile-image-overlay">
                <FaCamera className="camera-icon" />
                <span>Change Photo</span>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: "none" }}
            />
            <p className="upload-hint">Click on the image to upload a profile photo</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <FaUser className="input-icon" />
              <input type="text" placeholder="Username" name="username" value={formData.username} onChange={handleChange} />
            </div>

            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input type="email" placeholder="Email Address" name="email" value={formData.email} onChange={handleChange} />
            </div>

            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="password-rules">
              <p className={formData.password.length >= 8 ? "valid" : ""}>✓ At least 8 characters</p>
              <p className={/[A-Z]/.test(formData.password) ? "valid" : ""}>✓ Uppercase letter</p>
              <p className={/[a-z]/.test(formData.password) ? "valid" : ""}>✓ Lowercase letter</p>
              <p className={/[0-9]/.test(formData.password) ? "valid" : ""}>✓ Number</p>
              <p className={/[!@#$%^&*]/.test(formData.password) ? "valid" : ""}>✓ Special character</p>
            </div>

            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {formData.confirmPassword && (
              <p className={formData.password === formData.confirmPassword ? "match" : "no-match"}>
                {formData.password === formData.confirmPassword
                  ? "✓ Passwords match"
                  : "✗ Passwords do not match"}
              </p>
            )}

            <button type="submit" disabled={loading || !isFormComplete}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Signup;