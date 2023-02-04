import { isEqual } from 'helpers/isEqual';
import { AppState } from '../../typings/app';
import EventBus from './EventBus';
import { set } from 'helpers/set';

export type Dispatch<State> = (
    nextStateOrAction: Partial<State> | Action<State>,
    payload?: unknown,
  ) => void;

export type Action<State> = (
  dispatch: Dispatch<State>,
  state: State,
  payload: any,
) => void;

export enum StoreEvents {
  Updated = 'updated',
}

export const defaultState: AppState = {
    appIsInited: false,
    isLoading: false,
    screen: null,
    loginFormError: null,
    user: null,
    chats: null,
    socket: null,
    currentChat: null,
    messageContent: null,
  };

  export class Store<State extends Record<string, unknown>> extends EventBus {
    private state: State = {} as State;

    constructor(defaultState: State) {
      super();

      this.state = defaultState;
      this.set(defaultState);
    }

    public getState() {
      return this.state;
    }

    public set(nextState: Partial<State>) {
      const prevState = { ...this.state };

      if (isEqual(prevState, nextState)) {
        return;
      }

      this.state = { ...this.state, ...nextState };

      this.emit('changed', prevState, nextState);
    }

    dispatch(nextStateOrAction: Partial<State> | Action<State>, payload?: any) {
      if (typeof nextStateOrAction === 'function') {
        nextStateOrAction(this.dispatch.bind(this), this.state, payload);
      } else {
        this.set({ ...this.state, ...nextStateOrAction });
      }
    }

    public update(path: string, value: unknown) {
      set(this.state, path, value);

      // метод EventBus
      this.emit(StoreEvents.Updated);
    }
  }
