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

const router = express.Router();

router.route("/").post(createSupplier).get(getSupplier);
router.route("/login").post(loginSupplier);
router.route("/orders/placed/:supplierId").get(placedOrders);
router.route("/products/:supplierId").post(addProductsToSupplier);
router.route("/quotation/:productId").put(placeSupplierQuotation);

router.route("/:supplierId").get(getSupplierById);

export default router;
