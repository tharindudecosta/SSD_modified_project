import express from "express";
import {
  approvedRequests,
  approveRequest,
  createOrderRequest,
  declinedRequests,
  declineRequest,
  ordersToApprove,
} from "../controllers/index.js";
import {verifyJWT} from "../utils/verifyJWT.js"
const router = express.Router();

router.route("/approve/:orderRequestId").post(verifyJWT,approveRequest);
router.route("/decline/:orderRequestId").post(verifyJWT,declineRequest);
router.route("/").post(verifyJWT,createOrderRequest);
router.route("/pending").get(verifyJWT,ordersToApprove);
router.route("/approved").get(verifyJWT,approvedRequests);
router.route("/declined").get(verifyJWT,declinedRequests);

export default router;
