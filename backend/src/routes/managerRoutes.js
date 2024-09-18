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
import {verifyJWT} from "../utils/verifyJWT.js"

const router = express.Router();

router.route("/").post(verifyJWT,createManager).get(getManagers);
router.route("/login").post(loginManager);
router.route("/products").get(verifyJWT,getUnApprovedProducts);
router.route("/products/:productId").post(verifyJWT,approveQuotations);
router.route("/delete/:customId").delete(verifyJWT,deleteManager);
router.route("/update").patch(verifyJWT,updateManager);


export default router;
