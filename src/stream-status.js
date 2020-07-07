import OBSWebSocket from "obs-websocket-js";
const obs = new OBSWebSocket();

let connected = false;

obs.on("ConnectionOpened", () => {
  console.log("opened");
});

obs.on("ConnectionClosed", () => {
  console.log("closed");
  connected = false;
});

const tick = async () => {
  try {
    if (!connected) {
      console.log("connecting");
      await obs.connect({
        address: "10.9.168.63:4444",
        password: "lkyrti",
      });
      connected = true;
    }
    const status = await obs.send("GetStreamingStatus");
    console.log(JSON.stringify(status, null, 2));
    setTimeout(tick, 1000);
  } catch (err) {
    console.log(err);
    setTimeout(tick, 1000);
  }
};

tick();
