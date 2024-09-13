import express from "express";
import {
  createContructionSite,
  getContructionSites,
  updateContructionSite,
  deleteContructionSite,
} from "../controllers/index.js";

const router = express.Router();

router.route("/").post(createContructionSite).get(getContructionSites);
router.route("/update").patch(updateContructionSite);
router.route("/delete/:id").delete(deleteContructionSite);

export default router;
