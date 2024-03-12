import Discord from "discord.js-selfbot-v13";
import { Dispatcher } from "./state";

export const selfbot = (dispatch: Dispatcher) => {
  const client = new Discord.Client({});

  console.log("starting selfbot");
  client.on("error", (err: Error) => {
    dispatch.selfbotError();
    console.error(`error: ${err}`);
  });

  client.login(process.env.DISCORD_TOKEN);

  client.on("ready", () => {
    dispatch.selfbotReady();
  });

  return {
    start() {
      const r = new Discord.RichPresence()
        .setApplicationId("1128372775841702039")
        .setType("PLAYING")
        .setURL("https://iame.li")
        .setName("testing rich status")
        .setState("testing state")
        // .setName("🔴 LIVE on Livepeer")
        // .setState("🔴 LIVE on Livepeer")
        .setDetails("Livepeer in a Box")
        .setStartTimestamp(Date.now() as unknown as Date)
        .setAssetsLargeImage("1128374507221024778")
        .setAssetsLargeText("livepeer")
        .setAssetsSmallImage("1128374507221024778")
        .setAssetsSmallText("livepeer")
        .addButton("Watch Stream", "https://iame.li/")
        .addButton("Join Chat", "https://chat.iame.li/");
      client.user.setActivity(r);
      dispatch.selfbotStartDone();
    },
    stop() {
      client.user.setActivity(null);
      dispatch.selfbotStopDone();
    },
  };
};
