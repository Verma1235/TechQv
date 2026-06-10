import { createUser, findUserByEmail, assignRole, createSetting, getUserAuthData } from "./auth.repositories.js";
import { findOAuthAccount, createOAuthAccount } from "./oauth.repository.js";
import { generateToken } from "../../utils/token.js";

class OAuthService {

    async googleLogin(profile) {
        // console.log("PROFILE:", profile);
        const email = profile.emails?.[0]?.value;
        const name = profile.displayName;
        const providerUserId = profile.id;
        // Already linked Google account
        const oauthAccount = await findOAuthAccount("google", providerUserId);
        console.log("findOauth Account: ", oauthAccount);
        if (oauthAccount) {
            const user = await getUserAuthData(oauthAccount.user_id);
            return { user, token: generateToken(user) };
        }
        console.log(email, name, providerUserId);

        // Existing normal account
        let user = await findUserByEmail(email);

        console.log(user);

        let userRes;
        let userID;

        if (!user) {
            userRes = await createUser(name, email, null, true);
            userID = userRes.insertId;

            await Promise.all([
                assignRole(userRes.insertId),
                createSetting(userRes.insertId)
            ]);

        } else {

            userID = user.id;
        }

        await createOAuthAccount(userID, "google", providerUserId);

        const authUser = await getUserAuthData(userID);

        return {
            user: authUser,
            token:
                generateToken(authUser)
        };
    }
}

export default new OAuthService();