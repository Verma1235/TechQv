import db from "../../config/mysql.js";

const sql = db.promise();
export const findOAuthAccount = async (provider, providerUserId) => {
    const [rows] = await sql.query(
        `
        SELECT *
        FROM oauthaccounts
        WHERE provider = ?
        AND provider_user_id = ?
        LIMIT 1
        `,
        [provider, providerUserId]
    );
    return rows[0] || null;
};



export const createOAuthAccount = async (
    userId,
    provider,
    providerUserId
) => {
    await sql.query(
        `
        INSERT INTO oauthaccounts
        (user_id,provider,provider_user_id)
         VALUES (?, ?, ?)
        `,
        [
            userId,
            provider,
            providerUserId
        ]
    );
};