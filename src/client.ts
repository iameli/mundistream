import EE from "wolfy87-eventemitter";
import WebSocketAsPromised from "websocket-as-promised";

export default class Client extends EE {
  constructor() {
    super();
    this.emit("log", "created");
    this.retrying = false;
    this.retry();
  }

  retry() {
    if (this.retrying === true) {
      console.log("not retrying one");
      return;
    }
    this.retrying = true;
    this.emit("log", "retrying");
    this.connect()
      .then(() => {
        this.retrying = false;
      })
      .catch((err) => {
        this.emit("log", `connect failed, retrying in 1s: ${err.message}`);
        setTimeout(() => {
          this.retrying = false;
          this.retry();
        }, 1000);
      });
  }

  async connect() {
    console.log("hi");
    const url = new URL("http://10.9.168.90:1730");
    url.protocol = "ws:";
    url.port = "8080";
    this.client = new WebSocketAsPromised(url.toString(), {});
    this.client.onError.addListener((err) => {
      this.emit("log", `ws error: ${err}`);
      this.retry();
    });
    this.client.onClose.addListener(() => {
      this.emit("log", "ws closed");
      this.retry();
    });
    this.emit("log", "opening websocket");
    await this.client.open();
    this.emit("log", "sending message");
    this.client.send(JSON.stringify({ type: "hello" }));
    this.client.onMessage.addListener((foo) => {
      this.emit("log", `reply: ${JSON.stringify(foo)} ${Date.now()}`);
    });
    // await wsp.close();
  }

  async send(msg) {
    try {
      this.client.send(JSON.stringify(msg));
    } catch (e) {
      this.emit("log", `error sending: ${e}`);
    }
  }
}
