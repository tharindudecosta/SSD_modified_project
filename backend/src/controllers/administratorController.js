import { Administrator } from "../models/index.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const STAFF = "staff";

const isValidEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
/;
  return regex.test(email);
};

const createAdministrator = async (req, res) => {
  const { employeeName, contactNumber, email, password } = req.body;

  if (!isValidEmail(email.toString())) {
    return res.status(500).json({ error: "Invalid Email" });
  }

  try {
    
    const hashedPassword = await bcrypt.hash(password.toString(), 10);

    const manager = new Administrator({
      employeeName: employeeName.toString(),
      contactNumber: contactNumber,
      email: email.toString(),
      password: hashedPassword,  
    });

    Administrator.create(manager, (err, data) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json(data);
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating administrator" });
  }
};

const loginAdministrator = (req, res) => {
  const { email, password } = req.body;

  if (!isValidEmail(email.toString())) {
    return res.status(500).json({ error: "Invalid Email" });
  }

  Administrator.findOne({ email: email.toString() }, async (err, doc) => {
    if (err || !doc) {
      return res.status(400).json({ response: "Administrator not found" });
    }

    try {
      
      const isMatch = await bcrypt.compare(password.toString(), doc.password);
      if (isMatch) {
        const token = jwt.sign({ userId: doc._id, userType: STAFF }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ doc: doc, token: `Bearer ${token}` });
      } else {
        res.status(400).json({ response: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ response: "Error logging in" });
    }
  });
};

export { createAdministrator, loginAdministrator };
