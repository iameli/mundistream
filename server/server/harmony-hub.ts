import { getHarmonyClient, HarmonyClient } from "@harmonyhub/client-ws";
import { Explorer, HubData } from "@harmonyhub/discover";
const EE = require("wolfy87-eventemitter");

export default class HarmonyHub extends EE {
  constructor() {
    super();

    this.hubConnections = new Map<string, HarmonyClient>();
    this.run()
      .then()
      .catch((e) => console.log(e));
  }
  async run(): Promise<void> {
    const explorer = new Explorer();

    explorer.on(Explorer.Events.ONLINE, (data: HubData) => {
      console.log("reachable ", data.fullHubInfo);

      this.connectToHub(data);
    });

    explorer.on(Explorer.Events.UPDATE, (data: Array<HubData>) => {
      console.log("update ", data);
    });

    explorer.on(Explorer.Events.OFFLINE, (data: HubData) => {
      console.log("not reachable ", data);
    });

    explorer.start();
  }

  async connectToHub(data: HubData) {
    if (this.hubConnections.get(data.uuid) === undefined) {
      // with the websocket client the port is irrelevant
      // and can be discarded, but for 100% api compatibility
      // with the @harmonyhub/client xmpp version of this
      // library it doesn't hurt to keep it
      // passing in the remoteId saves one data request to the
      // hub which the library performs automatically when the
      // remoteId is not provided
      const hubclient = await getHarmonyClient(data.ip, {
        port: parseInt(data.fullHubInfo.port, 10),
        remoteId: data.fullHubInfo.remoteId,
      });

      hubclient.on(HarmonyClient.Events.DISCONNECTED, () => {
        this.hubConnections.set(data.uuid, undefined);
        console.log(
          `client got disconnected, now #${this.hubConnections.size} active clients`
        );
      });

      this.hubConnections.set(data.uuid, hubclient);
      const start = Date.now();
      try {
        // await hubclient.send(
        //   "holdAction",
        //   JSON.stringify({
        //     command: "InputB2",
        //     type: "IRCommand",
        //     deviceId: "34350046",
        //   }),
        //   100
        // );
        // console.log(
        //   JSON.stringify(await hubclient.getAvailableCommands(), null, 2)
        // );
        // console.log(`run time: ${Date.now() - start}`);
        // await hubclient.send(
        //   "holdAction",
        //   JSON.stringify({
        //     command: "InputB1",
        //     type: "IRCommand",
        //     deviceId: "34350046",
        //   }),
        //   100
        // );
        // hubclient.end();
      } catch (error) {
        console.error("Error", error.message);
      }
    } else {
      console.log("already connected to this hub");
    }

    console.log(`connected to #${this.hubConnections.size} clients`);
  }
}
