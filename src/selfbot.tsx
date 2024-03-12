// import Discord from "discord.js-selfbot-v13";
import { useEffect, useState } from "react";
import { Dispatcher } from "./state";

// const client = new Discord.Client({
//   syncStatus: false,
// });

// const r = new Discord.RichPresence()
// .setApplicationId("1128372775841702039")
// .setType("PLAYING")
// .setURL("https://iame.li")
// .setName("🔴 LIVE on Livepeer")
// .setState("🔴 LIVE on Livepeer")
// .setDetails("Livepeer in a Box")
// .setStartTimestamp(Date.now())
// .setAssetsLargeImage("1128374507221024778")
// .setAssetsLargeText("livepeer")
// .setAssetsSmallImage("1128374507221024778")
// .setAssetsSmallText("livepeer")
// .addButton("Watch Stream", "https://iame.li/")
// .addButton("Join Chat", "https://chat.iame.li/");
// client.user.setActivity(r);

// client.on("error", (err: Error) => {
//   console.error(`error: ${err}`);
// });

export default ({ dispatch }: { dispatch: Dispatcher }) => {
  // const [status, setStatus] = useState();
  useEffect(() => {
    console.log();
    // window.electronAPI.message("foo");
    //   client.on("ready", async () => {
    //     console.log(`${client.user.username} is ready!`);
    //   });
    //   client.login(
    //     process.env.DISCORD_TOKEN
    //   );
  }, []);
  return (
    <div>
      <h3>selfbot</h3>
      <button
        onClick={() => {
          dispatch.selfbotStart();
        }}
      >
        Send
      </button>
    </div>
  );
};
