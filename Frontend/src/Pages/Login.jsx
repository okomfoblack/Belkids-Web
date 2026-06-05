import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle
} from "react-icons/fa"

import { toast } from "react-toastify"

import "../Styles/Login.css"

function Login() {

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [showPassword, setShowPassword] =
    useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const validateForm = () => {

    const email =
      formData.email.trim()

    const password =
      formData.password

    if (!email) {
      toast.error(
        "Email is required"
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

    if (!password) {
      toast.error(
        "Password is required"
      )
      return false
    }

    if (password.length < 8) {
      toast.error(
        "Password must be at least 8 characters"
      )
      return false
    }

    return true
  }

const handleSubmit = async (e) => {

  e.preventDefault()

  if (!validateForm()) {
    return
  }

  try {

    setLoading(true)

    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        email: formData.email.trim(),
        password: formData.password,
      }
    )

    toast.success(
      `Welcome back ${res.data.user.username}!`
    )

    localStorage.setItem(
      "token",
      res.data.token
    )

    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    )

    setTimeout(() => {

      if (
        res.data.user.role === "admin"
      ) {
setTimeout(() => {
  navigate("/admin-dashboard")
}, 1500)      } else {
        navigate("/user-dashboard")
      }

    }, 1500)

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Login failed"
    )

  } finally {

    setLoading(false)

  }

}
  const googleLogin = () => {

    window.open(
      "http://localhost:5000/auth/google",
      "_self"
    )

  }

  return (

    <section className="login-page">

      <div className="login-card">

        <div className="login-left">

          <h1>
            Welcome Back
          </h1>

          <p>
            Login to continue shopping
            premium products, explore
            trending collections,
            manage your cart and
            enjoy a seamless
            ecommerce experience.
          </p>

        </div>

        <div className="login-right">

          <h2>
            Login Account
          </h2>

          <form
            onSubmit={handleSubmit}
          >

            <div className="input-group">

              <FaEnvelope
                className="input-icon"
              />

              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                autoComplete="email"
              />

            </div>

            <div className="input-group">

              <FaLock
                className="input-icon"
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Password"
                name="password"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
                autoComplete="current-password"
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

            <button
              type="submit"
              disabled={loading}
            >
              {
                loading
                  ? "Logging In..."
                  : "Login"
              }
            </button>

          </form>

          <div className="divider">
            <span>
              OR
            </span>
          </div>

          <button
            className="google-btn"
            onClick={
              googleLogin
            }
          >
            <FaGoogle />

            Continue With Google
          </button>

        </div>

      </div>

    </section>

  )
}

export default Login