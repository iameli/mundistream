import Discord from "discord.js-selfbot-v13";
import { Dispatcher } from "./state";

const twoLines = (text: string): string[] => {
  let first: string[] = [];
  let second: string[] = [];
  const words = text.split(" ");
  let i = 0;
  while (i < words.length && [...first, words[i]].join(" ").length < 32) {
    first.push(words[i]);
    i += 1;
  }
  while (i < words.length && [...second, words[i]].join(" ").length < 32) {
    second.push(words[i]);
    i += 1;
  }
  if (i < words.length) {
    second[second.length - 1] += "...";
  }
  return [first.join(" "), second.join(" ")];
};
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
    start(message: string) {
      const [first, second] = twoLines(message);
      const r = new Discord.RichPresence()
        .setApplicationId("1128372775841702039")
        .setType("PLAYING")
        .setName("Testing rich status")
        .setURL("https://iame.li")
        // .setName("🔴 LIVE on iame.li")
        .setName("testing rich presence")
        .setDetails(first)
        .setState(second)
        .setStartTimestamp(Date.now() as unknown as Date)
        .setAssetsLargeImage("1128374507221024778")
        .setAssetsLargeText("livepeer")
        .setAssetsSmallImage("1128374507221024778")
        .setAssetsSmallText("livepeer")
        .addButton("Watch Stream", "https://iame.li/")
        .addButton("Join Chat", "https://chat.iame.li/");
      (r as any).metadata.button_url = (r as any).metadata.button_urls;
      (r as any).metadata.album_id = "lol";
      client.user.setActivity(r);
      dispatch.selfbotStartDone();
    },
    stop() {
      client.user.setActivity(null);
      dispatch.selfbotStopDone();
    },
  };
};
