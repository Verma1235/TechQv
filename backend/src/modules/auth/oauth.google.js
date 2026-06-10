import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import oauthService from "./oauth.service.js";

console.log(process.env.GOOGLE_CLIENT_ID);
console.log(process.env.GOOGLE_CALLBACK_URL);

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
        },

        async (accessToken, refreshToken, profile, done) => {

            try {

                const result = await oauthService.googleLogin(profile);

                console.log("AUTHService res:", result);

                return done(
                    null,
                    result
                );

            } catch (error) {

                return done(
                    error,
                    null
                );
            }
        }
    )
);