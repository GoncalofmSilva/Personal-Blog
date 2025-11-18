import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET;

export function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    next()
    return decoded;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
    return res.status(401).json({ message: "Token expired" });
  }
  return res.status(401).json({ message: "Invalid token" });
  }
}