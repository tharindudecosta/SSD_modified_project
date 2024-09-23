import { OrderRequest, Product, Supplier } from "../models/index.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const SUPPLIER = "supplier";

// const logger = require('winston');
import logger from '../utils/logger.js'; 

const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
;
  return regex.test(email);
};

const createSupplier = async (req, res) => {
  const { supplierName, address, contactPerson, email, fax, password } = req.body;

  if (!isValidEmail(email.toString())) {
    return res.status(500).json({ error: "Invalid Email" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password.toString(), 10);

    const supplier = new Supplier({
      supplierName: supplierName.toString(),
      address: address.toString(),
      contactPerson: contactPerson.toString(),
      email: email.toString(),
      fax: fax.toString(),
      password: hashedPassword,
    });

    Supplier.create(supplier, (err, data) => {
      if (err) {
        console.log(err)
        res.status(500).json({ error: err });
      }
      res.status(201).json(data);
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating supplier" });
  }
};

const loginSupplier = (req, res) => {
  const { email, password } = req.body;

  if (!isValidEmail(email.toString())) {
    return res.status(500).json({ error: "Invalid Email" });
  }

  Supplier.findOne({ email: email.toString() }, async (err, doc) => {
    if (err || !doc) {
      return res.status(400).json({ response: "Supplier not found" });
    }

    try {
      const isMatch = await bcrypt.compare(password.toString(), doc.password);
      if (isMatch) {
        const token = jwt.sign({ userId: doc._id, userType: SUPPLIER }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ doc: doc, token: `Bearer ${token}` });
      } else {
        res.status(400).json({ response: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ response: "Error logging in" });
    }
  });
};

const getSupplier = (req, res) => {
  Supplier.find()
    .populate("materials")
    .exec(function (err, data) {
      if (err) res.status(500).json({ error: err });
      res.status(200).json(data);
    });
};

const getSupplierById = (req, res) => {
  const { supplierId } = req.params;

  Supplier.findById(supplierId)
    .populate("materials")
    .exec(function (err, data) {
      if (err) res.status(500).json({ error: err });
      res.status(201).json(data);
    });
};

const createMaterialQuotation = (req, res) => {
  const { supplierId } = req.params;
  const { productName, unitOfMeasure, qty } = req.body;

  const product = new Product({
    productName:productName.toString(),
    unitOfMeasure:unitOfMeasure.toString(),
    qty: Number(qty),
    restrictedProduct: false,
  });

  Product.create(product, (err, product) => {
    if (err) res.status(500).json({ error: err });

    Supplier.findById(supplierId, (err, data) => {
      if (err) {
        res.status(500).json({ error: err });
      }

      data.materials.push(product);

      data.save(function (err) {
        if (err) {
          // Log the actual error details
          logger.error('Error saving Product:', err);
        
          // Send generic error message to client
          return res.status(500).json({ error: 'Internal server error occurred while saving' });
        }
        res.json({ status: "Product added successfully!" });
      });
    });
  });
};

const placedOrders = (req, res) => {
  const { supplierId } = req.params;

  OrderRequest.find({ isPlaced: true, supplier: supplierId })
    .populate("siteManager")
    .populate("supplier")
    .exec(function (err, data) {
      if (err) res.status(500).json({ error: err });
      res.status(200).json(data);
    });
};
const placeSupplierQuotation = (req, res) => {
  const { productId } = req.params;
  const { price } = req.body;

  Product.findById(productId, (err, data) => {
    if (err) {
      res.status(500).json({ error: err });
    }

    data.hasQuoted = true;
    data.unitPrice = price;

    data.save(function (err) {
      if (err) {
        logger.error('Error placing Quotation:', err);
        return res.status(500).json({ error: 'Internal server error occurred while placing Quotation.' });
      }
      res.json({ status: "Order Request Approved successfully!" });
    });
  });
};

export {
  createSupplier,
  loginSupplier,
  createMaterialQuotation as addProductsToSupplier,
  getSupplier,
  getSupplierById,
  placedOrders,
  placeSupplierQuotation,
};
