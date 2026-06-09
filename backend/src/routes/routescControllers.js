import authRoutes from "../modules/auth/auth.routes.js";

export const AppInstance = (app) => {
    // auth Routes
    app.use("/auth", authRoutes);


}
