const jwt = require("jsonwebtoken");
const User = require("../models/User")
const Wedding = require("../models/Wedding");
const { hashPassword, comparePassword } = require("../utils/password.util");


const register = async (req, res) => {
  try {
    const { name, email, password, weddingName } = req.body;

    if (!name || !email || !password || !weddingName) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Name, email, password, and wedding name are required"
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        data: null,
        message: "Email already registered"
      });
    }

    // 1️⃣ Hash password
    const passwordHash = await hashPassword(password);

    // 2️⃣ Create USER FIRST (no weddingId yet)
    const user = await User.create({
      name,
      email,
      passwordHash,
      role: "OWNER"
    });

    // 3️⃣ Create WEDDING with ownerId
    const wedding = await Wedding.create({
      name: weddingName,
      ownerId: user._id
    });

    // 4️⃣ Link wedding to user
    user.weddingId = wedding._id;
    await user.save();

    res.status(201).json({
      success: true,
      data: {
        userId: user._id,
        weddingId: wedding._id
      },
      message: "User registered successfully"
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      success: false,
      data: null,
      message: error.message
    });
  }
};



const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Invalid email or password"
      });
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        weddingId: user.weddingId,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      data: { token },
      message: "Login successful"
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      data: null,
      message: "Server error"
    });
  }
};

module.exports = { register, login };
