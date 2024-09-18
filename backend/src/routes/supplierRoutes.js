import express from "express";
import {
  addProductsToSupplier,
  createSupplier,
  getSupplier,
  getSupplierById,
  loginSupplier,
  placedOrders,
  placeSupplierQuotation,
} from "../controllers/index.js";
import {verifyJWT} from "../utils/verifyJWT.js"

const router = express.Router();

router.route("/").post(verifyJWT,createSupplier).get(getSupplier);
router.route("/login").post(loginSupplier);
router.route("/orders/placed/:supplierId").get(verifyJWT,placedOrders);
router.route("/products/:supplierId").post(verifyJWT,addProductsToSupplier);
router.route("/quotation/:productId").put(verifyJWT,placeSupplierQuotation);

router.route("/:supplierId").get(getSupplierById);

export default router;
