import { EAPIMethod, EEntity } from 'api/enums';
import { EProposalStatus } from 'types/enums';
import { ADMIN_API_PREFIX, API_PREFIX } from 'api/constants';

export const listFilter = ([_key, value]: [_key: any, value: any]) =>
  value !== undefined && value !== null;

export const listMapper = ([key, value]: [key: any, value: any]) =>
  key === 'sortBy'
    ? `sort_by=${value}`
    : key === 'sortDirection'
    ? `sort_direction=${value}`
    : key === 'status'
    ? `filter_${key.toLowerCase()}=${EProposalStatus[
        value as keyof typeof EProposalStatus
      ]
        .toString()
        .toLowerCase()}`
    : `filter_${key.toLowerCase()}=${value}`;

export const getEntityPath = (entity: EEntity) => {
  switch (entity) {
    case EEntity.PROJECT: {
      return 'social-projects';
    }
  }
};

export const INTERNAL = {
  CREATE: (entity: EEntity) => {
    return (userId: number) => ({
      url: `${API_PREFIX}/users/${userId}/jobs/${getEntityPath(entity)}`,
      method: EAPIMethod.POST,
    });
  },
  UPDATE: (entity: EEntity) => {
    return (id: number, userId: number) => ({
      url: `${API_PREFIX}/users/${userId}/jobs/${getEntityPath(entity)}/${id}`,
      method: EAPIMethod.PUT,
    });
  },
  DELETE: (entity: EEntity) => {
    return (id: number, userId: number) => ({
      url: `${API_PREFIX}/users/${userId}/jobs/${getEntityPath(entity)}/${id}`,
      method: EAPIMethod.DELETE,
    });
  },
  GET: (entity: EEntity) => {
    return (id: string, userId: number, isAdmin?: boolean) => ({
      url: `${
        isAdmin ? ADMIN_API_PREFIX : API_PREFIX
      }/users/${userId}/jobs/${getEntityPath(entity)}/${id}`,
      method: EAPIMethod.GET,
    });
  },
  DOWNLOAD: (entity: EEntity) => {
    return (id: number, userId: number) => ({
      url: `${API_PREFIX}/users/${userId}/jobs/${getEntityPath(
        entity
      )}/${id}/download`,
      method: EAPIMethod.GET,
    });
  },
  GET_LIST: (entity: EEntity) => {
    return (
      page: number,
      limit: number,
      queryParams: { [key: string]: string },
      userId: number
    ) => {
      let url = `${API_PREFIX}/users/${userId}/jobs/${getEntityPath(
        entity
      )}?page=${page}&limit=${limit}&${Object.entries(queryParams)
        .filter(listFilter)
        .map(listMapper)
        .join('&')}`;

      if (url.endsWith('&')) url = url.slice(0, -1);

      return {
        url,
        method: EAPIMethod.GET,
      };
    };
  },
  GET_ADMIN_LIST: (entity: EEntity) => {
    return (
      page: number,
      limit: number,
      queryParams: { [key: string]: string }
    ) => {
      let url = `${ADMIN_API_PREFIX}/users/jobs/${getEntityPath(
        entity
      )}?page=${page}&limit=${limit}&${Object.entries(queryParams)
        .filter(listFilter)
        .map(listMapper)
        .join('&')}`;

      if (url.endsWith('&')) url = url.slice(0, -1);

      return {
        url,
        method: EAPIMethod.GET,
      };
    };
  },
  GET_ADMIN_ARCHIVE_LIST: (entity: EEntity) => {
    return (
      page: number,
      limit: number,
      queryParams: { [key: string]: string }
    ) => {
      let url = `${ADMIN_API_PREFIX}/users/jobs/${getEntityPath(
        entity
      )}/deleted?page=${page}&limit=${limit}&${Object.entries(queryParams)
        .filter(listFilter)
        .map(listMapper)
        .join('&')}`;

      if (url.endsWith('&')) url = url.slice(0, -1);

      return {
        url,
        method: EAPIMethod.GET,
      };
    };
  },

  //admin
  REJECT: (entity: EEntity) => {
    return (id: number, userId: number) => ({
      url: `${ADMIN_API_PREFIX}/users/${userId}/jobs/${getEntityPath(
        entity
      )}/${id}/reject`,
      method: EAPIMethod.PATCH,
    });
  },
  APPROVE: (entity: EEntity) => {
    return (id: number, userId: number) => ({
      url: `${ADMIN_API_PREFIX}/users/${userId}/jobs/${getEntityPath(
        entity
      )}/${id}/approve`,
      method: EAPIMethod.PATCH,
    });
  },
  RESTORE: (entity: EEntity) => {
    return (id: number, userId: number) => ({
      url: `${ADMIN_API_PREFIX}/users/${userId}/jobs/${getEntityPath(
        entity
      )}/${id}/restore`,
      method: EAPIMethod.PATCH,
    });
  },
};
