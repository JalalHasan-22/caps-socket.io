"use strict";

const io = require("socket.io-client");
const host = "http://localhost:3000";
const caps = io.connect(host);
caps.on("pickup", (payload) => {
  console.log(`DRIVER: Picked up ${payload.orderId}`);
  setTimeout(() => {
    console.log("DRIVER : The Order is in Transit");
    caps.emit("in-transit", payload);
  }, 1000);
  setTimeout(() => {
    caps.emit("delivered", payload);
    console.log(`DRIVER: delivered up ${payload.orderId}`);
  }, 2000);
});
