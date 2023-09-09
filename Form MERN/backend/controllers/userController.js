const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const {
    username,
    email,
    password,
    about,
    firstName,
    lastName,
    gender,
    phoneNumbers,
    userData,
  } = req.body;

  const companyEmail = `${username}@company.com`;

  // Validation
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be up to 6 characters");
  }

  // Check if user email already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email has already been registered");
  }




  // Create new user in the database
  const user = await User.create({
    username,
    email,
    companyEmail, // Include the company email
    password,
    firstName,
    lastName,
    gender,
    phoneNumbers,
    about,
    userData,
  });

  // Return a success response or any other logic you need
  res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
});

module.exports = {
  registerUser,
};
