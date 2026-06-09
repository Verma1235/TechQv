import express from "express";
import cors from "cors";
import { AppInstance } from "./routes/routescControllers.js";
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// pass app istance to handel middleware as well as routes
AppInstance(app);

export default app;