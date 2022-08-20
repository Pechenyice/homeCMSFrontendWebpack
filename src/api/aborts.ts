export const aborts = {
  PROFILE_AUTH_CHECK: new AbortController(),
  PROFILE_LOGIN_CONTROLLER: new AbortController(),
  PROFILE_GET_COMPANY_CONTROLLER: new AbortController(),
  PROFILE_LOGOUT_CONTROLLER: new AbortController(),
  PROFILE_UPDATE_CONTROLLER: new AbortController(),

  COMPANY_REJECT_CONTROLLER: new AbortController(),
  COMPANY_APPROVE_CONTROLLER: new AbortController(),
  COMPANY_GET_LIST_CONTROLLER: new AbortController(),
  COMPANY_DOWNLOAD_CONTROLLER: new AbortController(),

  FILE_UPLOAD_CONTROLLER: new AbortController(),

  QUERIES_CATEGORIES_CONTROLLER: new AbortController(),
  QUERIES_YEARS_CONTROLLER: new AbortController(),

  PROJECT_GET_CONTROLLER: new AbortController(),
  PROJECT_GET_LIST_CONTROLLER: new AbortController(),
  PROJECT_GET_ADMIN_LIST_CONTROLLER: new AbortController(),
  PROJECT_GET_ADMIN_ARCHIVE_LIST_CONTROLLER: new AbortController(),
  PROJECT_CREATE_CONTROLLER: new AbortController(),
  PROJECT_UPDATE_CONTROLLER: new AbortController(),
  PROJECT_DELETE_CONTROLLER: new AbortController(),
  PROJECT_REJECT_CONTROLLER: new AbortController(),
  PROJECT_APPROVE_CONTROLLER: new AbortController(),
  PROJECT_RESTORE_CONTROLLER: new AbortController(),
  PROJECT_DOWNLOAD_CONTROLLER: new AbortController(),
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

export function abortGetListProject() {
  aborts.PROJECT_GET_LIST_CONTROLLER.abort();
  aborts.PROJECT_GET_LIST_CONTROLLER = new AbortController();
}

export function abortGetAdminListProject() {
  aborts.PROJECT_GET_ADMIN_LIST_CONTROLLER.abort();
  aborts.PROJECT_GET_ADMIN_LIST_CONTROLLER = new AbortController();
}

export function abortGetAdminArchiveListProject() {
  aborts.PROJECT_GET_ADMIN_ARCHIVE_LIST_CONTROLLER.abort();
  aborts.PROJECT_GET_ADMIN_ARCHIVE_LIST_CONTROLLER = new AbortController();
}

export function abortRejectProject() {
  aborts.PROJECT_REJECT_CONTROLLER.abort();
  aborts.PROJECT_REJECT_CONTROLLER = new AbortController();
}

export function abortApproveProject() {
  aborts.PROJECT_APPROVE_CONTROLLER.abort();
  aborts.PROJECT_APPROVE_CONTROLLER = new AbortController();
}

export function abortRestoreProject() {
  aborts.PROJECT_RESTORE_CONTROLLER.abort();
  aborts.PROJECT_RESTORE_CONTROLLER = new AbortController();
}

export function abortDownloadProject() {
  aborts.PROJECT_DOWNLOAD_CONTROLLER.abort();
  aborts.PROJECT_DOWNLOAD_CONTROLLER = new AbortController();
}

export function abortRejectCompany() {
  aborts.COMPANY_REJECT_CONTROLLER.abort();
  aborts.COMPANY_REJECT_CONTROLLER = new AbortController();
}

export function abortApproveCompany() {
  aborts.COMPANY_APPROVE_CONTROLLER.abort();
  aborts.COMPANY_APPROVE_CONTROLLER = new AbortController();
}

export function abortGetCompanyAdminList() {
  aborts.COMPANY_GET_LIST_CONTROLLER.abort();
  aborts.COMPANY_GET_LIST_CONTROLLER = new AbortController();
}

export function abortDownloadCompany() {
  aborts.COMPANY_DOWNLOAD_CONTROLLER.abort();
  aborts.COMPANY_DOWNLOAD_CONTROLLER = new AbortController();
}

export function abortCreateProject() {
  aborts.PROJECT_CREATE_CONTROLLER.abort();
  aborts.PROJECT_CREATE_CONTROLLER = new AbortController();
}

export function abortUpdateProject() {
  aborts.PROJECT_UPDATE_CONTROLLER.abort();
  aborts.PROJECT_UPDATE_CONTROLLER = new AbortController();
}

export function abortDeleteProject() {
  aborts.PROJECT_DELETE_CONTROLLER.abort();
  aborts.PROJECT_DELETE_CONTROLLER = new AbortController();
}

export function abortFileUpload() {
  aborts.FILE_UPLOAD_CONTROLLER.abort();
  aborts.FILE_UPLOAD_CONTROLLER = new AbortController();
}

export function abortQueryCategories() {
  aborts.QUERIES_CATEGORIES_CONTROLLER.abort();
  aborts.QUERIES_CATEGORIES_CONTROLLER = new AbortController();
}

export function abortQueryYears() {
  aborts.QUERIES_YEARS_CONTROLLER.abort();
  aborts.QUERIES_YEARS_CONTROLLER = new AbortController();
}
