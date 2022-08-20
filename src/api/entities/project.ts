import { EEntity } from '../enums';
import { INTERNAL } from './common';
import { IAPIProject } from 'types/entities/project';
import { aborts } from './../aborts';
import { DYNAMIC_API_ROUTES } from './../config';
import { AuthError } from './../errors';
import {
  IEntityCreateResponse,
  IEntitiesListResponse,
  IEntitiesAdminListResponse,
  IEntitiesAdminArchiveListResponse,
  IEntityUpdateResponse,
  IEntityDeleteResponse,
  IEntityRestoreResponse,
  IEntityRejectResponse,
  IEntityApproveResponse,
  IProjectWithMetadataResponse,
} from './../responses';
import { safeFetch } from './../wrapper';

const ENTITY = EEntity.PROJECT;

const CONFIG = {
  CREATE: INTERNAL.CREATE(ENTITY),
  UPDATE: INTERNAL.UPDATE(ENTITY),
  DELETE: INTERNAL.DELETE(ENTITY),
  GET: INTERNAL.GET(ENTITY),
  DOWNLOAD: INTERNAL.DOWNLOAD(ENTITY),
  GET_LIST: INTERNAL.GET_LIST(ENTITY),
  GET_ADMIN_LIST: INTERNAL.GET_ADMIN_LIST(ENTITY),
  GET_ADMIN_ARCHIVE_LIST: INTERNAL.GET_ADMIN_ARCHIVE_LIST(ENTITY),

  REJECT: INTERNAL.REJECT(ENTITY),
  APPROVE: INTERNAL.APPROVE(ENTITY),
  RESTORE: INTERNAL.RESTORE(ENTITY),
};

export const PROJECT_CONTROLLER = {
  get(
    id: string,
    userId: number | undefined,
    isAdmin: boolean | undefined
  ): Promise<IProjectWithMetadataResponse> {
    if (!userId) throw new AuthError('Данные пользователя не найдены');

    const params = CONFIG.GET(id, userId, isAdmin);

    return safeFetch(params.url, params.method, aborts.ENTITY_GET_CONTROLLER);
  },
  create(
    data: Partial<IAPIProject>,
    userId: number
  ): Promise<IEntityCreateResponse> {
    const params = CONFIG.CREATE(userId);

    return safeFetch(
      params.url,
      params.method,
      aborts.ENTITY_CREATE_CONTROLLER,
      data
    );
  },
  update(
    data: Partial<IAPIProject>,
    id: number,
    userId: number
  ): Promise<IEntityUpdateResponse> {
    const params = CONFIG.UPDATE(id, userId);

    return safeFetch(
      params.url,
      params.method,
      aborts.ENTITY_UPDATE_CONTROLLER,
      data
    );
  },

  //common
  getList(
    page: number,
    limit: number,
    queryParams: { [key: string]: string },
    userId: number | undefined
  ): Promise<IEntitiesListResponse> {
    if (!userId) throw new AuthError('Данные пользователя не найдены');

    const params = CONFIG.GET_LIST(page, limit, queryParams, userId);

    return safeFetch(
      params.url,
      params.method,
      aborts.ENTITY_GET_LIST_CONTROLLER
    );
  },
  getAdminList(
    page: number,
    limit: number,
    queryParams: { [key: string]: string }
  ): Promise<IEntitiesAdminListResponse> {
    const params = CONFIG.GET_ADMIN_LIST(page, limit, queryParams);

    return safeFetch(
      params.url,
      params.method,
      aborts.ENTITY_GET_ADMIN_LIST_CONTROLLER
    );
  },
  getAdminArchiveList(
    page: number,
    limit: number,
    queryParams: { [key: string]: string }
  ): Promise<IEntitiesAdminArchiveListResponse> {
    const params = CONFIG.GET_ADMIN_ARCHIVE_LIST(page, limit, queryParams);

    return safeFetch(
      params.url,
      params.method,
      aborts.ENTITY_GET_ADMIN_ARCHIVE_LIST_CONTROLLER
    );
  },
  delete(id: number, userId: number): Promise<IEntityDeleteResponse> {
    const params = CONFIG.DELETE(id, userId);

    return safeFetch(
      params.url,
      params.method,
      aborts.ENTITY_DELETE_CONTROLLER
    );
  },

  reject(
    userId: number,
    id: number,
    cause: string
  ): Promise<IEntityRejectResponse> {
    const params = CONFIG.REJECT(id, userId);

    return safeFetch(
      params.url,
      params.method,
      aborts.ENTITY_REJECT_CONTROLLER,
      { comment: cause }
    );
  },
  approve(
    userId: number,
    id: number,
    isBest: boolean
  ): Promise<IEntityApproveResponse> {
    const params = CONFIG.APPROVE(id, userId);

    return safeFetch(
      params.url,
      params.method,
      aborts.ENTITY_APPROVE_CONTROLLER,
      { is_favorite: isBest }
    );
  },
  restore(userId: number, id: number): Promise<IEntityRestoreResponse> {
    const params = CONFIG.RESTORE(id, userId);

    return safeFetch(
      params.url,
      params.method,
      aborts.ENTITY_RESTORE_CONTROLLER
    );
  },

  download(userId: number, id: number): Promise<any> {
    const params = CONFIG.DOWNLOAD(id, userId);

    return safeFetch(
      params.url,
      params.method,
      aborts.ENTITY_DOWNLOAD_CONTROLLER,
      {},
      'application/pdf'
    );
  },
};
