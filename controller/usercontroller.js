const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require('../model/usermodel');

async function getuser (req, res) {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

async function adduser(req, res) {
    try {
      const { name, email_id, password, Phone_no } = req.body;
  
      // Check if user already exists
      const existingUser = await User.findOne({ email_id });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      // Hash password using bcrypt
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Create a new user
      const newUser = new User({
        name,
        email_id,
        password: hashedPassword, // Store hashed password in the database
        Phone_no
      });
  
      // Save the user to the database
      await newUser.save();
  
     // Generate and issue a JWT token upon successful registration
     const token = jwt.sign({ userId: newUser._id }, 'your-secret-key'); // Replace 'your-secret-key' with your own secret key
     res.status(201).json({ message: 'User created successfully', token });
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: 'Server error' });
   }
  };

  async function getUserByName(req, res) {
    try {
      const { name } = req.params;
  
      // Find the user by name
      const user = await User.findOne({ name });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching the user data.' });
    }
  }


module.exports = { getuser, adduser, getUserByName };