import { useEffect, useState } from "react";
import Selfbot from "./selfbot";
import { State, dispatcher, DEFAULT_STATE } from "./state";

const message: (msg: string) => {} = (window as any).electronAPI.message;

const dispatch = dispatcher((action) => {
  message(JSON.stringify(action));
});

export default () => {
  const [state, setState] = useState<State>({
    ...DEFAULT_STATE,
    loading: true,
  });
  useEffect(() => {
    (window as any).electronAPI.onState(setState);
    dispatch.ready();
  }, []);
  if (state.loading) {
    return <div>loading...</div>;
  }
  return (
    <>
      <div className="columns">
        <div className="left">
          <h1>Mundistream 3.0</h1>
          <p>Text:</p>
          <textarea
            value={state.postText}
            onChange={(e) => {
              dispatch.postText(e.target.value);
            }}
          />
          <button className="big-red-button" onClick={() => dispatch.goLive()}>
            GO LIVE
          </button>
          <Selfbot dispatch={dispatch} state={state} />
          <h4>Discord</h4>
          <p>@everyone: 🔴LIVE https://aquareum.tv {state.postText}</p>
          <button
            onClick={(e) => {
              dispatch.discordBlast();
            }}
          >
            Discord Blast
          </button>
          <h4>Bluesky</h4>
          <p>
            🔴LIVE <a href="https://aquareum.tv">aquareum.tv</a>{" "}
            {state.postText}
          </p>
          <button
            onClick={(e) => {
              dispatch.blueskyPost();
            }}
          >
            Post to Bluesky
          </button>
        </div>
        <pre className="right">
          <code>
            {JSON.stringify(
              { ...state, actions: state.actions.reverse() },
              null,
              2
            )}
          </code>
        </pre>
      </div>
    </>
  );
};
