import express from "express";
import {
  approveDeliveryAdviceRequest,
  createDeliveryAdvice,
  declineRequest,
  getApprovedDeliveryAdvices,
  getDeliveryAdvicesDrafts,
  getDeliveryAdvicesToBeApproved,
} from "../controllers/index.js";

const router = express.Router();

router.route("/").post(createDeliveryAdvice);
router.route("/pending").get(getDeliveryAdvicesToBeApproved);
router.route("/drafts").get(getDeliveryAdvicesDrafts);
router.route("/approved").get(getApprovedDeliveryAdvices);
router.route("/approve/:deliveryAdviceId").post(approveDeliveryAdviceRequest);
router.route("/decline/:deliveryAdviceId").post(declineRequest);

export default router;
