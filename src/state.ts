const SELFBOT_START = "SELFBOT_START";

type Action = {
  type: string;
};

export const dispatcher = (send: (action: Action) => void) => {
  return {
    selfbotStart: () => send({ type: SELFBOT_START }),
  };
};
export type Dispatcher = ReturnType<typeof dispatcher>;

export function reducer(state: any, action: any): any {
  state = {
    ...state,
    actions: [...(state.actions ?? []), action],
  };
  if (action.type === SELFBOT_START) {
    state = {
      ...state,
      selfbot: "starting",
    };
  }
  return state;
}

export const DEFAULT_STATE: any = {
  actions: [],
  selfbot: "default",
};
