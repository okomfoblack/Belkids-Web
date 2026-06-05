import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa"

import { toast } from "react-toastify"

import "../Styles/Signup.css"

function Signup() {

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [showPassword, setShowPassword] = useState(false)

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false

  )

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e) => {

    const { name, value } = e.target

    if (name === "username") {
      setFormData({
        ...formData,
        username: value.replace(/\s/g, ""),
      })
      return
    }

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const validateForm = () => {

    const username = formData.username.trim()
    const email = formData.email.trim()
    const password = formData.password
    const confirmPassword =
      formData.confirmPassword

    if (!username) {
      toast.error("Username is required")
      return false
    }

    if (!email) {
      toast.error("Email is required")
      return false
    }

    if (!password) {
      toast.error("Password is required")
      return false
    }

    if (!confirmPassword) {
      toast.error(
        "Confirm Password is required"
      )
      return false
    }

    if (username.length < 3) {
      toast.error(
        "Username must be at least 3 characters"
      )
      return false
    }

    if (username.length > 20) {
      toast.error(
        "Username cannot exceed 20 characters"
      )
      return false
    }

    if (
      !/^(?=.*[a-zA-Z])[a-zA-Z0-9_]+$/.test(
        username
      )
    ) {
      toast.error(
        "Username must contain letters and can only use letters, numbers and underscores"
      )
      return false
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      toast.error(
        "Please enter a valid email address"
      )
      return false
    }

    if (password.length < 8) {
      toast.error(
        "Password must be at least 8 characters"
      )
      return false
    }

    if (!/[A-Z]/.test(password)) {
      toast.error(
        "Password must contain an uppercase letter"
      )
      return false
    }

    if (!/[a-z]/.test(password)) {
      toast.error(
        "Password must contain a lowercase letter"
      )
      return false
    }

    if (!/[0-9]/.test(password)) {
      toast.error(
        "Password must contain a number"
      )
      return false
    }

    if (!/[!@#$%^&*]/.test(password)) {
      toast.error(
        "Password must contain a special character"
      )
      return false
    }

    if (password !== confirmPassword) {
      toast.error(
        "Passwords do not match"
      )
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (!validateForm()) return

    try {

      setLoading(true)

      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          username:
            formData.username.trim(),
          email:
            formData.email.trim(),
          password:
            formData.password,
          confirmPassword:
            formData.confirmPassword,
        }
      )

      toast.success(
        res.data.message ||
        "Account created successfully"
      )

      localStorage.setItem(
        "token",
        res.data.token
      )

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      )

      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      })

      setTimeout(() => {
        navigate("/login")
      }, 1500)

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Signup failed"
      )

    } finally {

      setLoading(false)

    }
  }

  const isFormComplete =
    formData.username &&
    formData.email &&
    formData.password &&
    formData.confirmPassword

  return (
    <section className="signup-page">

      <div className="signup-card">

        <div className="signup-left">

          <h1>Join ShopSphere</h1>

          <p>
            Create an account and start
            exploring amazing products,
            exclusive deals, and premium
            shopping experiences.
          </p>

        </div>

        <div className="signup-right">

          <h2>Create Account</h2>

          <form onSubmit={handleSubmit}>

            <div className="input-group">

              <FaUser className="input-icon" />

              <input
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />

            </div>

            <div className="input-group">

              <FaEnvelope className="input-icon" />

              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

            </div>

            <div className="input-group">

              <FaLock className="input-icon" />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />

              <span
                className="eye-icon"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {
                  showPassword
                    ? <FaEyeSlash />
                    : <FaEye />
                }
              </span>

            </div>

            <div className="password-rules">

              <p className={
                formData.password.length >= 8
                ? "valid"
                : ""
              }>
                ✓ At least 8 characters
              </p>

              <p className={
                /[A-Z]/.test(formData.password)
                ? "valid"
                : ""
              }>
                ✓ Uppercase letter
              </p>

              <p className={
                /[a-z]/.test(formData.password)
                ? "valid"
                : ""
              }>
                ✓ Lowercase letter
              </p>

              <p className={
                /[0-9]/.test(formData.password)
                ? "valid"
                : ""
              }>
                ✓ Number
              </p>

              <p className={
                /[!@#$%^&*]/.test(formData.password)
                ? "valid"
                : ""
              }>
                ✓ Special character
              </p>

            </div>

            <div className="input-group">

              <FaLock className="input-icon" />

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm Password"
                name="confirmPassword"
                value={
                  formData.confirmPassword
                }
                onChange={handleChange}
              />

              <span
                className="eye-icon"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {
                  showConfirmPassword
                    ? <FaEyeSlash />
                    : <FaEye />
                }
              </span>

            </div>

            {
              formData.confirmPassword && (
                <p
                  className={
                    formData.password ===
                    formData.confirmPassword
                      ? "match"
                      : "no-match"
                  }
                >
                  {
                    formData.password ===
                    formData.confirmPassword
                      ? "✓ Passwords match"
                      : "✗ Passwords do not match"
                  }
                </p>
              )
            }

            <button
              type="submit"
              disabled={
                loading ||
                !isFormComplete
              }
            >
              {
                loading
                  ? "Creating Account..."
                  : "Create Account"
              }
            </button>

          </form>

        </div>

      </div>

    </section>
  )
}

export default Signup