import { getProfileService, createProfileService } from "./profile.service.js";

// ######################## CREATE NEW PROFILE #############################
export const createProfile = async (req, res) => {
    try {
        const { user_id, user_email, user_role } = req.user;

        const data = await createProfileService(user_id);

        res.send({
            success: data?.success || false,
            message: data?.message || "Access Deied or Internal Error !! ",
            data: data?.data,
            error:data?.error
        });


    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error occurs in profile section",
            error
        })
    }


}



// ######################## DELETE PROFILE #############################
export const deleteProfile = async (req, res) => {

}



// ######################## UPDATE PROFILE #############################
export const updateProfile = async (req, res) => {

}




// ######################## GET INFO OF PROFILE #############################
export const getProfile = async (req, res) => {
    try {
        const { user_id, user_email, user_role } = req.user;

        const data = await getProfileService(user_id);

        res.send({
            success: data?.success || false,
            message: data?.message || "Access Deied or Internal Error !! ",
            data: data?.data,
        });


    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error occurs in profile section",
            error
        })
    }



}


// req.parmas.id 