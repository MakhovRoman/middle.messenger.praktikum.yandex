import { CoreRouter } from 'core/Router/CoreRouter';

declare global {
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];

  export type PlainObject<T = unknown> = {
    [key in string]?: T;
  };

  interface Window {
    store: Store<AppState>;
    router: CoreRouter;
  }
}

export type DispatchStateHandler<TAction> = (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: TAction
) => Promise<void>;

export type AppState = {
  appIsInited: boolean;
  screen: Screens | null;
  isLoading: boolean;
  loginFormError: string | null;
  user: User | null | Record<string, unknown>;
  chats: {} | [] |null;
  userList?: Record<string, unknown>[];
  socket: Nullable<WebSocket>;
  toolsActive?: Nullable<string>;
  currentChat: Nullable<number>;
  messageContent: {data: unknown} | null;
  disableMeetingScreen?: string;
  chatDialogContent?: string;
  currentChatAvatar?: string;
  currentChatTitle?: string;
  chatDialogCompanion?: string;
};

export type User = {
  id: number;
  login: string;
  firstName: string;
  secondName: string;
  displayName: string;
  avatar: string;
  phone: string;
  email: string;
}

// export type Chats = {

// }

  export {}
