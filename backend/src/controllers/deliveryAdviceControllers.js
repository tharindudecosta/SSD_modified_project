import DeliveryAdvice from "../models/deliveryAdvice.js";

// const logger = require('winston');
import logger from '../utils/logger.js'; 

const createDeliveryAdvice = (req, res) => {
  const { order } = req.body;

  const deliveryAdvice = new DeliveryAdvice({
    order,
  });

  DeliveryAdvice.create(deliveryAdvice, (err, data) => {
    if (err) res.status(500).json({ error: err });
    res.status(201).json(data);
  });
};

const approveDeliveryAdviceRequest = (req, res) => {
  const { deliveryAdviceId } = req.params;

  DeliveryAdvice.findById(deliveryAdviceId, (err, data) => {
    if (err) {
      res.status(500).json({ error: err });
    }

    data.isApproved = true;

    data.save(function (err) {
      if (err) {
        logger.error('Error approving delivery request:', err);
        return res.status(500).json({ error: 'Internal server error occurred while approving delivery request.' });
      }
      res.json({ status: "Delivery Advice Request Approved successfully!" });
    });
  });
};

const saveDeliveryAdviceAsDraft = (req, res) => {
  const { deliveryAdviceId } = req.params;

  DeliveryAdvice.findById(orderRequestId, (err, data) => {
    if (err) {
      res.status(500).json({ error: err });
    }

    data.isApproved = false;

    data.save(function (err) {
      if (err) {
        logger.error('Error saving draft:', err);
        return res.status(500).json({ error: 'Internal server error occurred while saving draft.' });
      }
      res.json({ status: "Order Request Approved successfully!" });
    });
  });
};

const getDeliveryAdvicesToBeApproved = (req, res) => {
  DeliveryAdvice.find({ isApproved: { $exists: false } })
    .populate("order")
    .exec(function (err, data) {
      console.log(data);
      if (err) res.status(500).json({ error: err });
      res.status(200).json(data);
    });
};

const getDeliveryAdvicesDrafts = (req, res) => {
  DeliveryAdvice.find({ isApproved: false })
    .populate("order")
    .exec(function (err, data) {
      console.log(data);
      if (err) res.status(500).json({ error: err });
      res.status(200).json(data);
    });
};

const getApprovedDeliveryAdvices = (req, res) => {
  DeliveryAdvice.find({ isApproved: true })
    .populate("order")
    .exec(function (err, data) {
      if (err) res.status(500).json({ error: err });
      res.status(200).json(data);
    });
};

export {
  createDeliveryAdvice,
  getDeliveryAdvicesToBeApproved,
  approveDeliveryAdviceRequest,
  saveDeliveryAdviceAsDraft,
  getDeliveryAdvicesDrafts,
  getApprovedDeliveryAdvices,
};
