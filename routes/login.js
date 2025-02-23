import express from "express";
import bcrypt from "bcrypt";
import adminModel from "../models/admin.js"; // Import your Admin model

const loginRouter = express.Router();

// Login endpoint
loginRouter.post("/", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    // Find the user by username
    const admin = await adminModel.findOne({ username: username });

    // Check if the user exists
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Compare the entered password with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(
      hashedPassword,
      admin.hashedPassword
    );

    // Check if passwords match
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // If everything is correct, you can generate a token or set a session and send a success response
    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default loginRouter;