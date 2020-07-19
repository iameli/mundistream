#!/usr/bin/env node
import { server as WebSocketServer, IServerConfig, IMessage } from "websocket";
import * as http from "http";
import { AddressInfo } from "net";
import EE from "wolfy87-eventemitter";

console.log(EE);

export default class Server extends EE {
  connected: number;
  constructor() {
    super();
    this.connected = 0;
    const server = http.createServer(function (request, response) {
      const url = request.url ?? "url not found";
      console.log(`${Date.now()} Received request for ${url}`);
      response.writeHead(404);
      response.end();
    });
    server.listen(8080, function () {
      const info = <AddressInfo>server.address();
      console.log(`${new Date().toString()} is listening on ${info.port}`);
    });

    const wsServer = new WebSocketServer({
      httpServer: server,
      autoAcceptConnections: false,
    });

    wsServer.on("request", (request) => {
      const connection = request.accept("", request.origin);
      const id = this.connected;
      this.connected += 1;
      console.log(`client ${id} connected`);

      connection.on("message", (message) => {
        console.log("message");
        if (message.type === "utf8") {
          const data = message.utf8Data ?? "";
          console.log("Received Message: " + data);
          const obj = JSON.parse(data);
          this.emit("message", obj);
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
