export const SELFBOT_START = "SELFBOT_START";
export const SELFBOT_START_DONE = "SELFBOT_START_DONE";
export const SELFBOT_STOP = "SELFBOT_STOP";
export const SELFBOT_STOP_DONE = "SELFBOT_STOP_DONE";
export const SELFBOT_READY = "SELFBOT_READY";
export const SELFBOT_ERROR = "SELFBOT_ERROR";
export const READY = "READY";

export type Action = {
  type: string;
};

export type StateSelfbot = {
  status: string;
  ready: boolean;
};

export type State = {
  actions: Action[];
  selfbot: StateSelfbot;
  loading: boolean;
};

export const dispatcher = (send: (action: Action) => void) => {
  return {
    selfbotStart: () => send({ type: SELFBOT_START }),
    selfbotStartDone: () => send({ type: SELFBOT_START_DONE }),
    selfbotStop: () => send({ type: SELFBOT_STOP }),
    selfbotStopDone: () => send({ type: SELFBOT_STOP_DONE }),
    selfbotReady: () => send({ type: SELFBOT_READY }),
    selfbotError: () => send({ type: SELFBOT_ERROR }),
    ready: () => send({ type: READY }),
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
};
