import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
import { emailExists, registerUser, storeToken } from "../models/authModel.js";
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await emailExists(email);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({id: user.id, email: user.email}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})

    await storeToken({email, token})

    res.status(201).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({message: "Error loging user"})
  }
};

export const Register = async (req, res) => {
  try {
    const { email, password } = req.body;

    switch (true) {
      case !email:
        return res.status(400).json({ error: "Missing email" });
      case !password:
        return res.status(400).json({ error: "Missing password" });
      default:
        break;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const user = await emailExists(email);
    if (user) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userId = await registerUser({ email, hashedPassword });

    const token = jwt.sign({ id: userId, email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    res.status(201).json({ message: "User created", token });
  } catch (error) {
    res.status(500).json({ message: "User Can't be created" });
  }
};