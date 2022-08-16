import { IAPIRoutesConfig } from './interfaces';
import { EAPIMethod } from './enums';
import { EProposalStatus } from 'types/enums';

export const API_PREFIX = '/api/client/v1';
export const ADMIN_API_PREFIX = '/api/admin/v1';

const listFilter = ([_key, value]: [_key: any, value: any]) =>
  value !== undefined && value !== null;

const listMapper = ([key, value]: [key: any, value: any]) =>
  key === 'sortBy'
    ? `sort_by=${value}`
    : key === 'sortDirection'
    ? `sort_direction=${value}`
    : key === 'status'
    ? `filter_${key.toLowerCase()}=${
        EProposalStatus[value as keyof typeof EProposalStatus]
      }`
    : `filter_${key.toLowerCase()}=${value}`;

export const DYNAMIC_API_ROUTES = {
  PROFILE_GET_COMPANY: (userId: number) => ({
    url: `${API_PREFIX}/users/${userId}/company`,
    method: EAPIMethod.GET,
  }),
  PROFILE_UPDATE: (userId: number) => ({
    url: `${API_PREFIX}/users/${userId}/company`,
    method: EAPIMethod.PUT,
  }),

  COMPANY_DOWNLOAD: (userId: number) => ({
    url: `${API_PREFIX}/users/${userId}/company/download`,
    method: EAPIMethod.GET,
  }),

  PROJECT_CREATE: (userId: number) => ({
    url: `${API_PREFIX}/users/${userId}/jobs/social-projects`,
    method: EAPIMethod.POST,
  }),
  PROJECT_UPDATE: (id: number, userId: number) => ({
    url: `${API_PREFIX}/users/${userId}/jobs/social-projects/${id}`,
    method: EAPIMethod.PUT,
  }),
  PROJECT_DELETE: (id: number, userId: number) => ({
    url: `${API_PREFIX}/users/${userId}/jobs/social-projects/${id}`,
    method: EAPIMethod.DELETE,
  }),
  PROJECT_GET: (id: string, userId: number) => ({
    url: `${API_PREFIX}/users/${userId}/jobs/social-projects/${id}`,
    method: EAPIMethod.GET,
  }),
  PROJECT_DOWNLOAD: (id: number, userId: number) => ({
    url: `${API_PREFIX}/users/${userId}/jobs/social-projects/${id}/download`,
    method: EAPIMethod.GET,
  }),
  PROJECT_GET_LIST: (
    page: number,
    limit: number,
    queryParams: { [key: string]: string },
    userId: number
  ) => {
    let url = `${API_PREFIX}/users/${userId}/jobs/social-projects?page=${page}&limit=${limit}&${Object.entries(
      queryParams
    )
      .filter(listFilter)
      .map(listMapper)
      .join('&')}`;

    if (url.endsWith('&')) url = url.slice(0, -1);

    return {
      url,
      method: EAPIMethod.GET,
    };
  },
  PROJECT_GET_ADMIN_LIST: (
    page: number,
    limit: number,
    queryParams: { [key: string]: string }
  ) => {
    let url = `${ADMIN_API_PREFIX}/users/jobs/social-projects?page=${page}&limit=${limit}&${Object.entries(
      queryParams
    )
      .filter(listFilter)
      .map(listMapper)
      .join('&')}`;

    if (url.endsWith('&')) url = url.slice(0, -1);

    return {
      url,
      method: EAPIMethod.GET,
    };
  },
  PROJECT_GET_ADMIN_ARCHIVE_LIST: (
    page: number,
    limit: number,
    queryParams: { [key: string]: string }
  ) => {
    let url = `${ADMIN_API_PREFIX}/users/jobs/social-projects/deleted?page=${page}&limit=${limit}&${Object.entries(
      queryParams
    )
      .filter(listFilter)
      .map(listMapper)
      .join('&')}`;

    if (url.endsWith('&')) url = url.slice(0, -1);

    return {
      url,
      method: EAPIMethod.GET,
    };
  },

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

  ADMIN: {
    PROJECT_REJECT: (id: number, userId: number) => ({
      url: `${ADMIN_API_PREFIX}/users/${userId}/jobs/social-projects/${id}/reject`,
      method: EAPIMethod.PATCH,
    }),
    PROJECT_APPROVE: (id: number, userId: number) => ({
      url: `${ADMIN_API_PREFIX}/users/${userId}/jobs/social-projects/${id}/approve`,
      method: EAPIMethod.PATCH,
    }),

    COMPANY_REJECT: (userId: number) => ({
      url: `${ADMIN_API_PREFIX}/users/${userId}/company/reject`,
      method: EAPIMethod.PATCH,
    }),
    COMPANY_APPROVE: (userId: number) => ({
      url: `${ADMIN_API_PREFIX}/users/${userId}/company/approve`,
      method: EAPIMethod.PATCH,
    }),
    COMPANY_GET_ADMIN_LIST: (
      page: number,
      limit: number,
      queryParams: { [key: string]: string }
    ) => {
      let url = `${ADMIN_API_PREFIX}/users/companies?page=${page}&limit=${limit}&${Object.entries(
        queryParams
      )
        .filter(listFilter)
        .map(listMapper)
        .join('&')}`;

      if (url.endsWith('&')) url = url.slice(0, -1);

      return {
        url,
        method: EAPIMethod.GET,
      };
    },
  },
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

  QUERIES_YEARS: {
    url: `${API_PREFIX}/dictionaries/jobs/reporting-periods/years`,
    method: EAPIMethod.GET,
  },
};
