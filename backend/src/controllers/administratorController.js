import { Administrator } from "../models/index.js";
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'jwt_secret_key';

const STAFF = "staff";

const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const createAdministrator = (req, res) => {
  const { employeeName, contactNumber, email, password } = req.body;

  if(!isValidEmail(email.toString())){
    res.status(500).json({ error: "Invalid Email" })
  }

  const manager = new Administrator({
    employeeName:employeeName.toString(),
    contactNumber:contactNumber,
    email:email.toString(),
    password:password.toString(),
  });

  Administrator.create(manager, (err, data) => {
    if (err) res.status(500).json({ error: err });
    res.status(201).json(data);
  });
};

const loginAdministrator = (req, res) => {
  const { email, password } = req.body;

  if(!isValidEmail(email.toString())){
    res.status(500).json({ error: "Invalid Email" })
  }
  
  Administrator.findOne({ email: email.toString() }, (err, doc) => {
    if (err) {
      return res.status(400).json({ response: "Administrator not found" });
    }

    if (doc.password === password) {

      const token = jwt.sign({userId: doc._id,userType:STAFF}, JWT_SECRET, { expiresIn: "1h", });
      res.status(200).json({doc:doc,token: `Bearer ${token}`});
      return;
    }

    return res.status(400).json({ response: "Administrator not found" });
  });
};

export { createAdministrator, loginAdministrator };
