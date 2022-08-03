export const aborts = {
  PROFILE_AUTH_CHECK: new AbortController(),
  PROFILE_LOGIN_CONTROLLER: new AbortController(),
  PROFILE_GET_COMPANY_CONTROLLER: new AbortController(),
  PROFILE_LOGOUT_CONTROLLER: new AbortController(),
  PROFILE_UPDATE_CONTROLLER: new AbortController(),

  PROJECT_GET_CONTROLLER: new AbortController(),
  PROJECT_CREATE_CONTROLLER: new AbortController(),
  PROJECT_UPDATE_CONTROLLER: new AbortController(),

  FILE_UPLOAD_CONTROLLER: new AbortController(),

  QUERIES_CATEGORIES_CONTROLLER: new AbortController(),
};

export function abortCheckAuth() {
  aborts.PROFILE_AUTH_CHECK.abort();
  aborts.PROFILE_AUTH_CHECK = new AbortController();
}

export function abortLogin() {
  aborts.PROFILE_LOGIN_CONTROLLER.abort();
  aborts.PROFILE_LOGIN_CONTROLLER = new AbortController();
}

export function abortGetCompany() {
  aborts.PROFILE_GET_COMPANY_CONTROLLER.abort();
  aborts.PROFILE_GET_COMPANY_CONTROLLER = new AbortController();
}

export function abortLogout() {
  aborts.PROFILE_LOGOUT_CONTROLLER.abort();
  aborts.PROFILE_LOGOUT_CONTROLLER = new AbortController();
}

export function abortUpdateProfile() {
  aborts.PROFILE_UPDATE_CONTROLLER.abort();
  aborts.PROFILE_UPDATE_CONTROLLER = new AbortController();
}

export function abortGetProject() {
  aborts.PROJECT_GET_CONTROLLER.abort();
  aborts.PROJECT_GET_CONTROLLER = new AbortController();
}

export function abortCreateProject() {
  aborts.PROJECT_CREATE_CONTROLLER.abort();
  aborts.PROJECT_CREATE_CONTROLLER = new AbortController();
}

export function abortUpdateProject() {
  aborts.PROJECT_UPDATE_CONTROLLER.abort();
  aborts.PROJECT_UPDATE_CONTROLLER = new AbortController();
}

export function abortFileUpload() {
  aborts.FILE_UPLOAD_CONTROLLER.abort();
  aborts.FILE_UPLOAD_CONTROLLER = new AbortController();
}

export function abortQueryCategories() {
  aborts.QUERIES_CATEGORIES_CONTROLLER.abort();
  aborts.QUERIES_CATEGORIES_CONTROLLER = new AbortController();
}
