import http from "http";
import app from "./src/app.js";
import { initializeSocket } from "./src/config/socket.js";
import dotenv from "dotenv";
dotenv.config();
const server = http.createServer(app);

initializeSocket(server);

server.listen(process.env.PORT, () => {
    console.log(`server run at http://localhost:${process.env.PORT}`);

})