import express from "express";
import {
  approveDeliveryAdviceRequest,
  createDeliveryAdvice,
  declineRequest,
  getApprovedDeliveryAdvices,
  getDeliveryAdvicesDrafts,
  getDeliveryAdvicesToBeApproved,
} from "../controllers/index.js";
import {verifyJWT} from "../utils/verifyJWT.js"
const router = express.Router();

router.route("/").post(verifyJWT,createDeliveryAdvice);
router.route("/pending").get(verifyJWT,getDeliveryAdvicesToBeApproved);
router.route("/drafts").get(verifyJWT,getDeliveryAdvicesDrafts);
router.route("/approved").get(verifyJWT,getApprovedDeliveryAdvices);
router.route("/approve/:deliveryAdviceId").post(verifyJWT,approveDeliveryAdviceRequest);
router.route("/decline/:deliveryAdviceId").post(verifyJWT,declineRequest);

export default router;
