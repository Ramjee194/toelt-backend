import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password, phone ,role} = req.body;

    if (!name || !email || !password || !phone,!role) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role:role || "user",
    });

    await user.save();

    return res.status(200).json({
      success:true,
      message: "User registered successfully",
      
    });

  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter email and password",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "7d" }
    );

    // Send successful response
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};


// LOGOUT
export const logout = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ message: "User ID is required for logout" });
    }

    const user = await User.findById(id);
    
    if (!user) {
      
      return res.status(404).json({
       
        message: "User not found" });
    }

    // Logout is handled client-side by removing token
    return res.status(200).json({ 
       success:true,
      message: "Logout successful" });

  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};