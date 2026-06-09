import { Server } from "socket.io";

let io = null;
export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*"
        }
    });
    io.on("connection", (socket) => {
        console.log(socket.id);
    });
    return io;
}

export const getIO = () => io;


// import { getIO } from "../config/socket.js";

// const io = getIO();

// io.emit("notification", {
//   title: "Project Created"
// });