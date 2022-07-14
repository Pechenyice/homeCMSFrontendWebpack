export const aborts = {
  PROFILE_AUTH_CHECK: new AbortController(),
  PROFILE_LOGIN_CONTROLLER: new AbortController(),
  PROFILE_GET_COMPANY_CONTROLLER: new AbortController(),
  PROFILE_LOGOUT_CONTROLLER: new AbortController(),
  PROFILE_UPDATE_CONTROLLER: new AbortController(),

  PROJECT_GET_CONTROLLER: new AbortController(),
  PROJECT_CREATE_CONTROLLER: new AbortController(),

  FILE_UPLOAD_CONTROLLER: new AbortController(),

  QUERIES_DISTRICTS_CONTROLLER: new AbortController(),
  QUERIES_ORGANIZATION_TYPES_CONTROLLER: new AbortController(),
  QUERIES_REALISATION_FOR_CITIZEN_CONTROLLER: new AbortController(),
  QUERIES_ATTRACTING_VOLUNTEER_CONTROLLER: new AbortController(),
  QUERIES_CATEGORIES_CONTROLLER: new AbortController(),
  QUERIES_RNSU_CATEGORIES_CONTROLLER: new AbortController(),
  QUERIES_CIRCUMSTANCES_RECOGNITION_NEED_CONTROLLER: new AbortController(),
  QUERIES_WORKS_NAMES_CONTROLLER: new AbortController(),
  QUERIES_TARGET_GROUPS_CONTROLLER: new AbortController(),
  QUERIES_STATUSES_CONTROLLER: new AbortController(),
  QUERIES_SOCIAL_HELP_FORMS_CONTROLLER: new AbortController(),
  QUERIES_KINDS_CONTROLLER: new AbortController(),
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

export function abortFileUpload() {
  aborts.FILE_UPLOAD_CONTROLLER.abort();
  aborts.FILE_UPLOAD_CONTROLLER = new AbortController();
}

export function abortQueryDistricts() {
  aborts.QUERIES_DISTRICTS_CONTROLLER.abort();
  aborts.QUERIES_DISTRICTS_CONTROLLER = new AbortController();
}

export function abortQueryOrganizationTypes() {
  aborts.QUERIES_ORGANIZATION_TYPES_CONTROLLER.abort();
  aborts.QUERIES_ORGANIZATION_TYPES_CONTROLLER = new AbortController();
}

export function abortQueryRealisationForCitizen() {
  aborts.QUERIES_REALISATION_FOR_CITIZEN_CONTROLLER.abort();
  aborts.QUERIES_REALISATION_FOR_CITIZEN_CONTROLLER = new AbortController();
}

export function abortQueryAttractingVolunteer() {
  aborts.QUERIES_ATTRACTING_VOLUNTEER_CONTROLLER.abort();
  aborts.QUERIES_ATTRACTING_VOLUNTEER_CONTROLLER = new AbortController();
}

export function abortQueryCategories() {
  aborts.QUERIES_CATEGORIES_CONTROLLER.abort();
  aborts.QUERIES_CATEGORIES_CONTROLLER = new AbortController();
}

export function abortQueryRNSUCategories() {
  aborts.QUERIES_RNSU_CATEGORIES_CONTROLLER.abort();
  aborts.QUERIES_RNSU_CATEGORIES_CONTROLLER = new AbortController();
}

export function abortQueryCircumstancesRecognitionNeed() {
  aborts.QUERIES_CIRCUMSTANCES_RECOGNITION_NEED_CONTROLLER.abort();
  aborts.QUERIES_CIRCUMSTANCES_RECOGNITION_NEED_CONTROLLER = new AbortController();
}

export function abortQueryWorksNames() {
  aborts.QUERIES_WORKS_NAMES_CONTROLLER.abort();
  aborts.QUERIES_WORKS_NAMES_CONTROLLER = new AbortController();
}

export function abortQueryTargetGroups() {
  aborts.QUERIES_TARGET_GROUPS_CONTROLLER.abort();
  aborts.QUERIES_TARGET_GROUPS_CONTROLLER = new AbortController();
}

export function abortQueryStatuses() {
  aborts.QUERIES_STATUSES_CONTROLLER.abort();
  aborts.QUERIES_STATUSES_CONTROLLER = new AbortController();
}

export function abortQuerySocialHelpForms() {
  aborts.QUERIES_SOCIAL_HELP_FORMS_CONTROLLER.abort();
  aborts.QUERIES_SOCIAL_HELP_FORMS_CONTROLLER = new AbortController();
}

export function abortQueryKinds() {
  aborts.QUERIES_KINDS_CONTROLLER.abort();
  aborts.QUERIES_KINDS_CONTROLLER = new AbortController();
}
