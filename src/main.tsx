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
    <div>
      <h1>Mundistream 3.0</h1>
      <Selfbot dispatch={dispatch} state={state} />
      <pre>
        <code>{JSON.stringify(state, null, 2)}</code>
      </pre>
    </div>
  );
};
