import db from "../../config/mysql.js";
import jwt from "jsonwebtoken";
// inser user 
export const createUser = (name, email, hashPass) => {
    const sql =
        "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)";
    return new Promise((resolve, reject) => {
        db.query(sql, [name, email, hashPass], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

// assign role
export const assignRole = (userId, roleId = 2) => {
    const sql = "INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)";

    return new Promise((resolve, reject) => {
        db.query(sql, [userId, roleId], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};


// initially create settings 
export const createSetting = (user_id) => {
    const sql = "INSERT INTO  settings (user_id) VALUES (?)";

    return new Promise((resolve, reject) => {
        db.query(sql, [user_id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

//  get user data
export const getUserData = (email) => {
    const sql = "SELECT u.id as user_id, u.password_hash as hashPassword , r.name as user_role FROM `users` u INNER JOIN `user_roles` ur ON  ur.user_id =u.id INNER JOIN `roles` r ON ur.role_id =r.id WHERE email = ? ";
    return new Promise((resolve, reject) => {
        db.query(sql, [email], (err, result) => {
            if (err) return reject(err);
            console.log(result[0]);
            resolve(result[0] || 'null');
        })
    });
}

// generate Token with header data 

export const generateToken = (user_id, user_email, user_role, rememberme) => {
    return new Promise((resolve, reject) => {
        try {
            const token = jwt.sign(
                {
                    user_id, user_email, user_role
                },
                process.env.JWT_SECRET,
                { expiresIn: rememberme ? "30d" : "1d" }
            );

            resolve(token);

        } catch (err) {
            reject(err);
        }

    });

}