import { IAPIRoutesConfig } from './interfaces';
import { EAPIMethod } from './enums';
import { listFilter, listMapper } from './entities/common';
import { ADMIN_API_PREFIX, API_PREFIX } from './constants';

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

    //TODO: update library endpoints with API documentation routes
    LIBRARY: {
      GET_LIST: (
        page: number,
        limit: number,
        queryParams: { [key: string]: string }
      ) => {
        let url = `${ADMIN_API_PREFIX}/library?page=${page}&limit=${limit}&${Object.entries(
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
      CREATE: () => ({
        url: `${ADMIN_API_PREFIX}/library`,
        method: EAPIMethod.POST,
      }),
      UPDATE: (id: number) => ({
        url: `${ADMIN_API_PREFIX}/library/${id}`,
        method: EAPIMethod.PUT,
      }),
      DELETE: (id: number) => ({
        url: `${ADMIN_API_PREFIX}/library/${id}`,
        method: EAPIMethod.DELETE,
      }),
      GET: (id: number) => ({
        url: `${ADMIN_API_PREFIX}/library/${id}`,
        method: EAPIMethod.GET,
      }),
    },
  },
};

export const API_ROUTES: IAPIRoutesConfig = {
  STATISTIC: {
    url: `${ADMIN_API_PREFIX}/stats/orgs`,
    method: EAPIMethod.GET,
  },

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
