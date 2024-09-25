import { Manager, OrderRequest, Product } from "../models/index.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const MANAGER = "manager";

// const logger = require('winston');
import logger from '../utils/logger.js'; 

const isValidEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
;
  return regex.test(email);
};


const createManager = async (req, res) => {
  const { manName, department, contactNumber, email, password, customId } = req.body;

  if (!isValidEmail(email.toString())) {
    return res.status(500).json({ error: "Invalid Email" });
  }

  try {
    
    const hashedPassword = await bcrypt.hash(password.toString(), 10);

    const manager = new Manager({
      manName: manName.toString(),
      department: department.toString(),
      contactNumber: contactNumber.toString(),
      email: email.toString(),
      password: hashedPassword, 
      customId: customId.toString(),
    });

    Manager.create(manager, (err, data) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(201).json(data);
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating manager" });
  }
};

const loginManager = (req, res) => {
  const { email, password } = req.body;

  if (!isValidEmail(email.toString())) {
    return res.status(500).json({ error: "Invalid Email" });
  }

  Manager.findOne({ email: email.toString() }, async (err, doc) => {
    if (err || !doc) {
      return res.status(400).json({ response: "Manager not found" });
    }

    try {
      // Compare the hashed password with the input password
      const isMatch = await bcrypt.compare(password.toString(), doc.password);
      if (isMatch) {
        const token = jwt.sign({ userId: doc._id, userType: MANAGER }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ doc: doc, token: `Bearer ${token}` });
      } else {
        res.status(400).json({ response: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ response: "Error logging in" });
    }
  });
};

const updateManager = async (req, res) => {
  const { manName, department, contactNumber, email, password, customId } = req.body;

  if (!isValidEmail(email.toString())) {
    return res.status(500).json({ error: "Invalid Email" });
  }

  try {
    let hashedPassword = password;

    // If the password is being updated, hash the new password
    if (password) {
      hashedPassword = await bcrypt.hash(password.toString(), 10);
    }

    const updatedManager = {
      manName: manName.toString(),
      department: department.toString(),
      contactNumber: contactNumber.toString(),
      email: email.toString(),
      password: hashedPassword.toString(),
      customId: customId.toString(),
    };

    Manager.updateOne({ customId: customId.toString() }, updatedManager, (err, data) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json(data);
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating manager" });
  }
};

const getManagers = (req, res) => {
  Manager.find({}, (err, data) => {
    if (err) res.status(500).json({ error: err });
    res.status(200).json(data);
  });
};


const approveRequest = (req, res) => {
  const { orderRequestId } = req.params;

  OrderRequest.findById(orderRequestId, (err, data) => {
    if (err) {
      res.status(500).json({ error: err });
    }

    data.isApproved = true;
    data.isPlaced = true;

    data.save(function (err) {
      if (err) {
        logger.error('Error approving request:', err);
        return res.status(500).json({ error: 'Internal server error occurred while approving request.' });
      }
      res.json({ status: "Order Request Approved successfully!" });
    });
  });
};

const declineRequest = (req, res) => {
  const { orderRequestId } = req.params;

  OrderRequest.findById(orderRequestId, (err, data) => {
    if (err) {
      res.status(500).json({ error: err });
    }

    data.isApproved = false;

    data.save(function (err) {
      if (err) {
        logger.error('Error declining request:', err);
        return res.status(500).json({ error: 'Internal server error occurred while declining request.' });
      }
      res.json({ status: "Order Request Approved successfully!" });
    });
  });
};

const approveQuotations = (req, res) => {
  const { productId } = req.params;

  Product.findById(productId, (err, data) => {
    if (err) {
      res.status(500).json({ error: err });
    }

    data.isApproved = true;

    data.save(function (err) {
      if (err) {
        logger.error('Error approving Quotation:', err);
        return res.status(500).json({ error: 'Internal server error occurred while approving Quotation.' });
      }
      res.json({ status: "Product Approved successfully!" });
    });
  });
};

const getUnApprovedProducts = (req, res) => {
  Product.find({ hasQuoted: true, isApproved: false }, (err, data) => {
    if (err) res.status(500).json({ error: err });
    res.status(200).json(data);
  });
};

const deleteManager = (req, res) => {
  const { customId } = req.params;

  Manager.findOneAndDelete({ customId: customId }, (err, data) => {
    if (err) res.status(500).json({ error: err });
    res.status(201).json(data);
  });
};

export {
  createManager,
  loginManager,
  approveRequest,
  declineRequest,
  getManagers,
  approveQuotations,
  getUnApprovedProducts,
  deleteManager,
  updateManager,
};
