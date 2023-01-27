import { isEqual } from 'helpers/isEqual';
import { AppState } from '../../typings/app';
import EventBus from './EventBus';

export type Dispatch<State> = (
    nextStateOrAction: Partial<State> | Action<State>,
    payload?: any,
  ) => void;

  export type Action<State> = (
    dispatch: Dispatch<State>,
    state: State,
    payload: any,
  ) => void;


export const defaultState: AppState = {
    appIsInited: false,
    isLoading: false,
    screen: null,
    loginFormError: null,
    user: null,
    chats: null
  };

  export class Store<State extends Record<string, any>> extends EventBus {
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
      console.log('store set')
      const prevState = { ...this.state };

      if (isEqual(prevState, nextState)) {
        console.log('equal states')
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
  }
