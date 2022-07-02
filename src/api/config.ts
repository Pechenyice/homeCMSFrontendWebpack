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

  PROJECT: {
    url: `${API_PREFIX}/project`,
    method: EAPIMethod.GET,
  },

  QUERIES_DISTRICTS: {
    url: `${API_PREFIX}/dictionary-categories/district/dictionaries`,
    method: EAPIMethod.GET,
  },
  QUERIES_ORGANIZATION_TYPES: {
    url: `${API_PREFIX}/dictionary-categories/organization-type/dictionaries`,
    method: EAPIMethod.GET,
  },
};

export default API_ROUTES;
