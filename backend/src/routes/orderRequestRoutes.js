import express from "express";
import {
  approvedRequests,
  approveRequest,
  createOrderRequest,
  declinedRequests,
  declineRequest,
  ordersToApprove,
} from "../controllers/index.js";

const router = express.Router();

router.route("/approve/:orderRequestId").post(approveRequest);
router.route("/decline/:orderRequestId").post(declineRequest);
router.route("/").post(createOrderRequest);
router.route("/pending").get(ordersToApprove);
router.route("/approved").get(approvedRequests);
router.route("/declined").get(declinedRequests);

export default router;
