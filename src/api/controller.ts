import { IAPIProject } from 'types/entities/project';
import { IAPICompany, IProfileState, IUser } from 'types/interfaces';
import * as fakes from 'utils';
import { aborts } from './aborts';
import { API_ROUTES, DYNAMIC_API_ROUTES } from './config';
import { AuthError } from './errors';
import {
  IProfileCheckAuthResponse,
  IProfileCompanyResponse,
  IProfileLoginResponse,
  IProfileLogoutResponse,
  IProfileUpdateResponse,
  IProjectResponse,
  IProjectCreateResponse,
  IFileUploadedResponse,
  IQueriesResponse,
  IQueriesRelationsResponse,
  IProjectWithMetadataResponse,
  IProjectsListResponse,
  IProjectsAdminListResponse,
  ICompaniesAdminListResponse,
  IProjectDeleteResponse,
} from './responses';
import { safeFetch } from './wrapper';

export const API = {
  profile: {
    checkAuth(): Promise<IProfileCheckAuthResponse> {
      return safeFetch(
        API_ROUTES.PROFILE_AUTH_CHECK.url,
        API_ROUTES.PROFILE_AUTH_CHECK.method,
        aborts.PROFILE_AUTH_CHECK
      );
    },
    login({ login, password }: IUser): Promise<IProfileLoginResponse> {
      return safeFetch(
        API_ROUTES.PROFILE_LOGIN.url,
        API_ROUTES.PROFILE_LOGIN.method,
        aborts.PROFILE_LOGIN_CONTROLLER,
        { login, password }
      );
    },
    getCompany(userId: number): Promise<IProfileCompanyResponse> {
      const params = DYNAMIC_API_ROUTES.PROFILE_GET_COMPANY(userId);

      return safeFetch(
        params.url,
        params.method,
        aborts.PROFILE_GET_COMPANY_CONTROLLER
      );
    },
    logout(): Promise<IProfileLogoutResponse> {
      return safeFetch(
        API_ROUTES.PROFILE_LOGOUT.url,
        API_ROUTES.PROFILE_LOGOUT.method,
        aborts.PROFILE_LOGOUT_CONTROLLER
      );
    },
    update(
      data: Partial<IAPICompany>,
      userId: number
    ): Promise<IProfileUpdateResponse> {
      const params = DYNAMIC_API_ROUTES.PROFILE_UPDATE(userId);

      return safeFetch(
        params.url,
        params.method,
        aborts.PROFILE_UPDATE_CONTROLLER,
        data
      );
    },
  },
  company: {
    reject(userId: number, cause: string): Promise<IProjectCreateResponse> {
      const params = DYNAMIC_API_ROUTES.ADMIN.COMPANY_REJECT(userId);

      return safeFetch(
        params.url,
        params.method,
        aborts.COMPANY_REJECT_CONTROLLER,
        { comment: cause }
      );
    },
    approve(userId: number): Promise<IProjectCreateResponse> {
      const params = DYNAMIC_API_ROUTES.ADMIN.COMPANY_APPROVE(userId);

      return safeFetch(
        params.url,
        params.method,
        aborts.COMPANY_APPROVE_CONTROLLER
      );
    },
    getAdminList(
      page: number,
      limit: number,
      queryParams: { [key: string]: string }
    ): Promise<ICompaniesAdminListResponse> {
      const params = DYNAMIC_API_ROUTES.ADMIN.COMPANY_GET_ADMIN_LIST(
        page,
        limit,
        queryParams
      );

      return safeFetch(
        params.url,
        params.method,
        aborts.COMPANY_GET_LIST_CONTROLLER
      );
    },
  },
  project: {
    get(
      id: string,
      userId: number | undefined
    ): Promise<IProjectWithMetadataResponse> {
      if (!userId) throw new AuthError('Данные пользователя не найдены');

      const params = DYNAMIC_API_ROUTES.PROJECT_GET(id, userId);

      return safeFetch(
        params.url,
        params.method,
        aborts.PROJECT_GET_CONTROLLER
      );
    },
    getList(
      page: number,
      limit: number,
      queryParams: { [key: string]: string },
      userId: number | undefined
    ): Promise<IProjectsListResponse> {
      if (!userId) throw new AuthError('Данные пользователя не найдены');

      const params = DYNAMIC_API_ROUTES.PROJECT_GET_LIST(
        page,
        limit,
        queryParams,
        userId
      );

      return safeFetch(
        params.url,
        params.method,
        aborts.PROJECT_GET_LIST_CONTROLLER
      );
    },
    getAdminList(
      page: number,
      limit: number,
      queryParams: { [key: string]: string }
    ): Promise<IProjectsAdminListResponse> {
      const params = DYNAMIC_API_ROUTES.PROJECT_GET_ADMIN_LIST(
        page,
        limit,
        queryParams
      );

      return safeFetch(
        params.url,
        params.method,
        aborts.PROJECT_GET_ADMIN_LIST_CONTROLLER
      );
    },
    create(
      data: Partial<IAPIProject>,
      userId: number
    ): Promise<IProjectCreateResponse> {
      const params = DYNAMIC_API_ROUTES.PROJECT_CREATE(userId);

      return safeFetch(
        params.url,
        params.method,
        aborts.PROJECT_CREATE_CONTROLLER,
        data
      );
    },
    update(
      data: Partial<IAPIProject>,
      projectId: number,
      userId: number
    ): Promise<IProjectCreateResponse> {
      const params = DYNAMIC_API_ROUTES.PROJECT_UPDATE(projectId, userId);

      return safeFetch(
        params.url,
        params.method,
        aborts.PROJECT_UPDATE_CONTROLLER,
        data
      );
    },
    delete(id: number, userId: number): Promise<IProjectDeleteResponse> {
      const params = DYNAMIC_API_ROUTES.PROJECT_DELETE(id, userId);

      return safeFetch(
        params.url,
        params.method,
        aborts.PROJECT_DELETE_CONTROLLER
      );
    },
    reject(
      userId: number,
      id: number,
      cause: string
    ): Promise<IProjectCreateResponse> {
      const params = DYNAMIC_API_ROUTES.ADMIN.PROJECT_REJECT(id, userId);

      return safeFetch(
        params.url,
        params.method,
        aborts.PROJECT_REJECT_CONTROLLER,
        { comment: cause }
      );
    },
    approve(
      userId: number,
      id: number,
      isBest: boolean
    ): Promise<IProjectCreateResponse> {
      const params = DYNAMIC_API_ROUTES.ADMIN.PROJECT_APPROVE(id, userId);

      return safeFetch(
        params.url,
        params.method,
        aborts.PROJECT_APPROVE_CONTROLLER,
        { is_favorite: isBest }
      );
    },
  },
  file: {
    upload(data: FormData, userId: number): Promise<IFileUploadedResponse> {
      const params = DYNAMIC_API_ROUTES.FILE_UPLOAD(userId);

      return safeFetch(
        params.url,
        params.method,
        aborts.FILE_UPLOAD_CONTROLLER,
        data,
        'multipart/form-data'
      );
    },
  },
  queries: {
    fetchCategories(category: string): Promise<IQueriesResponse> {
      const params = DYNAMIC_API_ROUTES.QUERIES_CATEGORIES(category);

      return safeFetch(
        params.url,
        params.method,
        aborts.QUERIES_CATEGORIES_CONTROLLER
      );
    },
    fetchCategoriesRelations(
      parentCategory: string,
      childCategory: string
    ): Promise<IQueriesRelationsResponse> {
      const params = DYNAMIC_API_ROUTES.QUERIES_CATEGORIES_RELATIONS(
        parentCategory,
        childCategory
      );

      return safeFetch(
        params.url,
        params.method,
        aborts.QUERIES_CATEGORIES_CONTROLLER
      );
    },
  },
};
