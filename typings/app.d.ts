import { CoreRouter } from 'core/Router/CoreRouter';

declare global {
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];

  interface Window {
    store: Store<AppState>;
    router: CoreRouter;
  }
}
export type AppState = {
  appIsInited: boolean;
  screen: Screens | null;
  isLoading: boolean;
  loginFormError: string | null;
  user: User | null | Record<string, unknown>;
  chats?: {} | null;
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
