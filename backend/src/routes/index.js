import express from "express";
import supplierRoutes from "./supplierRoutes.js";
import contructionSiteRoutes from "./contructionSiteRoutes.js";
import siteManagerRoutes from "./siteManagerRoutes.js";
import managerRoutes from "./managerRoutes.js";
import orderRequestRoutes from "./orderRequestRoutes.js";
import deliveryAdviceRoutes from "./deliveryAdviceRoutes.js";
import administratorRoutes from "./adminRoutes.js";

const router = express.Router();

router.use("/supplier", supplierRoutes);
router.use("/contructionSites", contructionSiteRoutes);
router.use("/sitemanagers", siteManagerRoutes);
router.use("/managers", managerRoutes);
router.use("/orderrequests", orderRequestRoutes);
router.use("/deliveryadvice", deliveryAdviceRoutes);
router.use("/admin", administratorRoutes);

export default router;
