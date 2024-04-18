const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(express.json());

app.use(cors());

const server = app.listen(port, () => {
  console.log(`Server running in port: ${port}`);
});

const ServerSI = new Server(server, {
  cors: {
    origin: "*",
  },
});

ServerSI.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("newUser", (message) => {
    // const datos = JSON.stringify(message);
    // console.log("Nuevos datos registrados: "+datos);
    ServerSI.emit("newUser", message);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});