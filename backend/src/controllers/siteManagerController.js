import { OrderRequest, SiteManager } from "../models/index.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const SITEMANAGER = "sitemanager";


const isValidEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
;
  return regex.test(email);
};

const createSiteManager = async (req, res) => {
  const { employeeName, contactNumber, email, password, customId } = req.body;

  if (!isValidEmail(email.toString())) {
    return res.status(500).json({ error: "Invalid Email" });
  }

  try {
  
    const hashedPassword = await bcrypt.hash(password.toString(), 10);

    const siteManager = new SiteManager({
      employeeName: employeeName.toString(),
      contactNumber: contactNumber.toString(),
      email: email.toString(),
      password: hashedPassword,  
      customId: customId.toString()
    });

    SiteManager.create(siteManager, (err, data) => {
      if (err) res.status(500).json({ error: err });
      res.status(201).json(data);
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating site manager" });
  }
};

const loginSiteManager = (req, res) => {
  const { email, password } = req.body;

  if (!isValidEmail(email.toString())) {
    return res.status(500).json({ error: "Invalid Email" });
  }

  SiteManager.findOne({ email: email.toString() }, async (err, doc) => {
    if (err || !doc) {
      return res.status(400).json({ response: "SiteManager not found" });
    }

    try {
      
      const isMatch = await bcrypt.compare(password.toString(), doc.password);
      if (isMatch) {
        const token = jwt.sign({ userId: doc._id, userType: SITEMANAGER }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ doc: doc, token: `Bearer ${token}` });
      } else {
        res.status(400).json({ response: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ response: "Error logging in" });
    }
  });
};


const updateSiteManager = async (req, res) => {
  const { employeeName, newContactNumber, newEmail, password, customId } = req.body;

  if (!isValidEmail(newEmail.toString())) {
    return res.status(500).json({ error: "Invalid Email" });
  }

  try {
    let hashedPassword = password;

    
    if (password) {
      hashedPassword = await bcrypt.hash(password.toString(), 10);
    }

    const siteManager = {
      employeeName: employeeName.toString(),
      contactNumber: newContactNumber.toString(),
      email: newEmail.toString(),
      password: hashedPassword.toString(),
      customId: customId.toString(),
    };

    SiteManager.updateOne({ customId: customId.toString() }, siteManager, (err, data) => {
      if (err) res.status(500).json({ error: err });
      res.status(201).json(data);
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating site manager" });
  }
};

const getSiteMangers = (req, res) => {
  SiteManager.find({}, (err, data) => {
    if (err) res.status(500).json({ error: err });
    res.status(200).json(data);
  });
};

const createOrderRequest = (req, res) => {
  const { products, totalAmount, siteManager, supplier } = req.body;
  const orderRequest = new OrderRequest({
    products:products.toString(),
    totalAmount:totalAmount.toString(),
    siteManager:siteManager.toString(),
    supplier:supplier.toString(),
  });

  OrderRequest.create(orderRequest, (err, data) => {
    if (err) res.status(500).json({ error: err });
    res.status(201).json(data);
  });
};

const deleteSiteManager =  (req, res)=>{

  const {customId} = req.params
  
  SiteManager.findOneAndDelete({customId:customId}, (err, data) => {
    if (err) res.status(500).json({ error: err });
    res.status(201).json(data);
  });

}

export {
  createSiteManager,
  loginSiteManager,
  createOrderRequest,
  getSiteMangers,
  deleteSiteManager,
  updateSiteManager
};
