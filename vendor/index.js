"use strict";

require("dotenv").config();
const PORT = process.env.PORT || 3000;
const io = require("socket.io-client");
const host = `http://localhost:${PORT}`;
const caps = io.connect(host);
const { faker } = require("@faker-js/faker");

setInterval(() => {
  let payload = {
    store: faker.company.companyName(),
    orderId: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: faker.address.streetAddress(),
  };
  caps.emit("pickup", payload);
  setTimeout(() => {
    console.log("VENDOR: Thank you for delivering", payload.orderId);
  }, 2000);
}, 5000);
