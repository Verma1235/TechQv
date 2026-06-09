import express from "express";
import { profileMiddleware } from "./profile.middleware.js";
import * as P from "./profile.controller.js";
const router = express.Router();


router.use(profileMiddleware);
router.get("/create", P.createProfile);
router.get("/delete", P.deleteProfile);
router.post("/update", P.updateProfile);
router.get("/get", P.getProfile);




export default router;


