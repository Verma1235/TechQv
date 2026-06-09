import authRoutes from "../modules/auth/auth.routes.js";
import profilesRoutes from "../modules/profiles/profile.routes.js";
export const AppInstance = (app) => {
    // auth Routes
    app.use("/auth", authRoutes);
    // profiles routes
    app.use("/profile", profilesRoutes);


}
