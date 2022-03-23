export const aborts = {
  CHECK_AUTH_CONTROLLER: new AbortController(),
};

export function abortCheckAuth() {
  aborts.CHECK_AUTH_CONTROLLER.abort();
  aborts.CHECK_AUTH_CONTROLLER = new AbortController();
};