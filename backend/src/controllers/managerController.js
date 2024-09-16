import { Manager, OrderRequest, Product } from "../models/index.js";

// const logger = require('winston');
import logger from '../utils/logger.js'; 

const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
;
  return regex.test(email);
};


const createManager = (req, res) => {
  const { manName, department, contactNumber, email, password, customId } =
    req.body;

  if(!isValidEmail(email.toString())){
    res.status(500).json({ error: "Invalid Email" })
  }
    
  const manager = new Manager({
    manName:manName.toString(),
    department:department.toString(),
    contactNumber:contactNumber.toString(),
    email:email.toString(),
    password:password.toString(),
    customId:customId.toString(),
  });

  Manager.create(manager, (err, data) => {
    if (err) {
      res.status(500).json({ error: err });
      console.log(err);
    }
    res.status(201).json(data);
  });
};

const getManagers = (req, res) => {
  Manager.find({}, (err, data) => {
    if (err) res.status(500).json({ error: err });
    res.status(200).json(data);
  });
};

const loginManager = (req, res) => {
  const { email, password } = req.body;

  if(!isValidEmail(email.toString())){
    res.status(500).json({ error: "Invalid Email" })
  }

  Manager.findOne({ email: email.toString() }, (err, doc) => {
    if (err) {
      return res.status(400).json({ response: "Manager not found" });
    }

    if (doc.password && doc.password === password) {
      res.status(200).json(doc);
      return;
    }

    return res.status(400).json({ response: "Manager not found" });
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

const updateManager = (req, res) => {
  const { manName, department, contactNumber, email, password, customId } =
    req.body;

  if(!isValidEmail(email)){
    res.status(500).json({ error: "Invalid Email" })
  }

  const newManager = new Manager({
    manName: manName.toString(),
    department: department.toString(),
    contactNumber: contactNumber.toString(),
    email: email.toString(),
    password: password.toString(),
    customId: customId.toString(),
  });

  Manager.updateOne({ customId: customId.toString() }, { newManager }, (err, data) => {
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
