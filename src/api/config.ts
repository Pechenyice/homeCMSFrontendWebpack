import { IAPIRoutesConfig } from './interfaces';
import { EAPIMethod } from './enums';

export const API_PREFIX = '/api/client/v1';

const API_ROUTES: IAPIRoutesConfig = {
  PROFILE_AUTH_CHECK: {
    url: `${API_PREFIX}/users/check`,
    method: EAPIMethod.POST,
  },
  PROFILE_LOGIN: {
    url: `${API_PREFIX}/users/login`,
    method: EAPIMethod.POST,
  },
  PROFILE_GET_COMPANY: {
    url: `${API_PREFIX}/company`,
    method: EAPIMethod.GET,
  },
  PROFILE_LOGOUT: {
    url: `${API_PREFIX}/users/logout`,
    method: EAPIMethod.GET,
  },
  PROFILE_UPDATE: {
    url: `${API_PREFIX}/company`,
    method: EAPIMethod.PUT,
  },

  PROJECT_GET: {
    url: `${API_PREFIX}/jobs/projects`,
    method: EAPIMethod.GET,
  },
  PROJECT_CREATE: {
    url: `${API_PREFIX}/jobs/projects`,
    method: EAPIMethod.POST,
  },

  FILE_UPLOAD: {
    url: `${API_PREFIX}/files`,
    method: EAPIMethod.POST,
  },

  QUERIES_DISTRICTS: {
    url: `${API_PREFIX}/dictionary-categories/district/dictionaries`,
    method: EAPIMethod.GET,
  },
  QUERIES_ORGANIZATION_TYPES: {
    url: `${API_PREFIX}/dictionary-categories/organization-type/dictionaries`,
    method: EAPIMethod.GET,
  },
  QUERIES_REALISATION_FOR_CITIZEN: {
    url: `${API_PREFIX}/dictionary-categories/implementation-for-citizen/dictionaries`,
    method: EAPIMethod.GET,
  },
  QUERIES_ATTRACTING_VOLUNTEER: {
    url: `${API_PREFIX}/dictionary-categories/engagement-of-volunteers/dictionaries`,
    method: EAPIMethod.GET,
  },
  QUERIES_CATEGORIES: {
    url: `${API_PREFIX}/dictionary-categories/category/dictionaries`,
    method: EAPIMethod.GET,
  },
  QUERIES_RNSU_CATEGORIES: {
    url: `${API_PREFIX}/dictionary-categories/rnsu-category/dictionaries`,
    method: EAPIMethod.GET,
  },
  QUERIES_CIRCUMSTANCES_RECOGNITION_NEED: {
    url: `${API_PREFIX}/dictionary-categories/circumstances-of-recognition-of-need/dictionaries`,
    method: EAPIMethod.GET,
  },
  QUERIES_WORKS_NAMES: {
    url: `${API_PREFIX}/dictionary-categories/work-name/dictionaries`,
    method: EAPIMethod.GET,
  },
  QUERIES_TARGET_GROUPS: {
    url: `${API_PREFIX}/dictionary-categories/target-group/dictionaries`,
    method: EAPIMethod.GET,
  },
  QUERIES_STATUSES: {
    url: `${API_PREFIX}/dictionary-categories/job-status/dictionaries`,
    method: EAPIMethod.GET,
  },
  QUERIES_SOCIAL_HELP_FORMS: {
    url: `${API_PREFIX}/dictionary-categories/form-of-social-service/dictionaries`,
    method: EAPIMethod.GET,
  },
  QUERIES_KINDS: {
    url: `${API_PREFIX}/dictionary-categories/service-type/dictionaries`,
    method: EAPIMethod.GET,
  },
};

export default API_ROUTES;
