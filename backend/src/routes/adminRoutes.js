import express from "express";
import {
  createAdministrator,
  loginAdministrator,
} from "../controllers/index.js";

const router = express.Router();

router.route("/").post(createAdministrator);
router.route("/login").post(loginAdministrator);

export default router;
