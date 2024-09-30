export type LoadingMessagingContext = {
  state: "loading";
};

export type DefaultMessagingContext = {
  state: "default";
  getToken: () => Promise<string>;
};

export type DeniedMessagingContext = {
  state: "denied";
  error?: Error;
};

export type GrantedMessagingContext = {
  state: "granted";
  getToken: () => Promise<string>;
};

export type MessagingContext =
  | LoadingMessagingContext
  | DefaultMessagingContext
  | GrantedMessagingContext
  | DeniedMessagingContext;
