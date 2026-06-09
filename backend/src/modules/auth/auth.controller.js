import { loginService, signupService } from "./auth.service.js";
// #################################################################################
// handel manual login 
export const handelLogin = async (req, res) => {
    try {
        const { email, password, rememberme } = req.body;
        const data = await loginService(email, password, rememberme);

        return res.status(201).send({
            success: data?.success || false,
            message: data?.message || "Error occurs",
            token: data?.token,
        });

    } catch (error) {
        console.log("Error at src/modules/auth/auth.controller --> handelLogin :", error);

        res.status(500).send({
            success: false,
            message: "Error occurs during processing your request"
        })

    }
}


// #################################################################################
//  Handel manual signup 
export const handelSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userId = await signupService(name, email, password);

        return res.status(201).send({
            success: true,
            message: "Signup successfully",
            id: userId,
        });

    } catch (error) {
        console.log("Error at src/modules/auth/auth.controller :", error);

        res.status(500).send({
            success: false,
            message: "Error occurs during processing your request"
        })

    }
}