export const READY = "READY";

export const POST_TEXT = "POST_TEXT";

export const DISCORD_BLAST = "DISCORD_BLAST";

export const SELFBOT_START = "SELFBOT_START";
export const SELFBOT_START_DONE = "SELFBOT_START_DONE";
export const SELFBOT_STOP = "SELFBOT_STOP";
export const SELFBOT_STOP_DONE = "SELFBOT_STOP_DONE";
export const SELFBOT_READY = "SELFBOT_READY";
export const SELFBOT_ERROR = "SELFBOT_ERROR";

export type Action = {
  type: string;
  time?: number;
  text?: string;
};

export type State = {
  actions: Action[];
  postText: string;
  discordText: string;
  selfbot: {
    status: string;
    ready: boolean;
  };
  loading: boolean;
};

export const dispatcher = (send: (action: Action) => void) => {
  const sendTime = (act: Action) => {
    if (typeof act.time === "undefined") {
      act = {
        ...act,
        time: Date.now(),
      };
    }
    send(act);
  };
  return {
    ready: () => sendTime({ type: READY }),
    postText: (text: string) => sendTime({ type: POST_TEXT, text: text }),
    discordBlast: () => sendTime({ type: DISCORD_BLAST }),
    selfbotStart: () => sendTime({ type: SELFBOT_START }),
    selfbotStartDone: () => sendTime({ type: SELFBOT_START_DONE }),
    selfbotStop: () => sendTime({ type: SELFBOT_STOP }),
    selfbotStopDone: () => sendTime({ type: SELFBOT_STOP_DONE }),
    selfbotReady: () => sendTime({ type: SELFBOT_READY }),
    selfbotError: () => sendTime({ type: SELFBOT_ERROR }),
  };
};
export type Dispatcher = ReturnType<typeof dispatcher>;

export function reducer(state: State, action: Action): State {
  state = {
    ...state,
    actions: [...(state.actions ?? []), action],
  };

  if (action.type === READY) {
    state = {
      ...state,
      loading: false,
    };
  }

  if (action.type === POST_TEXT) {
    state = {
      ...state,
      postText: action.text,
    };
  }

  if (action.type === SELFBOT_START) {
    state = {
      ...state,
      selfbot: {
        ...state.selfbot,
        status: "Starting...",
      },
    };
  }

  if (action.type === SELFBOT_START_DONE) {
    state = {
      ...state,
      selfbot: {
        ...state.selfbot,
        status: "Started!",
      },
    };
  }

  if (action.type === SELFBOT_STOP) {
    state = {
      ...state,
      selfbot: {
        ...state.selfbot,
        status: "Stopping...",
      },
    };
  }

  if (action.type === SELFBOT_STOP_DONE) {
    state = {
      ...state,
      selfbot: {
        ...state.selfbot,
        status: "Stopped.",
      },
    };
  }

  if (action.type === SELFBOT_READY) {
    state = {
      ...state,
      selfbot: {
        ...state.selfbot,
        status: "Ready!",
        ready: true,
      },
    };
  }

  return state;
}

export const DEFAULT_STATE: State = {
  actions: [],
  selfbot: { status: "", ready: false },
  loading: false,
  postText: "",
  discordText: "",
};
