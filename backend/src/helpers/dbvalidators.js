import db from "../config/mysql.js";


// this function check either any user alreadyt exist or not 
export const isUserRegistered = async (
    VALUE,
    COLM = "email",
    TABLENAME = "users"
) => {
    try {
        const sql = `SELECT ${COLM} FROM ${TABLENAME} WHERE ${COLM} = ?`;
        const [result] = await db.promise().query(sql, [VALUE]);
        if (result.length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return 2;
    }
};



// function ensure that database either connected or not
export const isDBconnected = async () => {
    try {
        const connection = await db.promise().getConnection();
        await connection.ping();
        connection.release();
        return true;
    } catch (err) {
        console.error("DB connection error:", err);
        return false;
    }
};