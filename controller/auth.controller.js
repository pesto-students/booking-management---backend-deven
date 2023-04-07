const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const yup = require("yup");
const User = require("../db/models/user");

//jwt secret
const jwtSecret = "your_secret_key";

const register = async (req, res) => {
  try {
    const saltRounds = 10;

    const registerSchema = yup.object().shape({
      username: yup.string().required().min(3).max(255),
      password: yup.string().required().min(3).max(255),
    });

    const { username, password } = req.body;

    await registerSchema.validate(req.body);

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({
      username,
      password: hashedPassword,
      role: "admin",
    });
    await user.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }
    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "60m",
    });
    res.json({ token, user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const logout = async (req, res) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }
    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.json({ token, user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  login,
  register,
};
