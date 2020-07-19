// import * as test from "websocket";

import ReactDOM from "react-dom";
import React from "react";
import App from "./client/app";

console.log(React);
window.React = React;

ReactDOM.render(<App />, document.querySelector("main"));

import WebSocketAsPromised from "websocket-as-promised";
(async () => {
  try {
    console.log("hi");
    const url = new URL(document.location.href);
    url.protocol = "ws:";
    url.port = "8080";
    const wsp = new WebSocketAsPromised(url.toString(), {});
    wsp.onError.addListener((err) => alert(err.message));
    await wsp.open();
    wsp.send("message");
    wsp.onMessage.addListener((foo) => console.log(`replyy: ${foo}`));
    // await wsp.close();
  } catch (e) {
    alert(e.message);
  }

  // console.log(test);
})();
// var client = new WebSocketClient();

// client.on("connectFailed", function (error) {
//   console.log("Connect Error: " + error.toString());
// });

// client.on("connect", function (connection) {
//   console.log("WebSocket Client Connected");
//   connection.on("error", function (error) {
//     console.log("Connection Error: " + error.toString());
//   });
//   connection.on("close", function () {
//     console.log("echo-protocol Connection Closed");
//   });
//   connection.on("message", function (message) {
//     if (message.type === "utf8") {
//       console.log("Received: '" + message.utf8Data + "'");
//     }
//   });

//   function sendNumber() {
//     if (connection.connected) {
//       console.log("hi");
//       var number = Math.round(Math.random() * 0xffffff);
//       connection.sendUTF(number.toString());
//     }
//     setTimeout(sendNumber, 1000);
//   }
//   sendNumber();
// });

// client.connect("ws://localhost:8080/", "echo-protocol");
