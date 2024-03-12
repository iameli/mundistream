import { useEffect, useState } from "react";
import Selfbot from "./selfbot";
import { dispatcher } from "./state";

const message: (msg: string) => {} = (window as any).electronAPI.message;

const dispatch = dispatcher((action) => {
  message(JSON.stringify(action));
});

export default () => {
  const [state, setState] = useState({ loading: true });
  useEffect(() => {
    (window as any).electronAPI.onState(setState);
  }, []);
  return (
    <div>
      <h1>Mundistream 3.0</h1>
      <Selfbot dispatch={dispatch} />
      <pre>
        <code>{JSON.stringify(state, null, 2)}</code>
      </pre>
    </div>
  );
};
