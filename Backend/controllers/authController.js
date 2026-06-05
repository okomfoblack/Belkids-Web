import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// SIGNUP
export const signup = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      confirmPassword,
    } = req.body

    // Validate fields
    if (
      !username ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        message: "Please fill in all fields",
      })
    }

    // Check passwords
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      })
    }

    // Check if user exists
    const existingUser = await User.findOne({
      email,
    })

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    )

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    })

    // Create token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    )

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
}

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({
      email,
    })

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      })
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    )

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      })
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    )

 res.status(200).json({
  message: "Login successful",
  token,
  user: {
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  },
})
  } catch (error) {
    console.log(error)

    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
}