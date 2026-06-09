import db from "../../config/mysql.js";
import * as profileRepo from "./profile.repositories.js";


// this function used to get information of profiles if profile created !! otherwise return message
export const getProfileService = async (user_id) => {
    try {
        const isProfileExist = await profileRepo.isProfileRegister(user_id);
        console.log("profile exist", isProfileExist);
        if (!isProfileExist) return {
            success: false,
            message: "Profile not Created !! First of all create your Profile",
        }
        if (isProfileExist == true) {
            const data = await profileRepo.getProfileInfo(user_id);
            return {
                success: true,
                message: "Profile data fetched successfully !! ",
                data
            }
        }
        return {
            success: false,
            message: "first create your profile !!",
        }

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Enternal error occurs",
            error
        }
    }
}

// this function used to check first profile either created or not , if not then it creates  
export const createProfileService = async (user_id) => {

    try {
        const isProfileExist = await profileRepo.isProfileRegister(user_id);
        // console.log("profile exist", isProfileExist);
        if (isProfileExist) return {
            success: false,
            message: "Your Profile already Created !!",
        }
        if (!isProfileExist) {
            const data = await profileRepo.createProfile(user_id);
            if (data) {
                return {
                    success: true,
                    message: "Profile Created successfully !!"
                }
            } else {
                return {
                    success: false,
                    message: "Profile creation error"
                }
            }
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Enternal error occurs",
            error
        }
    }

}