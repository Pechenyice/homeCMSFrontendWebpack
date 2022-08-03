import { IAPIRoutesConfig } from './interfaces';
import { EAPIMethod } from './enums';

export const API_PREFIX = '/api/client/v1';

export const DYNAMIC_API_ROUTES = {
  PROFILE_GET_COMPANY: (userId: number) => ({
    url: `${API_PREFIX}/users/${userId}/company`,
    method: EAPIMethod.GET,
  }),
  PROFILE_UPDATE: (userId: number) => ({
    url: `${API_PREFIX}/users/${userId}/company`,
    method: EAPIMethod.PUT,
  }),

  PROJECT_CREATE: (userId: number) => ({
    url: `${API_PREFIX}/users/${userId}/jobs/social-projects`,
    method: EAPIMethod.POST,
  }),
  PROJECT_UPDATE: (id: number, userId: number) => ({
    url: `${API_PREFIX}/users/${userId}/jobs/social-projects/${id}`,
    method: EAPIMethod.PUT,
  }),
  PROJECT_GET: (id: string, userId: number) => ({
    url: `${API_PREFIX}/users/${userId}/jobs/social-projects/${id}`,
    method: EAPIMethod.GET,
  }),

  FILE_UPLOAD: (userId: number) => ({
    url: `${API_PREFIX}/users/${userId}/files`,
    method: EAPIMethod.POST,
  }),

  QUERIES_CATEGORIES: (category: string) => ({
    url: `${API_PREFIX}/dictionaries/categories/${category}`,
    method: EAPIMethod.GET,
  }),
  QUERIES_CATEGORIES_RELATIONS: (
    parentCategory: string,
    childCategory: string
  ) => ({
    url: `${API_PREFIX}/dictionaries/categories/${parentCategory}/${childCategory}`,
    method: EAPIMethod.GET,
  }),
};

export const API_ROUTES: IAPIRoutesConfig = {
  PROFILE_AUTH_CHECK: {
    url: `${API_PREFIX}/users/check`,
    method: EAPIMethod.POST,
  },
  PROFILE_LOGIN: {
    url: `${API_PREFIX}/users/login`,
    method: EAPIMethod.POST,
  },
  PROFILE_LOGOUT: {
    url: `${API_PREFIX}/users/logout`,
    method: EAPIMethod.GET,
  },
};
