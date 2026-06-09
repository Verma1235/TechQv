import { verifyHeader } from "./profile.repositories.js";

export const profileMiddleware = async (req, res, next) => {

    try {
        const authHeader = req.headers.authorization;
        const authRes = await verifyHeader(authHeader);

        if (authRes?.success == false) {
            return res.send({
                success: false,
                message: authRes?.message || "Unable to verify you, so you have no permission to complete this task.",
            });
        }
        if (authRes?.success == true) {

            req.user = authRes?.data;
            next();

        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
            error
        })
    }

}

