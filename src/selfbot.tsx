// import Discord from "discord.js-selfbot-v13";
import { useEffect, useState } from "react";
import { Dispatcher, State } from "./state";

export default ({
  dispatch,
  state,
}: {
  dispatch: Dispatcher;
  state: State;
}) => {
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
      <h3>Selfbot</h3>
      <p>Status: {state.selfbot.status}</p>
      <button
        disabled={!state.selfbot.ready}
        onClick={() => {
          dispatch.selfbotStart();
        }}
      >
        Start
      </button>
      <button
        disabled={!state.selfbot.ready}
        onClick={() => {
          dispatch.selfbotStop();
        }}
      >
        Stop
      </button>
    </div>
  );
};
