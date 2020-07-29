import WS from "./server/websocket-server";
import HH from "./server/harmony-hub";
import wol from "./server/wake-on-lan";

const ws = new WS();
const hh = new HH();
ws.on("message", ({ message, connection }) => {
  if (message.type === "IRCommand") {
    hh.command(message);
  } else if (message.type === "WOL") {
    wol(message)
      .then(() => {
        connection.sendUTF(`woke ${message.mac}`);
      })
      .catch((err) => {
        connection.sendUTF(`error waking ${message.mac}: ${err.message}`);
      });
  }
});
