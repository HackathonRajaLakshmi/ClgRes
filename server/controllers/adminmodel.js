const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/adminmodel');

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Admin doesn't exist" });

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ success: true, token, admin });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = {loginAdmin};
