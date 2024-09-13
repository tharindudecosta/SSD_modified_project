import express from "express";
import {
  approveQuotations,
  createManager,
  getManagers,
  getUnApprovedProducts,
  loginManager,
  deleteManager,
  updateManager,
} from "../controllers/index.js";

const router = express.Router();

router.route("/").post(createManager).get(getManagers);
router.route("/login").post(loginManager);
router.route("/products").get(getUnApprovedProducts);
router.route("/products/:productId").post(approveQuotations);
router.route("/delete/:customId").delete(deleteManager);
router.route("/update").patch(updateManager);


export default router;
