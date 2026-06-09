import express from "express";
import { handelLogin, handelSignup } from "./auth.controller.js";
import { LoginMiddleware, signupMiddleware } from "./auth.middleware.js";

// create routes
const router = express.Router();

// manual login
router.post("/login", LoginMiddleware, handelLogin);
// manual signup
router.post("/signup", signupMiddleware, handelSignup);



export default router;