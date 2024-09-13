import { OrderRequest } from "../models/index.js";

const createOrderRequest = (req, res) => {
  const { products, totalAmount, siteManager, supplier } = req.body;

  const orderRequest = new OrderRequest({
    products,
    totalAmount,
    siteManager,
    supplier,
  });

  OrderRequest.create(orderRequest, (err, data) => {
    if (err) res.status(500).json({ error: err });
    res.status(201).json(data);
  });
};

const ordersToApprove = (req, res) => {
  OrderRequest.find({ isApproved: { $exists: false } })
    .populate("siteManager")
    .populate("supplier")
    .exec(function (err, data) {
      if (err) res.status(500).json({ error: err });
      res.status(200).json(data);
    });
};

const approvedRequests = (req, res) => {
  OrderRequest.find({ isApproved: true })
    .populate("siteManager")
    .populate("supplier")
    .exec(function (err, data) {
      if (err) res.status(500).json({ error: err });
      res.status(200).json(data);
    });
};

const declinedRequests = (req, res) => {
  OrderRequest.find({ isApproved: false })
    .populate("siteManager")
    .populate("supplier")
    .exec(function (err, data) {
      if (err) res.status(500).json({ error: err });
      res.status(200).json(data);
    });
};

export {
  createOrderRequest,
  ordersToApprove,
  approvedRequests,
  declinedRequests,
};
