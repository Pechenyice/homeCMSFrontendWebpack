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

  LIBRARY_GET_LIST_CONTROLLER: new AbortController(),
  LIBRARY_GET_CONTROLLER: new AbortController(),
  LIBRARY_CREATE_CONTROLLER: new AbortController(),
  LIBRARY_UPDATE_CONTROLLER: new AbortController(),
  LIBRARY_DELETE_CONTROLLER: new AbortController(),

  FILE_UPLOAD_CONTROLLER: new AbortController(),

  QUERIES_CATEGORIES_CONTROLLER: new AbortController(),
  QUERIES_YEARS_CONTROLLER: new AbortController(),

  ENTITY_GET_CONTROLLER: new AbortController(),
  ENTITY_GET_LIST_CONTROLLER: new AbortController(),
  ENTITY_GET_ADMIN_LIST_CONTROLLER: new AbortController(),
  ENTITY_GET_ADMIN_ARCHIVE_LIST_CONTROLLER: new AbortController(),
  ENTITY_CREATE_CONTROLLER: new AbortController(),
  ENTITY_UPDATE_CONTROLLER: new AbortController(),
  ENTITY_DELETE_CONTROLLER: new AbortController(),
  ENTITY_REJECT_CONTROLLER: new AbortController(),
  ENTITY_APPROVE_CONTROLLER: new AbortController(),
  ENTITY_RESTORE_CONTROLLER: new AbortController(),
  ENTITY_DOWNLOAD_CONTROLLER: new AbortController(),
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

export function abortGetEntity() {
  aborts.ENTITY_GET_CONTROLLER.abort();
  aborts.ENTITY_GET_CONTROLLER = new AbortController();
}

export function abortGetListEntity() {
  aborts.ENTITY_GET_LIST_CONTROLLER.abort();
  aborts.ENTITY_GET_LIST_CONTROLLER = new AbortController();
}

export function abortGetAdminListEntity() {
  aborts.ENTITY_GET_ADMIN_LIST_CONTROLLER.abort();
  aborts.ENTITY_GET_ADMIN_LIST_CONTROLLER = new AbortController();
}

export function abortGetAdminArchiveListEntity() {
  aborts.ENTITY_GET_ADMIN_ARCHIVE_LIST_CONTROLLER.abort();
  aborts.ENTITY_GET_ADMIN_ARCHIVE_LIST_CONTROLLER = new AbortController();
}

export function abortRejectEntity() {
  aborts.ENTITY_REJECT_CONTROLLER.abort();
  aborts.ENTITY_REJECT_CONTROLLER = new AbortController();
}

export function abortApproveEntity() {
  aborts.ENTITY_APPROVE_CONTROLLER.abort();
  aborts.ENTITY_APPROVE_CONTROLLER = new AbortController();
}

export function abortRestoreEntity() {
  aborts.ENTITY_RESTORE_CONTROLLER.abort();
  aborts.ENTITY_RESTORE_CONTROLLER = new AbortController();
}

export function abortDownloadEntity() {
  aborts.ENTITY_DOWNLOAD_CONTROLLER.abort();
  aborts.ENTITY_DOWNLOAD_CONTROLLER = new AbortController();
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

export function abortLibraryGetList() {
  aborts.LIBRARY_GET_LIST_CONTROLLER.abort();
  aborts.LIBRARY_GET_LIST_CONTROLLER = new AbortController();
}

export function abortLibraryGet() {
  aborts.LIBRARY_GET_CONTROLLER.abort();
  aborts.LIBRARY_GET_CONTROLLER = new AbortController();
}

export function abortLibraryCreate() {
  aborts.LIBRARY_CREATE_CONTROLLER.abort();
  aborts.LIBRARY_CREATE_CONTROLLER = new AbortController();
}

export function abortLibraryUpdate() {
  aborts.LIBRARY_UPDATE_CONTROLLER.abort();
  aborts.LIBRARY_UPDATE_CONTROLLER = new AbortController();
}

export function abortLibraryDelete() {
  aborts.LIBRARY_DELETE_CONTROLLER.abort();
  aborts.LIBRARY_DELETE_CONTROLLER = new AbortController();
}

export function abortCreateEntity() {
  aborts.ENTITY_CREATE_CONTROLLER.abort();
  aborts.ENTITY_CREATE_CONTROLLER = new AbortController();
}

export function abortUpdateEntity() {
  aborts.ENTITY_UPDATE_CONTROLLER.abort();
  aborts.ENTITY_UPDATE_CONTROLLER = new AbortController();
}

export function abortDeleteEntity() {
  aborts.ENTITY_DELETE_CONTROLLER.abort();
  aborts.ENTITY_DELETE_CONTROLLER = new AbortController();
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
