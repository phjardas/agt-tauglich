export type LoadingState = { state: "loading" };
export type ErrorState = { state: "error"; error: Error };
export type ReadyState<T> = { state: "ready"; data: T };
export type DataState<T> = LoadingState | ErrorState | ReadyState<T>;
