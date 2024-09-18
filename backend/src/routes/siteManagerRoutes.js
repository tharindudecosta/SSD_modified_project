import express from "express";
import {
  createSiteManager,
  getSiteMangers,
  loginSiteManager,
  deleteSiteManager,
  updateSiteManager
} from "../controllers/index.js";
import {verifyJWT} from "../utils/verifyJWT.js"

const router = express.Router();

router.route("/").post(verifyJWT,createSiteManager).get(getSiteMangers);
router.route("/login").post(loginSiteManager);
router.route("/delete/:id").delete(verifyJWT,deleteSiteManager)
router.route("/update").patch(verifyJWT,updateSiteManager)

export default router;
