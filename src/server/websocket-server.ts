#!/usr/bin/env node
import { server as WebSocketServer } from "websocket";
import * as http from "http";
import { AddressInfo } from "net";
const EE = require("events");

export default class Server extends EE {
  constructor() {
    super();
    this.connected = 0;
    var server = http.createServer(function (request, response) {
      console.log(new Date() + " Received request for " + request.url);
      response.writeHead(404);
      response.end();
    });
    server.listen(8080, function () {
      const info = <AddressInfo>server.address();
      console.log(new Date() + " Server is listening on " + info.port);
    });

    const wsServer = new WebSocketServer({
      httpServer: server,
      autoAcceptConnections: false,
    });

    wsServer.on("request", (request) => {
      var connection = request.accept("", request.origin);
      const id = this.connected;
      this.connected += 1;
      console.log(`client ${id} connected`);

      connection.on("message", function (message) {
        console.log("message");
        if (message.type === "utf8") {
          console.log("Received Message: " + message.utf8Data);
          connection.sendUTF(message.utf8Data);
        } else if (message.type === "binary") {
          console.log(
            "Received Binary Message of " + message.binaryData.length + " bytes"
          );
          connection.sendBytes(message.binaryData);
        }
      });
      connection.on("close", function (reasonCode, description) {
        console.log(`client ${id} disconnected`);
        console.log("close");
        console.log(
          new Date() + " Peer " + connection.remoteAddress + " disconnected."
        );
      });
    });
  }
}
