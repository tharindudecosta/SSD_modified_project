import { Manager, OrderRequest, Product } from "../models/index.js";

const createManager = (req, res) => {
  const { manName, department, contactNumber, email, password, customId } =
    req.body;

  const manager = new Manager({
    manName,
    department,
    contactNumber,
    email,
    password,
    customId,
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

  Manager.findOne({ email: email }, (err, doc) => {
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
      if (err) return res.send(err);
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
      if (err) return res.send(err);
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
      if (err) return res.send(err);
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

  const newManager = new Manager({
    manName: manName,
    department: department,
    contactNumber: contactNumber,
    email: email,
    password: password,
    customId: customId,
  });

  Manager.updateOne({ customId: customId }, { newManager }, (err, data) => {
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
