import bcrypt from "bcryptjs";
import * as authRepo from "./auth.repositories.js";

// ################# SIGNUP SERVICES #########################
export const signupService = async (name, email, password) => {
    // password hashing 
    const hashPass = await bcrypt.hash(password, 10);
    // creating user in database
    const result = await authRepo.createUser(name, email, hashPass);
    if (!result.insertId) {
        throw new Error("User creation failed");
    }
    // assign initial role of users
    await authRepo.assignRole(result.insertId, 2);
    //assign settings initially
    await authRepo.createSetting(result.insertId);

    // return user created id;
    return result.insertId;
}

// ################# LOGIN SERVICES #########################
export const loginService = async (email, password, rememberme) => {
    const data = await authRepo.getUserData(email);

    if (data?.hashPassword == 'null') return { success: false, message: "password verification error" };

    const isMatch = await bcrypt.compare(password, data?.hashPassword);

    if (!isMatch) {
        return {
            success: false,
            message: "Invalid Password or email !! Enter Correct crediential."
        }
    }

    if (isMatch) {
        const token = await authRepo.generateToken(data?.user_id, email, data?.user_role, data?.user_name, rememberme);
        return {
            success: true,
            message: "Login successfully",
            token
        }
    }

}