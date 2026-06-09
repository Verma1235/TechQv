import { isBodyEmpty, validateEmail, validatePassword, validateName } from "../../helpers/validators.js";
import { isUserRegistered, isDBconnected } from "../../helpers/dbvalidators.js";

// ###############################################################################################
//  Handel login middleware 
export const LoginMiddleware =async (req, res, next) => {
    try {
        if (isBodyEmpty(req)) {
            return res.status(400).send({
                success: false,
                message: "All required fields must be provided.",
            });
        }
        const { email, password, rememberme } = req.body;

        if (!validateEmail(email)) {
            return res.status(400).send({
                success: false,
                message: "Please provide a valid email address.",
            });
        }
        if (!validatePassword(password)) {
            return res.status(400).send({
                success: false,
                message:
                    "Password is not Valid !! Enter correct password.",
            });
        }

        if (!isDBconnected()) {
            return res.status(500).send({
                success: false,
                message: "signup not possible yet !! database not connected !!"
            })
        }

        const UserRegisteredStatus = await isUserRegistered(email);

        if (UserRegisteredStatus == 2) {
            return res.send({
                success: false,
                message: "Database error !!",
            });
        }

        if (UserRegisteredStatus == false) {
            return res.send({
                success: false,
                message: "This Email id is not registered !!",
            });
        }

        next();
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "An unexpected error occurred while validating the request.",
        });
    }

}



// ###############################################################################################
//  Handel Signup middleware 
export const signupMiddleware = async (req, res, next) => {
    try {
        if (isBodyEmpty(req)) {
            return res.status(400).send({
                success: false,
                message: "All required fields must be provided.",
            });
        }

        const { name, email, password } = req.body;

        if (!validateEmail(email)) {
            return res.status(400).send({
                success: false,
                message: "Please provide a valid email address.",
            });
        }

        if (!validatePassword(password)) {
            return res.status(400).send({
                success: false,
                message:
                    "Password must be at least 6 characters long and include letters, numbers, and a special character.",
            });
        }

        if (!validateName(name)) {
            return res.status(400).send({
                success: false,
                message: "Please provide a valid name.",
            });
        }
        if (!isDBconnected()) {
            return res.status(500).send({
                success: false,
                message: "signup not possible yet !! database not connected !!"
            })

        }

        const UserRegisteredStatus = await isUserRegistered(email);

        if (UserRegisteredStatus == 2) {
            return res.send({
                success: false,
                message: "Database error !!",
            });
        }

        if (UserRegisteredStatus == true) {
            return res.send({
                success: false,
                message: "This Email id already registered !!",
            });
        }

        next();

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "An unexpected error occurred while validating the request.",
        });
    }
}