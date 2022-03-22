"use strict";

require("dotenv").config;
const port = process.env.PORT;
const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");
const hub = require("../caps");

describe("testing the socket connection", () => {
  let io, serverSocket, clientSocket, consoleSpy;
  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
    consoleSpy.mockRestore();
  });

  it("testing the connection", async () => {
    clientSocket.on("connection", async (soket) => {
      await consoleSpy();
      expect(consoleSpy).toHaveBeenCalled();
    });
  });

  it("testing the pickup", async () => {
    clientSocket.on("connection", async (soket) => {
      socket.emit("pickup", (payload) => {
        pickup(payload);
        io.emit("pickup", payload);
      });
      await consoleSpy();
      expect(pickup).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalled();
    });
  });

  it("testing in transit", async () => {
    serverSocket.on("in-transit", async (payload) => {
      inTransit(payload);
      await consoleSpy();
      expect(consoleSpy).toHaveBeenCalled();
      expect(inTransit).toHaveBeenCalled();
    });
  });

  it("testing delivered", async () => {
    serverSocket.on("delivered", async (payload) => {
      delivered(payload);
      serverSocket.emit("delivered", payload);
      await consoleSpy();
      expect(consoleSpy).toHaveBeenCalled();
      expect(delivered).toHaveBeenCalled();
    });
  });
});
