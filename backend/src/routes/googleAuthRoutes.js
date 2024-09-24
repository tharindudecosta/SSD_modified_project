import express from "express";
import {
    loginGoogleAuth
} from "../controllers/index.js";
const router = express.Router();

router.route("/auth").post(loginGoogleAuth);

export default router;
