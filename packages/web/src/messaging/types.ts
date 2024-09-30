export type LoadingMessagingContext = { state: "loading" };

export type DefaultMessagingContext = {
  state: "default";
  enable: () => Promise<void>;
};

export type DeniedMessagingContext = { state: "denied" };

export type GrantedMessagingContext = { state: "granted" };

export type MessagingContext =
  | LoadingMessagingContext
  | DefaultMessagingContext
  | GrantedMessagingContext
  | DeniedMessagingContext;
