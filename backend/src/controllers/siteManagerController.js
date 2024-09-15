import { OrderRequest, SiteManager } from "../models/index.js";

const isValidEmail = (email) => {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(email);
};


const createSiteManager = (req, res) => {
  const { employeeName, contactNumber, email, password,customId } = req.body;

  if(!isValidEmail(email.toString())){
    res.status(500).json({ error: "Invalid Email" })
  }

  const siteManager = new SiteManager({
    employeeName:employeeName.toString(),
    contactNumber:contactNumber.toString(),
    email:email.toString(),
    password:password.toString(),
    customId:customId.toString()
  });

  SiteManager.create(siteManager, (err, data) => {
    if (err) res.status(500).json({ error: err });
    res.status(201).json(data);
  });
};

const getSiteMangers = (req, res) => {
  SiteManager.find({}, (err, data) => {
    if (err) res.status(500).json({ error: err });
    res.status(200).json(data);
  });
};

const loginSiteManager = (req, res) => {
  const { email, password } = req.body;

  if(!isValidEmail(email.toString())){
    res.status(500).json({ error: "Invalid Email" })
  }
  
  SiteManager.findOne({ email: email.toString() }, (err, doc) => {
    if (err) {
      return res.status(400).json({ response: "SiteManager not found" });
    }

    if (doc.password === password) {
      res.status(200).json(doc);
      return;
    }

    return res.status(400).json({ response: "SiteManager not found" });
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

const updateSiteManager = (req, res) => {
  const { employeeName, newContactNumber, newEmail, password,customId } = req.body;

  if(!isValidEmail(newEmail.toString())){
    res.status(500).json({ error: "Invalid Email" })
  }

  const siteManager = new SiteManager({
    employeeName:employeeName.toString(),
    contactNumber:newContactNumber.toString(),
    email:newEmail.toString(),
    password:password.toString(),
    customId:customId.toString()
  });

  SiteManager.updateOne({customId:customId},{siteManager}, (err, data) => {
    if (err) res.status(500).json({ error: err });
    res.status(201).json(data);
  });
};


export {
  createSiteManager,
  loginSiteManager,
  createOrderRequest,
  getSiteMangers,
  deleteSiteManager,
  updateSiteManager
};
