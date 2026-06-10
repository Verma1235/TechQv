import express from "express";
import { handelLogin, handelSignup } from "./auth.controller.js";
import { LoginMiddleware, signupMiddleware } from "./auth.middleware.js";
import passport from "passport";

// create routes
const router = express.Router();

// manual login
router.post("/login", LoginMiddleware, handelLogin);
// manual signup
router.post("/signup", signupMiddleware, handelSignup);
// open authorization from external OAUTH
// google OAUTH
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: "/login",
    }),
    (req, res) => {
        return res.status(200).json({
            success: true,
            message: "Google login successful",
            token: req.user.token,
            user: req.user.user,
        });
    }
);


export default router;