import express from "express";
import {
  createAdministrator,
  loginAdministrator,
} from "../controllers/index.js";
import {verifyJWT} from "../utils/verifyJWT.js"

const router = express.Router();

router.route("/").post(verifyJWT,createAdministrator);
router.route("/login").post(loginAdministrator);

export default router;
