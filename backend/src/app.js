import express from "express";
import helmet from "helmet";
import cors from "cors";
import passport from "passport";

import { AppInstance } from "./routes/routescControllers.js";
import "./modules/auth/oauth.google.js";

const app = express();
// Security
app.use(helmet());
// CORS
app.use(cors());
// Body Parser
app.use(express.json());
// Passport
app.use(passport.initialize());
// Routes
AppInstance(app);

export default app;