import express from "express";
import {
  createContructionSite,
  getContructionSites,
  updateContructionSite,
  deleteContructionSite,
} from "../controllers/index.js";
import {verifyJWT} from "../utils/verifyJWT.js"
const router = express.Router();

router.route("/").post(verifyJWT,createContructionSite).get(getContructionSites);
router.route("/update").patch(verifyJWT,updateContructionSite);
router.route("/delete/:id").delete(verifyJWT,deleteContructionSite);

export default router;
