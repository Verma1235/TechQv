import db from "../../config/mysql.js";
import jwt from "jsonwebtoken";

// Function used to check header and verify token either valid or not and return header data
export const verifyHeader = (authHeader = "") => {
    return new Promise((resolve, reject) => {
        console.log("Header: ", authHeader);
        try {
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                reject({
                    success: false,
                    message: "No Token Found",
                    data: null
                });
            }
            // extract token
            const token = authHeader.split(" ")[1];
            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            resolve({
                success: true,
                message: "Token Verified",
                data: {
                    user_id: decoded?.user_id,
                    user_email: decoded?.user_email,
                    user_role: decoded?.user_role
                }
            });

        } catch (error) {
            reject({
                success: false,
                message: "Unable to verify token due to some technical internal server errors.",
            });

        }

    });

}

// check profile exist or not 
export const isProfileRegister = async (user_id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT COUNT(*) AS total FROM profiles WHERE user_id=?";

        db.query(sql, [user_id], (err, result) => {
            if (err) {
                return reject(err);
            }

            resolve(result[0].total > 0);
        });
    });
};


// GET FULL PROFILE INFORMATION 

export const getProfileInfo = (user_id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `
    SELECT
        u.id AS user_id,
        u.name AS user_name,
        s.status AS user_status,
        s.account_status,
        p.id AS profile_id,
        p.location AS user_location,
        p.avatar_url AS profile_img,
        p.gender AS user_gender,
        p.date_of_birth AS user_dob,
        p.about_user AS user_info,
        p.phone AS user_phone,
        p.created_at AS profile_created,
        p.updated_at AS profile_updated
    FROM users u
    INNER JOIN settings s 
        ON s.user_id=u.id     
    LEFT JOIN profiles p
        ON u.id = p.user_id
    WHERE u.id = ?`;
            db.query(sql, [user_id], (err, result) => {
                if (err) reject(err);

                resolve(result[0]);
            })

        } catch (error) {
            console.log(error);
            reject(error);

        }
    })

}



// create new Profile
export const createProfile = (user_id) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO `profiles` (user_id) VALUES (?)";

        db.query(sql, [user_id], (err) => {
            if (err) {
                return reject(err);
            }

            resolve(true);
        });
    });
};