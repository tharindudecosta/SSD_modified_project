import express from "express";
import {
  createSiteManager,
  getSiteMangers,
  loginSiteManager,
  deleteSiteManager,
  updateSiteManager
} from "../controllers/index.js";

const router = express.Router();

router.route("/").post(createSiteManager).get(getSiteMangers);
router.route("/login").post(loginSiteManager);
router.route("/delete/:id").delete(deleteSiteManager)
router.route("/update").patch(updateSiteManager)

export default router;
